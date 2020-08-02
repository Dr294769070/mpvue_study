<template>
    <div>
        <like-fx :count="count"></like-fx>
        <button class="mini-btn" type="warn" size="mini" @tap="clickHandler">{{count}}</button>
    </div>
</template>
<script>
import likeFx from './components/likeFx/index'

export default {
    components: {
        likeFx
    },
    data() {
        return {
            count: 0 
        }
    },
    mounted() {
        // setInterval(() => {
        //     this.count++
        // }, 1000)
    },
    methods: {
        clickHandler() {
            this.count++
        }
    }
}
</script>
<style scoped>
.mini-btn{
  position: absolute;
  right: 15px;
  bottom: 25px
}
</style>