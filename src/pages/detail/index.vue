<template>
    <div class="detail">
        <h2 class="video-name" v-text="videoMap.videoName"></h2>
        <video :src="videoMap.videoUrl" class="video-container" autoplay controls loop>
        </video>
        <p class="video-origin" v-text="videoMap.videoOrigin"></p>
        <div class="last-line">
            <span class="left">
                <img src="../../../static/icons/chat.png" class="icon" />
                <span class="text">评论</span>
            </span>
            <span class="rigth">
                <img :src="collectImg" class="icon" @tap="tapCollect" />
                <img src="../../../static/icons/share.png" class="icon" />
            </span>
        </div>
    </div>
</template>
<script>
import videoMap from "../../datas/videoMap"
const xk = require('../../../static/icons/xk.png')
const xkr = require('../../../static/icons/xkr.png')

export default {
    data() {
        return {
            videoMap: {},
            collect: false
        }
    },
    onLoad(options) {
        this.videoMap = videoMap[options.video]
        const collect = wx.getStorageSync('video-' + this.videoMap.key)
        this.collect = collect || false
    },
    computed: {
        collectImg() {
            return this.collect ? xkr : xk
        }
    },
    methods: {
        tapCollect() {
            this.collect = !this.collect
            wx.showToast({
                title: this.collect ? '收藏成功' : '取消成功'
            })
            wx.setStorageSync('video-' + this.videoMap.key, this.collect)
        }
    }
}
</script>
<style scoped>
.video-container{
    width: 100%;
}
.video-name{
    font-family: PingFangSC-Regular;
    font-size: 44rpx;
    color: #333333;
    font-weight: 500;
    padding: 20rpx 10rpx;
}
.video-origin{
    font-size: rpx;
    color: #868686;
    line-height: 44rpx;
    font-family: PingFangSC-Regular;
    padding: 10rpx;
}
.last-line{
    height: 48rpx;
    line-height: 48rpx;
    display: flex;
    justify-content: space-between;
    padding: 10rpx;
}
.icon{
    width: 48rpx;
    height: 48rpx;
}
.left .icon{
    vertical-align: middle;
}
.left .text{
    margin-left: 20rpx;
    font-size: 28rpx;
}
.rigth{
    width: 120rpx;
    display: flex;
    justify-content: space-between;
}
</style>