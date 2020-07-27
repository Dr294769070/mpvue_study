<template>
    <div class="music-container">
        <img class="music_background" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=366546463,1775628491&fm=26&gp=0.jpg"  mode="widthFix"/>
        <p class="icon-line">
            <button class="icon play" v-show="!isPlaying" @tap="playMusic"></button>
            <button class="icon pause" v-show="isPlaying" @tap="stopPlay"></button>
            <button class="icon share" open-type="share"></button>
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isPlaying: false
        }
    },
    onShareAppMessage() {
        return { 
            title: '音乐地带'
        }
    },
    methods: {
        playMusic() {
            this.isPlaying = true
            wx.playBackgroundAudio({
                dataUrl: "https://dingjinsong-1302698468.cos.ap-nanjing.myqcloud.com/music/HK.mp3",
                title: "海口",
                coverImgUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=366546463,1775628491&fm=26&gp=0.jpg"
            })
        },
        stopPlay() {
            this.isPlaying = false
            wx.stopBackgroundAudio()
        }
    }
}
</script>
<style scoped>
.music_background{
    width: 100%;
}
.icon {
    display: inline-block;
    width: 60rpx;
    height: 60rpx;
    padding: 10rpx;
    border-radius: 10rpx;
    background-size: cover;
}
.play{
    background-image: url("https://dingjinsong-1302698468.cos.ap-nanjing.myqcloud.com/icons/music.png");
}
.pause{
    background-image: url("https://dingjinsong-1302698468.cos.ap-nanjing.myqcloud.com/icons/music-play.png");
}
.share{
    background-image: url("https://dingjinsong-1302698468.cos.ap-nanjing.myqcloud.com/icons/share.png");
}
.icon-line{
    display: flex;
    justify-content: space-around;
    align-items: center;
}

</style>