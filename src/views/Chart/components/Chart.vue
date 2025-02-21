<template>
  <div>
    <h2>API 使用统计</h2>
    <p>为您识别信息的总次数: {{ totalCount }}</p>
    <!-- 饼图容器 -->
    <div id="pie-chart" style="width: 600px; height: 400px;"></div>
    <table border="1">
      <thead>
        <tr>
          <th>API 种类</th>
          <th>使用次数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(count, apiType) in formattedApiUsageCounts" :key="apiType">
          <td>{{ apiType }}</td>
          <td>{{ count }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import useUserStore from '@/stores/modules/user'; // 确保路径正确
import * as echarts from 'echarts';

// 定义基础 URL
const baseUrl = 'http://47.104.150.153:7000';

// 定义响应数据的类型
interface ApiUsageResponse {
  code: number;
  message: string;
  all: number;
  data: { [key: string]: number };
}

// 存储总使用次数
const totalCount = ref(0);
// 存储各个 API 种类的使用次数
const apiUsageCounts = ref<{ [key: string]: number }>({});
// 存储格式化后的 API 种类使用次数
const formattedApiUsageCounts = ref<{ [key: string]: number }>({});
// 存储错误信息
const errorMessage = ref('');

// 定义种类映射
const typeMapping: { [key: string]: string } = {
  '0': '中性',
  '1': '网络交易及兼职诈骗',
  '2': '虚假金融及投资诈骗',
  '3': '身份冒充及威胁诈骗'
};

// 获取 userStore 实例
const userStore = useUserStore();

// 获取 API 使用统计数据的函数
const fetchApiUsageData = async () => {
  // 检查 userStore 中的 telephone 和 password 是否有效
  if (!userStore.telephone || !userStore.password) {
    errorMessage.value = '用户认证信息缺失，请先登录。';
    return;
  }

  try {
    const response = await axios.get<ApiUsageResponse>(
      `${baseUrl}/data/count`,
      {
        headers: {
          'telephone': userStore.telephone,
          'password': userStore.password
        }
      }
    );

    if (response.data.code === 0) {
      totalCount.value = response.data.all;
      apiUsageCounts.value = response.data.data;

      // 格式化 API 种类
      const formattedData: { [key: string]: number } = {};
      for (const [key, value] of Object.entries(apiUsageCounts.value)) {
        const formattedKey = typeMapping[key] || key;
        formattedData[formattedKey] = value;
      }
      formattedApiUsageCounts.value = formattedData;

      // 绘制饼图
      drawPieChart();
    } else {
      errorMessage.value = response.data.message;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 请求出错:', error.response?.data || error.message);
      errorMessage.value = `请求出错: ${error.message}`;
    } else {
      console.error('发生未知错误:', error);
      errorMessage.value = '发生未知错误';
    }
  }
};

// 绘制饼图的函数
const drawPieChart = () => {
  const chartDom = document.getElementById('pie-chart');
  if (!chartDom) return;
  const myChart = echarts.init(chartDom);

  const option = {
    title: {
      text: 'API 种类使用次数占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '使用次数',
        type: 'pie',
        radius: '50%',
        data: Object.entries(formattedApiUsageCounts.value).map(([key, value]) => ({
          value,
          name: key
        }))
      }
    ]
  };

  myChart.setOption(option);
};

// 在组件挂载时调用获取数据的函数
onMounted(() => {
  fetchApiUsageData();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>