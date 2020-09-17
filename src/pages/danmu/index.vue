<template>
    <div class="danmu-container">
        <scroll-view scroll-y class="scrolls" :scroll-top="st" scroll-with-animation>
            <div class="item" v-for="item in list" :key="item">{{ item }}</div>
        </scroll-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                st: 1000
            }
        },
        onLoad() {
            let i = 0
            setInterval(() => {
                this.list.push(i)
                i++
                this.st += 1000
            }, 3000)
        }
    }
</script>
<style scoped>
.scrolls{
    width: 100%;
    height: 300rpx;
}
.item {
    height: 50rpx;
    line-height: 50rpx;
    font-size: 30rpx;
    text-align: center;
    color: blue;
    background: cornsilk;
}
</style>