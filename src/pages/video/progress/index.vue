<template>
    <div class="com-progress" @click="clickCb">
        <div class="content">
            <div class="btn" @tap="handleClick"></div>
            <div class="pro-com">
                <div class="time now">00:00:00</div>
                <div class="progress"></div>
                <div class="time end">12:00:00</div>
                <div class="circle"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            progress: 0 // 区间是 0 - 1
        }
    },
    methods: {
        handleClick() {
            console.log('123')
            this.$emit('clickEvent')
        },
        clickCb() {
            console.log('clickCb')
        }
    }
}
</script>
<style scoped>
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
    margin: 0 23rpx;
    border: 1px solid red;
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
</style>
