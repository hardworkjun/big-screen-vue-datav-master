<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="mx-2 colorBlue">周转量排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      config: {
        header: ["年份", "数量", "增长率"],
        data: [],
        rowNum: 5, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
    };
  },
  watch: {
    "$store.state.provinceDataList": {
      handler: function (newVal, oldVal) {
        let config = this.config;
        config.data = newVal;
        this.config = { ...config };
        console.log(this.config);
      },
    },
  },
  mounted() {
    let config = this.config;
    request.get('/vol/' + '山东' + '/' + '1').then((res, req) => {
        let p=Object.keys(res) 
        config.data=p.map((i,index)=>{
           let a=0
           let b=" class='colorGrass'>↑"
           let aStr='0'
           if(index!=0){
            a=(res[i]/res[i-1] - 1)
              if(a>0){
                aStr=Number(a*100).toFixed(1)
              }else{
                aStr=Number(a*100).toFixed(1).toString().substring(1,Number(a*100).toFixed(1).toString().length)
                b=" class='colorRed'>↓"
              }
            
           }
           let arr=[i,res[i],"<span "+b+aStr+"%</span>"]
           return arr
        })
        this.config = { ...config };
      console.log('this.config',this.config);
      })

  },
};
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 300px;
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 270px;
      height: 340px;
    }
  }
}
</style>
