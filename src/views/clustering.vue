<template>
  <div class="fit">
    <button
      class="btn"
      @click="() => this.$router.push('/home')"
      style="background-color: rgb(0, 0, 0, 0)"
    >
      返回
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="chart"></div>
    <div class="container">
      <div
        v-for="(cluster, index) in clusters"
        :key="index"
        class="cluster"
        :style="{}"
      >
        <div class="point-container">
          <div
            v-for="(point, pointIndex) in cluster.points"
            :key="pointIndex"
            :style="{
              left: point.x + 'px',
              top: point.y + 'px',
              backgroundColor: cluster.color,
            }"
            class="point"
          ></div>
        </div>
      </div>
    </div>
    <div
      style="
        margin-top: 30px;
        display: flex;
        width: 400px;
        justify-content: space-between;
        align-items: center;
      "
    >
      <button
        class="btn"
        @click="clusteringData"
        style="background-color: rgb(0, 0, 0, 0)"
      >
        聚类
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- <el-button type="primary" @click="fitMonth" plain>拟合</el-button>  -->
    </div>

    <div class="choose">
      <div
        style="
          width: 50%;
          height: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要聚类的起始年份：</span>
          <el-select v-model="yearStrat" placeholder="请选择">
            <el-option
              v-for="item in optionsYear"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要聚类的起始月份：</span>
          <el-select v-model="monthStart" placeholder="请选择">
            <el-option
              v-for="item in optionsMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要聚类的结束年份：</span>
          <el-select v-model="yearOver" placeholder="请选择">
            <el-option
              v-for="item in optionsYear"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要聚类的结束月份：</span>
          <el-select v-model="monthOver" placeholder="请选择">
            <el-option
              v-for="item in optionsMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要聚类的分类个数：</span>
          <el-select v-model="size" placeholder="请选择">
            <el-option
              v-for="item in optionsSize"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div></div>
      </div>
      <div style="width: 50%;height: 80%;">
        <div style="height: 80%; display: flex;flex-direction: column;justify-content: space-around;">
          <div v-for="(i,index) in dataArr" :key="index" :style="{color:clusters[index].color}" >
            第{{index+1}}团簇共有数据条数: <span style="margin-left: 5px;margin-right: 20px;font-size: 22px;">{{i.length}}</span>
              聚类中心为:<span style="margin-left: 5px;margin-right: 20px;font-size: 22px;">{{ center[index].toFixed(4) }}</span> 
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import Eluster from "./cluster.vue";
import request from "@/utils/request";
export default {
  data() {
    return {
      clusters: [],
      center:[],
      dataArr: [
        // [
        //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
        //   4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        // ],
        // [
        //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
        //   4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        // ],
        // [
        //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
        //   4, 5, 6, 7, 8, 9, 10,
        // ],
      ],
      yearStrat: "2015",
      monthStart: "1",
      yearOver: "2022",
      monthOver: "12",
      size: 3,
      predictedValue: "",
      optionsYear: [
        { value: 2015, label: 2015 },
        { value: 2016, label: 2016 },
        { value: 2017, label: 2017 },
        { value: 2018, label: 2018 },
        { value: 2019, label: 2019 },
        { value: 2020, label: 2020 },
        { value: 2021, label: 2021 },
        { value: 2022, label: 2022 },
      ],
      optionsMonth: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
        { value: 11, label: 11 },
        { value: 12, label: 12 },
      ],
      optionsSize: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
        { value: 11, label: 11 },
      ],
      options: {},
    };
  },
  components: { Eluster },
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
    this.drawPoints()
  },
  methods: {

    clusteringData() {
      this.clusters=[]
      request
        .get(
          "/cluster/" +
            this.yearStrat +
            "/" +
            this.monthStart +
            "/" +
            this.yearOver +
            "/" +
            this.monthOver +
            "/" +
            this.size
        )
        .then((res) => {
          this.dataArr = res.Clusters;
          this.center=res.Centroids
          this.drawPoints()
          console.log(res);
        });
    },
    // 随机点生成
    drawPoints(){
    // 假设二维数组为data，n为外层数组的长度
    const data = this.dataArr;
    const n = data.length;

    // 随机生成n个团簇的颜色
    const colors = this.generateRandomColors(n);

    // 将数据分成n个团簇
    for (let i = 0; i < n; i++) {
      const cluster = {
        color: colors[i],
        points: [],
      };

      // 根据内层数组的数据生成团簇内的点
      for (let j = 0; j < data[i].length; j++) {
        const point = this.generateRandomPointInCircle(100, 100, 150); // 生成在半径为100的圆内的随机点，圆心为(100, 100)，半径为90
        cluster.points.push(point);
      }

      this.clusters.push(cluster);
    }
    },
    // 生成随机颜色
    generateRandomColors(n) {
      const colors = [];
      for (let i = 0; i < n; i++) {
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16); // 生成随机的十六进制颜色值
        colors.push(color);
      }
      return colors;
    },
    generateRandomPointInCircle(centerX, centerY, radius) {
      const angle = Math.random() * Math.PI * 2; // 随机生成角度
      const distance = Math.random() * radius; // 随机生成距离圆心的距离
      const x = centerX + Math.cos(angle) * distance; // 根据角度和距离计算x坐标
      const y = centerY + Math.sin(angle) * distance; // 根据角度和距离计算y坐标
      return { x, y };
    },
  },
};

// 生成在圆内的随机点
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cluster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 10px;
  border-radius: 50%; /* 将区域变成圆形 */
}

.point-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.point {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: absolute;
  background-color: #fff; /* 点的颜色，可以根据需要进行调整 */
}
.fit {
  width: 100%;
  height: 100%;
  padding: 16px 16px 0 16px;
  background-image: url("../assets/pageBg.png");
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-direction: column;
}
.choose {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.btn {
  padding: 10px 20px;
  margin-top: 15px;
  color: #03e9f4;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  left: 35%;
}

.btn:hover {
  border-radius: 5px;
  color: #fff;
  background: #03e9f4;
  box-shadow: 0 0 5px 0 #03e9f4, 0 0 25px 0 #03e9f4, 0 0 50px 0 #03e9f4,
    0 0 100px 0 #03e9f4;
  transition: all 1s linear;
}

.btn > span {
  position: absolute;
}

.btn > span:nth-child(1) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, transparent, #03e9f4);
  left: -100%;
  top: 0px;
  animation: line1 1s linear infinite;
}

@keyframes line1 {
  50%,
  100% {
    left: 100%;
  }
}

.btn > span:nth-child(2) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, transparent, #03e9f4);
  right: 0px;
  top: -100%;
  animation: line2 1s 0.25s linear infinite;
}

@keyframes line2 {
  50%,
  100% {
    top: 100%;
  }
}

.btn > span:nth-child(3) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, #03e9f4, transparent);
  left: 100%;
  bottom: 0px;
  animation: line3 1s 0.75s linear infinite;
}

@keyframes line3 {
  50%,
  100% {
    left: -100%;
  }
}

.btn > span:nth-child(4) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, transparent, #03e9f4);
  left: 0px;
  top: 100%;
  animation: line4 1s 1s linear infinite;
}

@keyframes line4 {
  50%,
  100% {
    top: -100%;
  }
}
</style>
