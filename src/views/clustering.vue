<template>
  <div class="clustering">
    <div class="left" style="color: white;">
        <div >
            <div>最大值</div>
            <div>中间值</div>
            <div>最小值</div>
        </div>
        <div>
           精确率
        </div>
        <div>
            召回率
        </div>
    </div>
    <div class="right">
      <Echart
        :options="options"
        id="bottomLeftChart"
        height="480px"
        width="100%"
      ></Echart>
      
    </div>
  </div>
</template>
<script>
import Echart from "@/common/echart";
import request from "@/utils/request";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: { Echart },
  mounted() {
    this.options = {
      xAxis: {
        // data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      yAxis: {},
      legend: {
        // 图例
        data: ["原始", "拟合"],
        top: "0%",
      },
      series: [
        {
          name: "原始",
          type: "line",
          data: [
            [1, 50],
            [2, 72],
            [3, 91],
            [4, 24],
            [5, 90],
            [6, 30],
            [7, 10],
          ],
          smooth: true,
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: 16,
            },
          },
        },
        {
          name: "拟合",
          type: "line",
          data: [
            [1, 100],
            [2, 182],
            [3, 91],
            [4, 234],
            [5, 290],
            [6, 30],
            [7, 310],
          ],
          smooth: true,
          label: {
            show: true,
            position: "bottom",
            textStyle: {
              fontSize: 16,
            },
          },
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.clustering {
  width: 100%;
  height: 100%;
  padding: 16px 16px 0 16px;
  background-image: url("../assets/pageBg.png");
  background-size: cover;
  background-position: center center;
  display: flex;
}
.left{
    flex: 1;
}
.right{
    flex: 1;
}
</style>
