//登录接口参数
export interface loginForm{
    telephone:string,
    password:string
}

//登录，注册返回数据类型
export interface userResponseData {
    code:number,
    message:string
}