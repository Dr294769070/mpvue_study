<template>
    <div>
        movies
    </div>
</template>
<script>
import Fly from 'flyio/dist/npm/wx'

export default {
    data() {
        return {
            // 
        }
    },
    created() {
        const fly = new Fly
        fly.get('http://t.yushu.im/v2/movie/top250').then((res) => {})
    }
}
</script>
<style scoped>

</style>