<template>
    <div class="bubble-container">
        <button @click="handleLike">点赞</button>
        <div class="content">
            <div class="qipao ani" v-for="item in list" :key="item"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                count: 0
            }
        },
        methods: {
            handleLike() {
                this.count++
                this.list.push(this.count)
                setTimeout(() => {
                    this.list.shift()
                }, 2000)
            }
        }
    }
</script>
<style scoped>
@keyframes ani1 {
    0% {
        bottom: 0;
        right: 0;
        opacity: 1;
    }
    25% {
        right: 25%;
    }
    50% {
        opacity: 1;
        right: 50%;
    }
    75% {
        right: 25%;
    }
    100%{
        bottom: 500rpx;
        right: 0;
        opacity: 0;
    }
}
.ani{
    animation: ani1 1.5s;
    animation-fill-mode: forwards;
    animation-timing-function:linear;
}
</style>
<style scoped>
.content{
    width: 200rpx;
    height: 600rpx;
    position: fixed;
    bottom: 20rpx;
    right: 20rpx;
}
.qipao{
    width: 72rpx;
    height: 72rpx;
    background-size: 72rpx;
    background-image: url("./icon/1.png");
    background-repeat: no-repeat;
    position: absolute;
}
</style>