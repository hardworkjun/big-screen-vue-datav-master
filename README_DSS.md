# DSS决策支持系统使用说明

### 一、项目描述

- 一个基于 Vue、Datav、Echart 、SpringBoot、mySql、mybatis框架的 " **数据大屏项目** "，通过 Vue 组件实现数据动态刷新渲染，内部图表可实现自由替换。部分图表使用 DataV 自带组件，可进行更改，详情请点击下方 DataV 文档。
- 项目需要全屏展示（按 F11）。
- 项目部分区域使用了全局注册方式，增加了打包体积，在实际运用中请使用 **按需引入**。
- 前端项目托管在[hardworkjun/big-screen-vue-datav-master](https://github.com/hardworkjun/big-screen-vue-datav-master)仓库
- 后端项目托管在[hardworkjun/DSS-springboot ](https://github.com/hardworkjun/DSS-springboot)仓库
- 拉取项目之后，建议按照自己的功能区域重命名文件，现以简单的位置进行区分。
- 项目环境：
  - 前端：Vue-cli-3.0、DataV-2.7.3、Echarts-4.6.0(如果5.x版本有问题，请切换到4.x版本)、Webpack-4.0、Npm-6.13、Node-v12.16。
  - 后端：jdk11、mysql8(数据库)、springboot2.7.17、mybatis2.3.1...(其他各种库的版本请再pom.xml文件中查看)

- 请拉取 master 分支的代码，其余分支是开发分支。

参考文档：

1.  [Vue 官方文档](https://cn.vuejs.org/v2/guide/instance.html)
2.  [DataV 官方文档](http://datav.jiaminghi.com/guide/)
3.  [echarts 实例](https://echarts.apache.org/examples/zh/index.html)，[echarts API 文档](https://echarts.apache.org/zh/api.html#echarts)
4.  [element](https://element.eleme.cn/)
5.  [MyBatis中文网](https://mybatis.net.cn/)
6.  [Spring Boot](https://spring.io/projects/spring-boot)

### 二、主要文件介绍

##### 前端

| 文件                | 作用/功能                                                              |
| ------------------- | --------------------------------------------------------------------- |
| main.js             | 主目录文件，引入 Echart/DataV 等文件                                    |
| utils               | 工具函数与 mixins 函数等                                                |
| views/ index.vue    | 项目主结构                                                             |
| views/其余文件       | 界面各个区域组件（按照位置来命名）                                       |
| assets              | 静态资源目录，放置 logo 与背景图片                                       |
| assets / style.scss | 通用 CSS 文件，全局项目快捷样式调节                                      |
| assets / index.scss | Index 界面的 CSS 文件                                                  |
| components/echart   | 所有 echart 图表（按照位置来命名）                                      |
| common/...          | 全局封装的 ECharts 和 flexible 插件代码（适配屏幕尺寸，可定制化修改）     |

##### 后端

| 文件            | 作用/功能                         |
| --------------- | --------------------------------- |
| application.yml | 对各种框架和数据库的整合配置文件  |
| DataMapper.xml  | 编写各种sql以及与mapper之间的映射 |
| pom.xml         | 引入并管理各种框架和技术的依赖    |
|                 |                                   |



### 三、前端使用介绍

#### 启动项目

需要提前安装好 `nodejs` 与 `yarn`,下载项目后在项目主目录下运行 `yarn` 拉取依赖包。安装完依赖包之后然后使用 `vue-cli` 或者直接使用命令`npm run serve`，就可以启动项目，启动项目后需要手动全屏（按 F11）。如果编译项目的时候提示没有 DataV 框架的依赖，输入 `npm install @jiaminghi/data-view` 或者 `yarn add @jiaminghi/data-view` 进行手动安装。

#### 封装组件渲染图表

所有的 ECharts 图表都是基于 `common/echart/index.vue` 封装组件创建的，已经对数据和屏幕改动进行了监听，能够动态渲染图表数据和大小。在监听窗口小大的模块，使用了防抖函数来控制更新频率，节约浏览器性能。

项目配置了默认的 ECharts 图表样式，文件地址：`common/echart/theme.json`。

封装的渲染图表组件支持传入以下参数，可根据业务需求自行添加/删除。

参数名称              | 类型      | 作用/功能                      |
| -------------------| --------- | ------------------------------|
| id                 | String    | 唯一 id，渲染图表的节点（非必填，使用了 $el）|
| className          | String    | class样式名称（非必填）                 |
| options            | Object    | ECharts 配置（必填）                   |
| height             | String    | 图表高度（建议填）                    |
| width              | String    | 图表宽度（建议填）                    |

#### 动态渲染图表

动态渲染图表案例为 `components` 目录下各个图表组件，index 文件负责数据获取和处理，chart 文件负责监听和数据渲染。

chart 文件的主要逻辑为：

```html
<template>
  <div>
    <Echart :options="options" id="id" height="height" width="width" ></Echart>
  </div>
</template>

<script>
  // 引入封装组件
import Echart from '@/common/echart'
export default {
  // 定义配置数据
  data(){ return { options: {}}},
  // 声明组件
  components: { Echart},
  // 接收数据
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    },
  },
  // 进行监听，也可以使用 computed 计算属性实现此功能
  watch: {
    cdata: {
      handler (newData) {
        this.options ={
          // 这里编写 ECharts 配置
        }
      },
      // 立即监听
      immediate: true,
      // 深度监听
      deep: true
    }
  }
};
</script>
```

#### 复用图表组件

复用图表组件案例为中间部分的 `任务通过率与任务达标率` 模块，两个图表类似，区别在于颜色和主要渲染数据。只需要传入对应的唯一 id 和样式，然后在复用的组件 `components/echart/center/centerChartRate` 里进行接收并在对应位置赋值即可。

如：在调用处 `views/center.vue` 里去定义好数据并传入组件

```js
//组件调用
<span>今日任务通过率</span>
<centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />

<span>今日任务达标率</span>
<centerChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />

...
import centerChart from "@/components/echart/center/centerChartRate";

data() {
  return {
    rate: [
      {
        id: "centerRate1",
        tips: 60,
        ...
      },
      {
        id: "centerRate2",
        tips: 40,
        colorData: {
          ...
        }
      }
    ]
  }
}
```

#### 更换边框

边框是使用了 DataV 自带的组件，只需要去 views 目录下去寻找对应的位置去查找并替换就可以，具体的种类请去 DavaV 官网查看
如：

```html
<dv-border-box-1></dv-border-box-1>
<dv-border-box-2></dv-border-box-2>
<dv-border-box-3></dv-border-box-3>
```

#### Mixins 解决自适应适配功能

使用 mixins 注入解决了界面大小变动图表自适应适配的功能，函数在 `utils/resizeMixins.js` 中，应用在 `common/echart/index.vue` 的封装渲染组件，主要是对 `this.chart` 进行了功能注入。

#### 屏幕适配

1.5 版本项目放弃了 flexible 插件方案，将 rem 改回px，使用更流程通用的 `css3：scale` 缩放方案，通过 `ref` 指向 `views/index`，屏幕改变时缩放内容。项目的基准尺寸是 `1920px*1080px`，所以支持同比例屏幕 100% 填充，如果非同比例则会自动计算比例居中填充，不足的部分则留白。实现代码在 `src/utils/userDraw

#### 请求数据

现在的项目未使用前后端数据请求，建议使用 axios 进行数据请求，在 main.js 位置进行全局配置。

- vue.config.js配置跨域 （后端地址：http://192.168.137.6:8080）

```js
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  // devServer: {
  //   overlay: {
  //   warnings: false, //不显示警告
  //   errors: false //不显示错误
  //   }
  //   },
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://192.168.137.6:8080',
        pathRewrite:{'^/api':''},
        ws:true,            // 用于支持websocket
        changeOrigin:true,  //用于控制请求头中的host值
      }
    }
  }
}
```



### 四、后端使用介绍

#### 启动项目

1.首先在本地MySQL数据库中创建一个dss数据库，再在dss数据库中执行passenger_volume.sql文件，创建passenger_volume表

2.通过启动DssApplication启动类（含有@SpringBootApplication注解）的main函数来启动项目，无需进行其他配置

### 五、接口管理

/pv/{yearh}/{month}
/{statistics}/{year}/{month}/{volume}/{area}
/{vol}/{area)}/{month}
/{max}/{yearh}/{month}
/{fitting}/{area}/{year}/{month}/{n}
/series/{area}/{alpha}/{year}/{month}/{cluster}/{beforeYearh}/ {beforeMonth}/ {lateYearh}/ {lateMonth}/

### 六、数据库介绍

dss中的passenge_volume表

```sql
	CREATE TABLE `passenger_volume`  (
	`id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `statistics_year` int NOT NULL COMMENT '统计年份',
  `statistics_month` tinyint NULL DEFAULT NULL COMMENT '统计月份',
  `volume` int NULL DEFAULT NULL COMMENT '本月客运量',
  `area` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '地区',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2017 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
```



