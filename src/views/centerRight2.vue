<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务通过率</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <!-- <div class="d-flex jc-center">
        <CenterLeft1Chart />
      </div> -->
      <div class="text title" style="text-align: center; margin: 10px 0">
        某省份<br> 2015-2022年客运量数据概览
      </div>
      <div class="text" style="text-align: center; margin: 10px 0">
        请选择要分析的省份
      </div>

      <div class="block selectContianer" style="margin-top: 10px;" >
        <el-select v-model="province " placeholder="请选择" style="width: 110px;margin-left: 10px;margin-right: 10px;">
          <el-option
            v-for="(item,i) in optionsProvince "
            :key="i"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="month " placeholder="请选择" style="width: 110px;margin-left: 10px;margin-right: 10px;">
          <el-option
            v-for="(item,i) in optionsMonth "
            :key="i"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <button class="btn" @click="searchProvince" style="background-color: rgb(0, 0, 0,0);">查询
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
      </button>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div
          class="item-box mt-2"
          v-for="(item, index) in numberData"
          :key="index"
        >
          <div class="d-flex">
            <span class="coin" v-if="item.text=='累计值'">💪</span>
            <span class="coin" v-if="item.text=='平均值'">✋</span>
            <span class="coin" v-if="item.text=='最低值年份'"> 👇</span>
            <span class="coin" v-if="item.text=='最高值年份'">👆</span>
            <dv-digital-flop class="dv-digital-flop" :config="item.number" />
          </div>
          <p class="text" style="text-align: center;">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import CenterLeft1Chart from "@/components/echart/centerLeft/centerLeft1Chart";
export default {
  data() {
    return {
      province : "山东",
      month:'1',
      optionsProvince : [
      { value: '山东', label: '山东' },
      { value: '江苏', label:  '江苏' },
      { value: '天津', label:  '天津' },

    ],
    optionsMonth:[
      {value:1,label:1},
      {value:2,label:2},
      {value:3,label:3},
      {value:4,label:4},
      {value:5,label:5},
      {value:6,label:6},
      {value:7,label:7},
      {value:8,label:8},
      {value:9,label:9},
      {value:10,label:10},
      {value:11,label:11},
      {value:12,label:12},
    ],
      numberData: [
        {
          number: {
            number: [15.12],
            toFixed: 2,
            textAlign: "left",
            content: "{nt}万人",
            style: {
              fontSize: 20,
            },
          },
          text: "累计值",
        },
        {
          number: {
            number: [27],
            toFixed: 2,
            textAlign: "left",
            content: "{nt}万人",
            style: {
              fontSize: 24,
            },
          },
          text: "平均值",
        },
        {
          number: {
            number: [2018],
            toFixed: 0,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 24,
            },
          },
          text: "最高值年份",
        },
        {
          number: {
            number: [2020],
            toFixed: 0,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 24,
            },
          },
          text: "最低值年份",
        },
      ],
    };
  },
  components: {
    CenterLeft1Chart,
  },
  // watch: {
  //   "$store.state.provinceData": {
  //     handler: function (newVal, oldVal) {
  //       let pList =this.$store.getters.getProvinceDataList
  //       if(pList.length==0) return
  //       let tempList=this.numberData
  //       // 计算累计值
  //       let sum=0
  //         pList.forEach((t,i)=>{
  //           sum= Number(t[1])+sum 
  //         })
  //       tempList[0].number.number[0]=(sum/100)
  //       this.numberData[0].number={...tempList[0].number}
  //       // 计算平均值
  //       tempList[1].number.number[0]=(sum/2100)
  //       this.numberData[1].number={...tempList[1].number}
  //       // 最高值年份
  //       let max=2015
  //       let temp=pList[0][1]
  //         pList.forEach((t,i)=>{
  //             if(t[1]>temp){
  //               max=Number(t[0])
  //               temp=t[1]
  //             }
  //         })
  //       tempList[2].number.number[0]=max
  //       this.numberData[2].number={...tempList[2].number}
  //       // 最低值年份
  //       let min=2015
  //       let tp=pList[0][1]
  //         pList.forEach((t,i)=>{
  //             if(t[1]<tp){
  //               min=Number(t[0])
  //               tp=t[1]
  //             }
  //         })
  //       tempList[3].number.number[0]=min
  //       this.numberData[3].number={...tempList[3].number}
  //     },
  //   },
  // },
  mounted() {
    this.changeTiming();
    this.$store.dispatch('asyncUpdatepvData')
    this.updateData()
  },
  methods: {
    updateData(){
      let pList =this.$store.getters.getProvinceDataList
        if(pList.length==0) return
        let tempList=this.numberData
        // 计算累计值
        let sum=0
          pList.forEach((t,i)=>{
            sum= Number(t[1])+sum 
          })
        tempList[0].number.number[0]=(sum/100)
        this.numberData[0].number={...tempList[0].number}
        // 计算平均值
        tempList[1].number.number[0]=(sum/2100)
        this.numberData[1].number={...tempList[1].number}
        // 最高值年份
        let max=2015
        let temp=pList[0][1]
          pList.forEach((t,i)=>{
              if(t[1]>temp){
                max=Number(t[0])
                temp=t[1]
              }
          })
        tempList[2].number.number[0]=max
        this.numberData[2].number={...tempList[2].number}
        // 最低值年份
        let min=2015
        let tp=pList[0][1]
          pList.forEach((t,i)=>{
              if(t[1]<tp){
                min=Number(t[0])
                tp=t[1]
              }
          })
        tempList[3].number.number[0]=min
        this.numberData[3].number={...tempList[3].number}
    },
    searchProvince(){
      let objProvince={
        province:this.province,
        month:this.month
      }
      this.$store.dispatch('asyncProvinceData', objProvince)
     setTimeout(()=>{
      this.updateData()
     },100)
    },
    changeTiming() {
      setInterval(() => {
        this.changeNumber();
      }, 3000);
    },
    changeNumber() {
      // this.numberData.forEach((item, index) => {
      //   item.number.number[0] += ++index;
      //   item.number = { ...item.number };
      // });
    },
  },
};
</script>

<style lang="scss">
.selectContianer {
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


<style lang="scss" scoped>
$box-width: 300px;
$box-height: 410px;

#centerLeft1 {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      // 金币
      .coin {
        position: relative;
        top: 6px;
        font-size: 20px;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
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
    box-shadow: 0 0 5px 0 #03e9f4,
        0 0 25px 0 #03e9f4,
        0 0 50px 0 #03e9f4,
        0 0 100px 0 #03e9f4;
    transition: all 1s linear;
}

.btn>span {
    position: absolute;
}

.btn>span:nth-child(1) {
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

.btn>span:nth-child(2) {
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

.btn>span:nth-child(3) {
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

.btn>span:nth-child(4) {
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
