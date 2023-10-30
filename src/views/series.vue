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
    <Echart
      :options="options"
      id="bottomLeftChart"
      height="480px"
      width="100%"
    ></Echart>
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
        @click="fitMonth"
        style="background-color: rgb(0, 0, 0, 0)"
      >
        预测
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
        class="selectContianer"
      >
       <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要预测的模型：</span>
          <el-select v-model="moduleValue" placeholder="请选择">
            <el-option
              v-for="item in moduleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要预测的省份：</span>
          <el-select v-model="province" placeholder="请选择">
            <el-option
              v-for="item in optionsProvince"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="color: rgb(45, 140, 240); flex: 1">
          <span>请选择要预测的年份：</span>
          <el-select v-model="year" placeholder="请选择" v-if="this.moduleValue=='指数平滑'" disabled>
            <el-option
              v-for="item in optionsYear"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="year" placeholder="请选择" v-if="this.moduleValue=='ma'" >
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
          <span>请选择要预测的月份：</span>
          <el-select v-model="month" placeholder="请选择">
            <el-option
              v-for="item in optionsMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="color: rgb(45, 140, 240); flex: 1" v-if="this.moduleValue=='指数平滑'">
          <span>请选择拟合平滑系数：</span>
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
        <div style="color: rgb(45, 140, 240); flex: 1" v-if="this.moduleValue=='ma'">
          <span>请选择拟合阶数 (幂)：</span>
          <el-select v-model="size" placeholder="请选择">
            <el-option
              v-for="item in optionsSizeMa"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div></div>
      </div>
      <div style="width: 50%">
        <div style="color: rgb(25, 190, 107)">
          {{ province }}省 {{ year }} 年 {{ month }} 月 预测值:{{
            predictedValue
          }}
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import Echart from "@/common/echart";
import request from "@/utils/request";
export default {
  data() {
    return {
      moduleValue:'指数平滑',
      moduleOptions: [
        { label: "移动平均", value: "ma" },
        { label: "指数平滑", value: "指数平滑" },
      ],
      province: "山东",
      year: "2023",
      month: "1",
      size: 1,
      predictedValue: "",
      optionsProvince: [
        { name: "山东", value: "山东" },
        { name: "天津", value: "天津" },
        { name: "江苏", value: "江苏" },
      ],
      optionsYear: [
        { value: 2023, label: 2023 },
        { value: 2024, label: 2024 },
        { value: 2025, label: 2025 },
        { value: 2026, label: 2026 },
        { value: 2027, label: 2027 },
        { value: 2028, label: 2028 },
        { value: 2029, label: 2029 },
        { value: 2030, label: 2030 },
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
        { value: 0.1, label: 0.1 },
        { value: 0.2, label: 0.2 },
        { value: 0.3, label: 0.3 },
        { value: 0.4, label: 0.4 },
        { value: 0.5, label: 0.5 },
        { value: 0.6, label: 0.6 },
        { value: 0.7, label: 0.7 },
        { value: 0.8, label: 0.8 },
        { value: 0.9, label: 0.9 },
      ],
      optionsSizeMa:[
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
      ],
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
  methods: {
    fitMonth() {
      request
        .get(
          "/series/" +
            this.province +
            "/" +
            this.size +
            "/" +
            this.year +
            "/" +
            this.month+
            "/"+this.moduleValue
        )
        .then((res) => {
          let preList = res.preList;
          let rowList = res.rawList;
          let newOption = this.options;
          newOption.series[0].data = rowList;
          newOption.series[1].data = preList;
          this.predictedValue=preList[preList.length-1][1]
          this.options = { ...newOption };
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss">
.selectContianer {
  .el-input{
    .el-input__inner{
      background-color: rgb(0, 0,0,0);
    border-color: rgb(4,222,233);
    color:  rgb(4,222,233);
    }
  }
  .el-input__inner{
    background-color: rgb(0, 0,0,0);
    border-color: rgb(4,222,233);
    color:  rgb(4,222,233);
  }
  .el-input__inner:hover{
    border-color: rgb(25,188,106);
    color:  rgb(25,188,106);
  }
}

.el-select-dropdown{
  .el-scrollbar{
    background-color: rgb(0, 0,0,0) !important;
  }
}

</style>

  
  <style>
* {
  margin: 0;
  padding: 0;
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
  