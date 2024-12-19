//用户相关接口
import request from "@/utils/request";
import { type loginForm ,type userResponseData} from '@/api/user/type';

//统一管理接口
enum API{
    LOGIN_URL = "/user/login",
    REGISTER_URL = "/user/register"
}
//对外暴露请求函数

//登录接口方法
export const reqLogin = (data:loginForm) => request.post<any,userResponseData>(API.LOGIN_URL,data);

//注册用户信息接口方法
export const reqRegiter = (data:loginForm) => request.post<any,userResponseData>(API.REGISTER_URL,data);