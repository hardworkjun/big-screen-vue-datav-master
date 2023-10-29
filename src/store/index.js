import Vue from 'vue'
import Vuex from 'vuex'
import request from "@/utils/request";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    monthData: {
      year: '2020',
      month: '1'
    },
    provinceData:{
      province:'山东',
      month:'1'
    },
    provinceDataList:[],
    pvData: {
      data: [
        {
          name: '周口',
          value: 55
        },
      ],
      carousel: 'single',
      unit: '百人'
    },
    maxValue:{},
  },
  getters: {
    getMonthData(state) {
      return state.monthData
    },
    getPvData(state) {
      return state.pvData
    },
    getProvinceDataList(state){
      return state.provinceDataList
    }

  },
  mutations: {
    updateMonthData(state, monthData) {
      state.monthData = monthData
    },
  },
  actions: {
    asyncUpdatepvData(context) {
      let year = context.state.monthData.year
      let month = context.state.monthData.month
      request.get('/pv/' + year + '/' + month).then((res, req) => {
        let p=Object.keys(res)
        context.state.pvData.data=p.map((i)=>{
           let obj={
              name:i,
              value:res[i]
           }
           return obj
        })
      })
      // context.commit('updatePvData', pvData)
    },
    asyncProvinceData(context,obj){
      context.state.provinceData=obj
      let province = obj.province
      let month = obj.month
      request.get('/vol/' + province + '/' + month).then((res, req) => {
        let p=Object.keys(res) 
        context.state.provinceDataList=p.map((i,index)=>{
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
      })
    },
    asyncMaxValue(context){
      request.get('/max/2020/1').then((res,req)=>{
        let p=Object.keys(res)
        context.state.maxValue=p.map((i)=>{
           let obj={
              name:i,
              value:res[i]
           }
           return obj
        })
      })
    }
  },
  modules: {
  }
})
