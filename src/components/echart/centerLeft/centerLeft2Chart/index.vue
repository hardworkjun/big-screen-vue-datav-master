<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: [
      [{
							name: "南海诸岛",
							value: 100,
							eventTotal: 100,
							specialImportant: 10,
							import: 10,
							compare: 10,
							common: 40,
							specail: 20
						},
						{
							name: "北京",
							value: 540
						},
						{
							name: "天津",
							value: 130
						},
						{
							name: "上海",
							value: 400
						},
						{
							name: "重庆",
							value: 750
						},
						{
							name: "河北",
							value: 130
						},
						{
							name: "河南",
							value: 830
						},
						{
							name: "云南",
							value: 110
						},
						{
							name: "辽宁",
							value: 19
						},
						{
							name: "黑龙江",
							value: 150
						},
						{
							name: "湖南",
							value: 690
						},
						{
							name: "安徽",
							value: 60
						},
						{
							name: "山东",
							value: 39
						},
						{
							name: "新疆",
							value: 4
						},
						{
							name: "江苏",
							value: 31
						},
						{
							name: "浙江",
							value: 104
						},
						{
							name: "江西",
							value: 36
						},
						{
							name: "湖北",
							value: 52
						},
						{
							name: "广西",
							value: 33
						},
						{
							name: "甘肃",
							value: 7
						},
						{
							name: "山西",
							value: 5
						},
						{
							name: "内蒙古",
							value: 778
						},
						{
							name: "陕西",
							value: 22
						},
						{
							name: "吉林",
							value: 4
						},
						{
							name: "福建",
							value: 18
						},
						{
							name: "贵州",
							value: 5
						},
						{
							name: "广东",
							value: 98
						},
						{
							name: "青海",
							value: 1
						},
						{
							name: "西藏",
							value: 0
						},
						{
							name: "四川",
							value: 44
						},
						{
							name: "宁夏",
							value: 4
						},
						{
							name: "海南",
							value: 22
						},
						{
							name: "台湾",
							value: 3
						},
						{
							name: "香港",
							value: 5
						},
						{
							name: "澳门",
							value: 555
						}
					]

      ]
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>