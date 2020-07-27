<template>
    <div class="list-template-div">
        <div class="avatar-time">
            <img class="avatar" :src="oneObj.avatar" />
            <span v-text="oneObj.time" class="time"></span>
        </div>
        <h3 class="name" v-text="oneObj.name"></h3>
        <!-- img 明星照片 -->
        <img class="main-img" :src="oneObj.img" mode="widthFix" />
        <p class="quotations" @click="toDetail">
            {{ oneObj.quotations }}
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            time: '2020 07/19'
        }
    },
    props: {
        oneObj: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        toDetail() {
            // 跳转至详情页面
             wx.navigateTo({
                url: `/pages/detail/main?video=${this.oneObj.video}`
            })
        }
    }
}
</script>
<style scoped>
.list-template-div {
    padding: 20rpx 20rpx;
}
.avatar-time{
    padding: 10rpx 0 0 0;
}
.avatar-time .avatar{
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    vertical-align: middle;
    margin-right: 10rpx;
}
.avatar-time .time {
    font-size: 30rpx;
    line-height: 48rpx;
}
.name{
    padding: 10rpx 0;
    font-size: 40rpx;
    font-weight: bold
}
.main-img{
    width: 100%;
}
.quotations {
    font-size: 32rpx;
    text-indent: 32rpx;
    line-height: 50rpx;
    letter-spacing: 3rpx;
    /* 文字间距 段落开头缩进 */
}
</style>