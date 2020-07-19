<template>
<div class="index-container">
    <img class="index-img" v-if="!showBtn" :src="userInfo.avatarUrl" alt="user" />
    <button open-type="getUserInfo" class="btn" v-else @getuserinfo="getUserInfo">获取信息</button>
    <p class="index-hello">hello mpvue</p>
    <p class="index-study" @tap="toDetail">Go 小程序</p>
</div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {},
            showBtn: true
        }
    },
    beforeMount() {
        this.handleGetUserInfo()
    },
    methods: {
        getUserInfo(data) {
            if (data.mp.detail.rawData) { // 用户授权
                this.handleGetUserInfo()
            }
        },
        handleGetUserInfo() {
                wx.getUserInfo({
                success: (data) => {
                    console.log(data)
                    this.userInfo = data.userInfo
                    this.showBtn = false
                },
                fail: (err) => {
                    console.log('err')
                }
                })
        },
        toDetail() {
            wx.navigateTo({
                url: '/pages/list/main'
            })
        }
    }
}
</script>
<style>
page{
    background: #F56C6C;
}
</style>
<style scoped>
.index-container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.index-img { 
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 100rpx 0;
}
.index-hello{
    font-size: 40rpx;
    font-weight: bold;
    margin: 100rpx 0;
    color: white;
}
.index-study, .btn{
    width: 200rpx;
    line-height: 80rpx;
    font-size: 24rpx;
    border: 1rpx solid #DCDFE6;
    border-radius: 10rpx;
    text-align: center;
    color: white;
    background: #F56C6C;
}
</style>