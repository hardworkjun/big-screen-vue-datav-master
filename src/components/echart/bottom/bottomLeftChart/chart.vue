<template>
  <div>
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="bottomLeftChart"
      height="480px"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data () {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    },
  },
  watch: {
    cdata: {
      handler (newData) {
        console.log(newData);
        this.options = {
          xAxis: {
            // data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          },
          yAxis: {},
          legend: { // 图例
            data: ["原始", "拟合"],
            top: "0%"
        },
          series: [
            {
              name:'原始',
              type: 'line',
              data: [[1,50], [2,72], [3,91], [4,24], [5,90,], [6,30,], [7,10]],
              smooth:true,
              label: {
                  show: true,
                  position: "top",
                  textStyle: {
                      fontSize: 16
                  }
              }
            },
            {
              name:'拟合',
              type: 'line',
              data:[[1,100], [2,182], [3,91], [4,234], [5,290,], [6,30,], [7,310]],
              smooth:true,
              label: {
                  show: true,
                  position: "bottom",
                  textStyle: {
                      fontSize: 16
                  }
              }
            },
          ]
        }
      },
      immediate: true,
      deep: true
    },
  },
}
</script>