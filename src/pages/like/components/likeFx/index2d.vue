<template>
<canvas
  type="2d"
  id="canvas"
  class="like-fix"
  :style="canvasStyle"
></canvas>
</template>
<script>
let canvas
let ctx;
let queue
let timer
  
export default {
    props: {
    count: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 90
    }
    },
    watch: {
      count: function() {
        this.likeChange()
      }
    },
    computed: {
        canvasStyle() {
            return `width:${this.width}px;height:${this.height}px`
        }
    },
    methods: {
    /**点赞个数变化 */
    likeChange(newVal, oldVal) {
        this.likeClick();    
    },
    /**点赞 */
    likeClick1() {
      wx.downloadFile({
        url: "https://frank-1302698468.cos.ap-beijing.myqcloud.com/icons/24.png",
        success: (result) => {
        const image = result.tempFilePath;
        const anmationData = {
        id: new Date().getTime(),
        timer: 0,
        opacity: 0.5,
        pathData: this.generatePathData(),
        image,
        factor: {
          speed: 0.004, // 运动速度，值越小越慢
          t: 0 //  贝塞尔函数系数
        }
      };
      if (Object.keys(queue).length > 0) {
        queue[anmationData.id] = anmationData;
      } else {
        queue[anmationData.id] = anmationData;
        this.bubbleAnimate();
      }
        }
      });
        
      // const image = require("./images/" + this.getRandomInt(1, 7) + ".png")
    },
    likeClick() {
        // const image = `../../../../../static/bubble/${this.getRandomInt(1, 7)}.png`;
        let img = canvas.createImage();
        img.src = `../../../../../static/bubble/${this.getRandomInt(1, 7)}.png`
        img.onload = () => {
        const anmationData = {
        id: new Date().getTime(),
        timer: 0,
        opacity: 0.5,
        pathData: this.generatePathData(),
        image: img,
        factor: {
          speed: 0.004, // 运动速度，值越小越慢
          t: 0 //  贝塞尔函数系数
        }
      };
      if (Object.keys(queue).length > 0) {
        queue[anmationData.id] = anmationData;
      } else {
        queue[anmationData.id] = anmationData;
        this.bubbleAnimate();
      }
        };
    },
    // likeClick2() {
    //   const src = "./images/" + this.getRandomInt(1, 7) + ".png"
    //   wx.getImageInfo({
    //     src,
    //     success: (res) => {
    //       this.clickCb(res.path)
    //     }
    //   })
    // },
    /**获取最大最小随机值 */
    getRandom(min, max) {
      return Math.random() * (max - min) + min;
    },
    /**获取最大最小之前随机值的整数 */
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**获取图片路径 */
    generatePathData() {
      let width = this.width,
        height = this.height;
      const p0 = {
        x: 0.65 * width,
        y: height
      };
      const p1 = {
        x: this.getRandom(0.22 * width, 0.33 * width),
        y: this.getRandom(0.5 * height, 0.75 * height)
      };
      const p2 = {
        x: this.getRandom(0, 0.88 * width),
        y: this.getRandom(0.25 * height, 0.5 * height)
      };
      const p3 = {
        x: 0.22 * width, // this.getRandom(0.22 * width, 0.88 * width),
        y: this.getRandom(0, 0.125 * height)
      };
      return [p0, p1, p2, p3];
    },
    /**更新图片的最新运动路径 */
    updatePath(data, factor) {
      const p0 = data[0];
      const p1 = data[1];
      const p2 = data[2];
      const p3 = data[3];

      const t = factor.t;

      /*计算多项式系数 （下同）*/
      const cx1 = 3 * (p1.x - p0.x);
      const bx1 = 3 * (p2.x - p1.x) - cx1;
      const ax1 = p3.x - p0.x - cx1 - bx1;

      const cy1 = 3 * (p1.y - p0.y);
      const by1 = 3 * (p2.y - p1.y) - cy1;
      const ay1 = p3.y - p0.y - cy1 - by1;

      const x = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p0.x;
      const y = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p0.y;
      return {
        x,
        y
      };
    },
    /**点赞动画 */
    bubbleAnimate() {
      let width = this.width,
        height = this.height;
      Object.keys(queue).forEach(key => {
        const anmationData = queue[+key];
        const {
          x,
          y
        } = this.updatePath(
          anmationData.pathData,
          anmationData.factor
        );
        // console.log('y:', Math.floor(y))
        const speed = anmationData.factor.speed;
        anmationData.factor.t += speed;

        var curWidth = 30;
        curWidth = (height - y) / 1.5;
        curWidth = Math.min(30, curWidth);
        // 开始的时候curWidth比较小 所以图片会比较小
        // 然后逐渐变大，最大30

        var curAlpha = anmationData.opacity;
        curAlpha = y / height;
        console.log('curalpha:', curAlpha)
        curAlpha = Math.min(1, curAlpha); // 透明度从1 -> 0 也就是说 由完全不透明转为完全透明 当到达顶部的时候 完全透明
        ctx.globalAlpha = curAlpha;
        canvas.height = canvas.height
        cxt.clearRect(0,0,canvas.width,canvas.height)
        ctx.drawImage(anmationData.image, x - curWidth / 2, y, curWidth, curWidth);
        if (anmationData.factor.t > 1) {
          delete queue[anmationData.id];
        }
        if (y > height) {
          delete queue[anmationData.id];
        }
      });
      // ctx.draw();
      // 
      console.log('canvas.height', canvas.height)
      if (Object.keys(queue).length > 0) {
        timer = setTimeout(() => {
          this.bubbleAnimate();
        }, 5);
      } else {
        clearTimeout(timer);
        // ctx.draw(); // 清空画面
        // canvas.height = canvas.height
        cxt.clearRect(0,0,canvas.width,canvas.height)
      }
    }
  },

  mounted() {
    // ctx = wx.createCanvasContext("bubble", this);
    const query = wx.createSelectorQuery()
    query.select('#canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        canvas = res[0].node
        ctx = canvas.getContext('2d')
        canvas.height = canvas.height
        canvas.width = canvas.width
        console.log('canvas', canvas)
      })
    queue = {};
  },

  beforeDestory() {
    if (timer) {
      clearTimeout(timer);
    }
  }
}
</script>
<style scoped>
.like-fx {
  position: absolute;
  right: 0;
  bottom: 110rpx;
  z-index: 10;
  pointer-events: none;
  border: 1rpx solid red
}

</style>