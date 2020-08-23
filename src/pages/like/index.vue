<template>
    <div class="div1">
        <like-fx :lock="lock" :count="count"></like-fx>
        <button class="mini-btn" type="warn" size="mini" @tap="clickHandler">{{count}}</button>
        <button class="lock-btn" type="warn" size="mini" @tap="clickHandler1">锁</button>
    </div>
</template>
<script>
import likeFx from './components/likeFx/index3.vue'

export default {
    components: {
        likeFx
    },
    data() {
        return {
            count: 0,
            lock: false
        }
    },
    mounted() {
        setInterval(() => {
            this.count++
        }, 700)
    },
    methods: {
        clickHandler() {
            this.count++
        },
        clickHandler1() {
            this.lock = !this.lock
        }
    }
}
</script>
<style scoped>
.div1{
    width: 100vw;
    height: 100vh;
    position: relative;
}
.mini-btn{
  position: absolute;
  right: 15px;
  bottom: 25px
}
.lock-btn {
    position: absolute;
    left: 15px;
    bottom: 25px;
    text-align: center;
    color: white;
}
</style>