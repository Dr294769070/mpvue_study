<template>
    <div class="list-container">
        <swiper indicator-dots indicator-color="#fff" indicator-active-color="pink" @change="changeCb">
            <swiper-item v-for="item in imgList" :key="item.key">
                <img class="swiper-img" :src="item.url" alt="picture" mode="aspectFit" />
            </swiper-item>
        </swiper>
        <list-temp v-for="(item, index) in list" :key="index" :one-obj="item"></list-temp>
    </div>
</template>
<script>
import listTemp from "./list-template/list-template"
import listData from '../../datas/my-list'

export default {
    components: {
        listTemp
    },
    data() {
        return {
            imgList: [
                {
                    key: 0,
                    url: require('../../../static/images/wxb.jpeg')
                },
                {
                    key: 1,
                    url: require('../../../static/images/cris.jpg')
                }
            ],
            current: 0
        }
    },
    beforeCreate() {
        this.$store.commit('setListData', listData)
    },
    computed: {
        list() {
            return this.$store.state.listData[this.current] || []
        }
    },
    methods: {
        changeCb(item) {
            this.current = item.mp.detail.current
        }
    }
}
</script>
<style scoped>
  .list-container swiper {
    width: 100%;
    height: 400rpx;
  }
  .swiper-img{
      width: 100%;
  }
</style>