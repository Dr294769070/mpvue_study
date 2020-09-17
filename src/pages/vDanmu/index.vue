<template>
<!-- 
    1、纵向弹幕组件
    2、有新消息推送，列表向下更新
    3、用户可以向上滑动列表，当处于向上滑动的状态时 不自动向下刷新
    4、试下页面有元素在不断刷新的情况
    5、试下带有滚动效果和无滚动效果的情况
 -->
    <div class="vDanmu-container">
        <div class="content">
            <div v-for="item in list" :key="item">{{ '文本' + item }}</div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            // 
        }
    },
}
</script>
<style scoped>
.vDanmu-container{

}
</style>