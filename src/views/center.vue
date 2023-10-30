<template>
  <div id="center">
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-3 colorBlue">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop ml-1 mt-2 pl-3"
            :config="item.number"
          />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <span class="ml-3 colorBlue">本月客运量排行榜</span>
        <dv-scroll-ranking-board
          class="dv-scr-rank-board mt-1"
          :config="ranking"
        />
        
      </div>
      <div class="percent">
        <div class="item bg-color-black">
          <span>客运量同比增速</span>
          <CenterChart
            :id="rate[0].id"
            :tips="rate[0].tips"
            :colorObj="rate[0].colorData"
          />
        </div>
        <div class="item bg-color-black">
          <span>客运量环比增速</span>
          <CenterChart
            :id="rate[1].id"
            :tips="rate[1].tips"
            :colorObj="rate[1].colorData"
          />
        </div>
        <div class="water">
          <dv-water-level-pond class="dv-wa-le-po" :config="water" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterChart from "@/components/echart/center/centerChartRate";
import request from "@/utils/request";
export default {
  data() {
    return {
      titleItem: [
        {
          title:  "本月最大客运量数值",
          number: {
            number: [908],
            toFixed: 0,
            textAlign: "left",
            content: "{nt}百人",
            style: {
              fontSize: 22,
            },
          },
        },
        {
          title: "本月最大客运量省份",
          number: {
            number: [],
            toFixed: 0,
            textAlign: "left",
            content: "山东",
            style: {
              fontSize: 22,
            },
          },
        },
        {
          title: "本月平均客运量",
          number: {
            number: [438.5],
            toFixed: 2,
            textAlign: "left",
            content: "{nt}百人",
            style: {
              fontSize: 22,
            },
          },
        },
        {
          title: "本月最低客运量",
          number: {
            number: [84],
            toFixed: 0,
            textAlign: "left",
            content: "{nt}百人",
            style: {
              fontSize: 22,
            },
          },
        },
        {
          title: "本月最低客运量省份",
          number: {
            number: [],
            toFixed: 0,
            textAlign: "left",
            content: "天津",
            style: {
              fontSize: 22,
            },
          },
        },
        {
          title: "本月数据方差",
          number: {
            number: [335],
            toFixed: 2,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 22,
            },
          },
        },
      ],
      ranking: {
      },
      show:false,
      water: {
        data: [26.6],
        shape: "roundRect",
        formatter: "千人占比{value}%",
        waveNum: 3,
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: "centerRate1",
          tips: 6.6,
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5",
              },
            },
          },
        },
        {
          id: "centerRate2",
          tips: 21.0,
          colorData: {
            textStyle: "#67e0e3",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad",
              },
            },
          },
        },
      ],
    };
  },
  components: {
    CenterChart,
  },
  watch: {
    "$store.state.pvData.data": {
      handler: function (newVal, oldVal) {
        this.ranking={ ...this.$store.getters.getPvData}
        request.get('/statistics/'+this.$store.getters.getMonthData.year+'/'+this.$store.getters.getMonthData.month).then((res,req)=>{
          let temp= this.titleItem
            // 本月最大客运量数值
          temp[0].number.number[0]=res.max.volume
          this.titleItem[0].number={...temp[0].number}
          // 本月最大客运量省份
          temp[1].number.content=res.max.area
          this.titleItem[1].number={...temp[1].number}
          // 本月平均客运量
          temp[2].number.number[0]=Number(res.avg)
          this.titleItem[2].number={...temp[2].number}
          // 本月最低客运量
          temp[3].number.number[0]=res.min.volume
          this.titleItem[3].number={...temp[3].number}
          // 本月最低客运量省份
          temp[4].number.content=res.min.area
          this.titleItem[4].number={...temp[4].number}
          // 本月方差
          temp[5].number.number[0]=Number(res.variance)
          this.titleItem[5].number={...temp[5].number}

        })
        let tp=this.rate
        tp[0].tips=(this.$store.getters.getMonthData.year-2013)*0.5+this.$store.getters.getMonthData.month*0.2
        tp[1].tips=(this.$store.getters.getMonthData.year-2013)*0.3+this.$store.getters.getMonthData.month*0.5

        this.rate[0].tips=tp[0].tips
        this.rate[1].tips=tp[1].tips
        let tpObj=this.water
        tpObj.data[0]=((this.$store.getters.getMonthData.year-2013)*0.7+this.$store.getters.getMonthData.month*1.5).toFixed(2)
        this.water={...tpObj}
      },
    },
  },
  mounted() {
    // this.ranking = this.$store.getters.getPvData;

  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
      .dv-scr-rank-board {
        height: 225px;
      }
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>
