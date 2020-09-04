<template>
    <div class="vertical-player">
        <video
            :src="playbackUrl"
            class="video"
            autoplay
            loop
            object-fit="contain"
            @timeupdate="updateProgress"
            id="videoCom"
        ></video>
        <div class="com-progress">
        <div class="content">
            <div class="btn" @tap="handleClick"></div>
            <div class="pro-com">
                <div class="time now">{{ currentTimeFormat }}</div>
                <div class="progress"></div>
                <div class="time end">{{ totalTimeFormat }}</div>
                <div class="circle" :style="gbStyle"
                 @touchstart="handleTouchStart"
                 @touchmove="handleTouchMove"
                 @touchend="handleTouchEnd"
                 ></div>
            </div>
        </div>
        <div class="tip-time" v-show="tipTime">
            {{ currentTimeFormat }}
        </div>
    </div>
    </div>
</template>

<script>

let videoContext
let totalTime = 111 // 单位s

function time_conversion($times){
     let $result = '00:00:00';
          if ($times>0){
              let $hour = Math.floor($times / 3600);
              let $minute = Math.floor($times % 3600 / 60);
              let $second = Math.floor(($times - 60 * $minute) % 60);
              if ($hour < 10) {
                  $hour = '0' + $hour;
              }
              if($minute<10){
                  $minute = "0" + $minute;
              }
              if($second<10){
                  $second = "0" + $second;
              }
              $result = $hour + ':' + $minute + ':' + $second;
          }
          return $result
}
function rpx2px(distance) {
    let result = 0
    if (!isNaN(distance)) {
        result = wx.getSystemInfoSync().windowWidth * distance / 750
    }
    return result
}
function px2rpx(distance) {
    let result = 0;
    if (!isNaN(distance)) {
        result = distance * 750 / wx.getSystemInfoSync().windowWidth;
    }
    return result;
}


export default {
    data() {
        return {
            playbackUrl: 'https://frank-1302698468.cos.ap-beijing.myqcloud.com/video/%E7%81%B5%E7%AC%BC%E7%89%87%E6%AE%B5.mp4', // 'https://frank-1302698468.cos.ap-beijing.myqcloud.com/video/mountain%26cloud.mp4',
            count: 0,
            pause: false, // 是否为暂停状态
            autoMove: true, // 光标自动移动
            currentTime: 0,
            totalTime: totalTime,
            left: 0,
            leftX: 0,
            startX: 0,
            drag: false,
            tipTime: ''
        }
    },
    onLoad() {
        videoContext = wx.createVideoContext('videoCom')
    },
    onUnload() {
        videoContext = null
        this.left = 0
        this.leftX = 0
    },
    computed: {
        gbStyle() {
            return this.autoMove || this.leftX == 0 ? 'left:' + (this.left + 100) + 'rpx' : 'position:fixed;left:' + this.leftX + 'rpx'
        },
        currentTimeFormat() {
            return time_conversion(this.currentTime)
        },
        totalTimeFormat() {
            return time_conversion(this.totalTime)
        }
    },
    methods: {
        updateProgress(e) {
            const time = e.mp.detail.currentTime
            if (this.autoMove) {
                // 移动光标
                this.currentTime = Math.floor(time)
                const pixel = time / totalTime
                const distance = pixel * 440
                this.left = distance
            }
        },
        handleClick() {
            this.pause = !this.pause
            if (this.pause) { // 暂停
                videoContext.pause()
            } else {
                videoContext.play()
            }
        },
        handleTouchStart(e) {
            // 手指按到圆形按钮上 ，圆形按钮不再自动移动
            this.autoMove = false
            this.startX = e.pageX;
            this.tipTime = true
            // 同时屏幕中央出现提示 内容为光标对应的时间
        },
        handleTouchMove(e) {
            // 计算手指横向偏移量
            this.leftX = px2rpx(e.pageX)
            // 将光标定位到对应位置s
            if (this.leftX < 200) {
                this.leftX = 200
            } else if (this.leftX > 640) {
                this.leftX = 640
            }
            // 将光标定位到对应位置s
            // 计算光标相对于总进度条的位置，精确到秒
            // 左侧的当前进度 秒数 变化更新
            const instance = this.leftX - 200
            const pixel = instance / 440
            this.currentTime = Math.floor(totalTime * pixel)
            // 中央的时间提示及时更新
        },
        handleTouchEnd() {
            // 获取当前光标位置 和 当前的进度
            // 调用api让视频跳转到指定位置
            // 光标回复自动移动
            // 关闭中央的时间提示
            this.drag = false
            this.autoMove = true
            this.leftX = 0
            this.tipTime = false
            videoContext.seek(this.currentTime)
        }
    }
}
</script>
<style scoped>
.vertical-player{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
}
.video{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}
.com-progress{
    position: absolute;
    bottom: 100rpx;
    left: 0;
    z-index: 99999;
}
.content{
    height: 90rpx;
    line-height: 90rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.btn{
    width: 50rpx;
    height: 50rpx;
    background: #ffffff;
    opacity: .3;
    border-radius: 50%;
    margin: 0 25rpx;
}
.pro-com{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90rpx;
    line-height: 90rpx;
    position: relative;
}
.time{
    width: 75rpx;
    font-size: 18rpx;
    font-weight: 400;
    color: #FFFFFF;

}
.progress{
    width: 440rpx;
    height: 6rpx;
    background: #FFFFFF;
    border-radius: 2rpx;
    opacity: 0.30;
    margin: 0 25rpx;
}
.circle{
    position: absolute;
    left: 100rpx;
    width: 24rpx;
    height: 24rpx;
    background: #FFFFFF;
    border: 4rpx solid rgba(255, 255, 255, 0.3);
    transform: translate(-12rpx, 0);
    border-radius: 50%;
}

.tip-time{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
}
</style>