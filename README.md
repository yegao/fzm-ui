# fzm-ui
https://www.33.cn

## 安装

npm install --save fzm-ui

### 使用
```javascript
import Vue from 'vue'
import FzmUI from "fzm-ui"
Vue.use(FzmUI);
```
### FzmLogReg组件需要传递三个参数  
`api`:存放所有登录注册相关的http接口方法的对象 详细请查看下面  
`platkey`:项目标记  
`callback`:登录和注册成功之后的回调方法 详细请查看下面  

### 假如需要在 a.vue 中使用fzm-ui中的登录注册组件FzmLogReg
```vue
<template lang="html">
  <div>
    这里是登录注册的例子
    <FzmLogReg v-bind:api="api" v-bind:platkey="'zhaobi'" v-bind:callback="cb"></FzmLogReg>
  </div>
</template>

<script>
import api from './api.js'
export default {
  data(){
    return {
      api,
      cb(type,res){
        console.log(type,res);
      }
    }
  }
}
</script>
```
### 附录`./api.js`
```javascript
const api = {
  getRegisterState(params){ //判断是否已注册
    return restfuls.get(注册接口地址,{ params });
  },
  getCodeBySms(params){ //获取短信验证码 post参数不需要加大括号
    return restfuls.post(获取短信验证码接口地址,params);
  },
  getCodeByEmail(params){ //获取邮箱验证码
    return restfuls.post(获取邮箱验证码接口地址,params);
  },
  getCodeByVoice(params){ //获取语音验证码
    return restfuls.post(获取语音验证码接口地址,params);
  },
  register(params){ //快速注册
    return restfuls.post(快速注册接口地址,params);
  },
  login(params){ //快速登录
    return restfuls.post(快速登录接口地址,params);
  }
}
```
### 附录`callback`

callback会得到两个参数： 第一个参数是回调类型,目前有两个值提供'login' 、 'register'
第二个参数是调用登录接口后返回的结果
```javascript
export default {
  data(){
    return {
      api,
      cb(type,res){
        switch(type){
          case 'login':console.log(`登录成功,登录接口返回的信息是${res}`);break;
          case 'register':console.log(`注册成功,注册接口返回的信息是${res}`);break;
        }
      }
    }
  }
}
```
## 功能完成情况

- [x] ~~手机邮箱切换~~  
- [x] ~~手机验证码注册~~  
- [x] ~~手机验证码登录~~  
- [x] ~~邮箱验证码注册~~  
- [x] ~~邮箱验证码登录~~  
- [ ] 手机设置密码  
- [ ] 手机密码登录  
- [ ] 手机找回密码  
- [ ] 邮箱设置密码  
- [ ] 邮箱密码登录  
- [ ] 邮箱找回密码  
- [ ] icon选择性添加  
- [x] ~~登录防刷验证码
