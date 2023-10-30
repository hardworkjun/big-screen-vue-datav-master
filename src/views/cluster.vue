<template>
  <div class="container" @click="()=>this.$router.push('/clustering')">
    <div class="d-flex pt-2 pl-2" style="margin-top: 10px;">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="mx-2" >聚类分析</span>
        </div><br>
        <div small-bg>
    <dv-decoration-12 style="width:30px;height:30px;" />
  </div>
      </div>
   <div style="margin-top: 10%; display: flex; justify-content: center;align-items: center;">
    <div
      v-for="(cluster, index) in clusters"
      :key="index"
      class="cluster"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      clusters: [],
    };
  },
  mounted() {
    // 假设二维数组为data，n为外层数组的长度
    const data = [
              [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
          4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ],
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
          4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ],
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
          4, 5, 6, 7, 8, 9, 10,
        ],
    ];
    const n = data.length;

    // 随机生成n个团簇的颜色
    const colors = generateRandomColors(n);

    // 将数据分成n个团簇
    for (let i = 0; i < n; i++) {
      const cluster = {
        color: colors[i],
        points: [],
      };

      // 根据内层数组的数据生成团簇内的点
      for (let j = 0; j < data[i].length; j++) {
        const point = generateRandomPointInCircle(100, 100, 90); // 生成在半径为100的圆内的随机点，圆心为(100, 100)，半径为90
        cluster.points.push(point);
      }

      this.clusters.push(cluster);
    }
  },
};

// 生成随机颜色
function generateRandomColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16); // 生成随机的十六进制颜色值
    colors.push(color);
  }
  return colors;
}

// 生成在圆内的随机点
function generateRandomPointInCircle(centerX, centerY, radius) {
  const angle = Math.random() * Math.PI * 2; // 随机生成角度
  const distance = Math.random() * radius; // 随机生成距离圆心的距离
  const x = centerX + Math.cos(angle) * distance; // 根据角度和距离计算x坐标
  const y = centerY + Math.sin(angle) * distance; // 根据角度和距离计算y坐标
  return { x, y };
}
</script>

<style>
.container {
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  background-color: #fff; /* 点的颜色，可以根据需要进行调整 */
}
</style>