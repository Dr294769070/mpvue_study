<template>
<!-- 
    1、纵向弹幕组件
    2、有新消息推送，列表向下更新
    3、用户可以向上滑动列表，当处于向上滑动的状态时 不自动向下刷新
    4、试下页面有元素在不断刷新的情况
    5、试下带有滚动效果和无滚动效果的情况
 -->
    <div class="vDanmu-container">
        <scroll-view scroll-y class="content" :scroll-top="top" v-if="com == 1">
            <div v-for="item in list" :key="item" :class="item % 2 == 0 ? 'blue' : 'pink'" class="item">{{ '文本' + item }}</div>
        </scroll-view>

        <scroll-view scroll-y class="content" :scroll-into-view="'id' + count" v-if="com == 2">
            <div v-for="item in list" :key="item" :class="item % 2 == 0 ? 'blue' : 'pink'" class="item" :id="'id' + (item + 1)">{{ '文本' + item }}</div>
            <!-- <div class="bo" :id="'id' + count"></div> -->
        </scroll-view>

        <scroll-view scroll-y class="content" :scroll-into-view="'id' + count" v-if="com == 3"
            @scroll="handleScroll"
        >
            <div v-for="item in list" :key="item" 
            :class="item % 2 == 0 ? 'blue' : 'pink'"
             class="item">{{ '文本' + item }}</div>
            <div class="bo" :id="'id' + count" v-if="autoScroll"></div>
        </scroll-view>

        <scroll-view scroll-y class="content" :scroll-top="top" v-if="com == 4" @scroll="handleScroll">
            <div v-for="item in list" :key="item" :class="item % 2 == 0 ? 'blue' : 'pink'" class="item">{{ '文本' + item }}</div>
        </scroll-view>

        <div>{{ text }}</div>
        <div class="btn">
            <button @click="handleClick">新消息</button>
            <button @click="addTimer">页面刷新</button>
            <button @click="delTimer">停止刷新</button>
        </div>
    </div>
    <!-- 当采用scroll-with-animation时，且用scroll-top强制下拉 当出现新消息，而用户处于查看历史消息状态时，会出现一次性滚动不到最下方的情况 -->

    <!-- 当使用scroll-into-view时  id必须动态改变 否则没有效果 -->
    <!-- 当使用scroll-into-view时 id可以用在列表元素上，或者末位加一个元素 但如果使用滚动动画 当消息更新过于频繁时 滚动效果不佳 会卡在某个地方 -->

    <!-- scroll-with-animation 存在时 只要消息更新频率高 必定出现问题 不会滚动到最底部 -->
</template>
<script>
let timer
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
            list: [1,2,3,4,5,6,7,8,9,10],
            count: 0,
            top: 1000,
            text: 1,
            com: 4,
            autoScroll: true
        }
    },
    methods: {
        handleClick() {
            this.list.push(this.count++)
            if (this.autoScroll) {
                console.log('更新')
                this.top+=1000
            }
        },
        addTimer() {
            timer = setInterval(() =>{
                this.text += 1
            }, 1000)
        },
        delTimer() {
            clearInterval(timer)
            timer = null
        },
        handleScroll(e) {
            const { scrollHeight, scrollTop } = e.mp.detail
            if (px2rpx(scrollHeight - scrollTop) > 450) {
                this.autoScroll = false
            } else {
                this.autoScroll = true
            }
        }
    }
}
</script>
<style scoped>
.vDanmu-container .content{
    height: 400rpx;
}

.blue{
    background: rgb(253, 226, 226);;
}
.pink{
    background: rgb(233, 233, 235);;
}

.item{
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
}
.btn{
    position: fixed;
    bottom: 0;
    width: 100%;
}
.bo{
    height: 1rpx;
}
</style>