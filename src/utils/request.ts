//axios二次封装，请求与响应拦截器

import axios from 'axios'
import { ElMessage } from 'element-plus';
//利用axios对象create方法，创建axios实例，方便配置其他设置
let request = axios.create({
    //基础路径
    baseURL: '/api',
    timeout: 5000
});

//添加请求与响应拦截器
request.interceptors.request.use((config) => {
    //config配置对象有headers属性请求头，配置一些公共参数
    //返回配置对象
    return config;
})

//添加响应拦截器
request.interceptors.response.use(
    //成功的回调
    (response) => {
        //简化数据
        return response.data;
    },
    //失败的回调
    (error) => {
        //处理http网络错误
        //存储错误信息
        let message = '';
        let status = error.response.state;
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break;
            case 403:
                message = '无权访问'
                break;
            case 404:
                message = '请求地址错误'
                break;
            case 500:
                message = '服务器出问题'
                break;
            default:
                message = '网络出问题了'
        }
        ElMessage({
            type:'error',
            message,
            grouping: true,
        });

        return Promise.reject(error)
    })

    //对外暴露
    export default request;