import { MockMethod, MockConfig } from 'vite-plugin-mock'

//虚拟的已存在用户
function UserList() {
  return [
    {
      username: 'Q',
      password: '123456',
      token:'admin',
    },
    {
      username: 'QQ',
      password: 'abcdefg',
      token:'user',
    }
  ]
}


export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 2000,
    response: ({ body }) => {
      //获取发送来的用户名和密码
      const { username, password } = body;
      //判断用户是否存在
      const checkUser = UserList().find(
        (item) => item.username === username && item.password === password
      );
      if (!checkUser) {
        return {
          code: 201,
          data: {
            message: '账号或密码不正确',
          }
        }
      } else {
        const {token} = checkUser;
        return {
          code: 200,
          data: {
            message: '登录成功',
            token:token
          }
        }
      }
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    response:(req) => {
      //获取请求头携带的token
      const token = req.header.token;
      //查看有无相同token
      const checkUser = UserList().find(
        (item) => item.token === token
      );
      if (!checkUser) {
        return {
          code: 201,
          data: {
            message: '获取用户信息失败',
          }
        }
      } else {
        const {token} = checkUser;
        return {
          code: 200,
          data: {
            message: '获取用户信息成功',
            user: checkUser,
          }
        }
      }
    },
  },
] as MockMethod[]

