<template>
    <div class="list-container">
        <swiper indicator-dots indicator-color="#fff" indicator-active-color="pink">
            <swiper-item v-for="(item, index) in imgList" :key="index">
                <img class="swiper-img" :src="item.url" alt="picture" mode="aspectFit" />
            </swiper-item>
        </swiper>
        <list-temp v-for="(item, index) in list" :key="index"
         :one-obj="item"></list-temp>
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
                    url: require('../../../static/images/wxb.jpeg')
                },
                {
                    url: require('../../../static/images/cris.jpg')
                }
            ],
            list: []
        }
    },
    beforeCreate() {
        this.$store.commit('setListData', listData)
    },
    created() {
        this.list = this.$store.state.listData || []
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