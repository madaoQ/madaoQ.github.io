//创建用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqRegiter } from '@/api/user';
import { type loginForm } from '@/api/user/type';
import { useRouter } from "vue-router";
import { getTimeState } from "@/utils";
import { ElNotification } from "element-plus";
import {ref} from "vue"
import type { S } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库数据
    state: () => {
        return {
            telephone:ref(''),
            password:ref('')
        }
    },
    actions: {
        //用户登陆方法
        async userLogin(data: loginForm,router:any,tele:string,pass:string) {
            try {
                const result = await reqLogin(data);
                console.log('Login response:', result);
                if (result.code === 0) {
                    router.replace({
                        name: 'MessageList', // 使用路由名称而不是路径
                        params: {}
                    });

                    this.telephone = tele;
                    this.password = pass;

                    //Fixed 为什么consolelog data类型是formData而不是我自己的interface
                    console.log("userstoreData ",this.telephone,this.password)
                    console.log("userstoreData ",data.telephone,data.password)
                    console.log(data)

                    ElNotification({
                        title: getTimeState(),
                        message: "欢迎登录 反诈骗",
                        type: "success",
                        duration: 3000
                    });
                } else {
                    ElNotification({
                        title: getTimeState(),
                        message: `用户不存在`, // 显示错误信息
                        type: "error",
                        duration: 3000
                    });
                }
            } catch (error) {
                console.error('Login request failed:', error);

                ElNotification({
                    title: getTimeState(),
                    message: "登录请求失败，请稍后再试。",
                    type: "error",
                    duration: 3000
                });
            }
        },
        //用户注册方法
        async userRegister(data: loginForm) {
            try {
                const result = await reqRegiter(data);
                console.log('Regiter response:', result);
                if (result.code === 0) {
                    ElNotification({
                        title: getTimeState(),
                        message: "注册成功",
                        type: "success",
                        duration: 3000
                    });
                } else {
                    ElNotification({
                        title: getTimeState(),
                        message: `用户已存在`, // 显示错误信息
                        type: "error",
                        duration: 3000
                    });
                }
            } catch (error) {
                console.error('Register request failed:', error);

                ElNotification({
                    title: getTimeState(),
                    message: "注册请求失败，请稍后再试。",
                    type: "error",
                    duration: 3000
                });
            }
        },
    },
    getters: {

    }})

//对外暴露获取小仓库的方法
export default useUserStore;