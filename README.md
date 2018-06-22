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
### FzmLogReg组件需要传递四个参数  
`api`: Object 存放所有登录注册相关的http接口方法的对象 详细请查看下面  
`platkey`: String 项目标记  
`callback`: Function 登录和注册成功之后的回调方法 详细请查看下面  
`open`: Boolean 是否显示登录注册弹框,一般情况下这个属性是一个sync属性，所以请在open后面加上.sync  
`icon`: String 图标地址,不传递则没有图标,传入'default'则为默认图标(目前是找币的图标，以后会修改成33.cn的logo)  
`maxsec`: Number 验证码倒计时最大秒数,不传则为60秒   
`sty`: String 风格 'absolute' 'relative' 'auto',不填为fixed风格,并wrap宽高均为100%,设置为'auto'则宽高均为auto;

### 假如需要在 a.vue 中使用fzm-ui中的登录注册组件FzmLogReg  
```vue
<template lang="html">
  <div>
    这里是登录注册的例子
    <FzmLogReg :api="api" :platkey="'zhaobi'" :callback="cb" :open.sync="open" :icon="'default'"></FzmLogReg>
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
      },
      open:true
    }
  }
}
</script>
```

### 附录`./api.js`
```javascript
const api = {
  getRegisterState(params){ //判断是否已注册。注意!get方式的请求params外面需要包裹一个大括号
    return restfuls.get(注册的接口地址,{ params });
  },
  getCodeBySms(params){ //获取短信验证码 post参数不需要加大括号
    return restfuls.post(获取短信验证码的接口地址,params);
  },
  getCodeByEmail(params){ //获取邮箱验证码
    return restfuls.post(获取邮箱验证码的接口地址,params);
  },
  getCodeByVoice(params){ //获取语音验证码
    return restfuls.post(获取语音验证码的接口地址,params);
  },
  register(params){ //快速注册
    return restfuls.post(快速注册的接口地址,params);
  },
  login(params){ //快速登录
    return restfuls.post(快速登录的接口地址,params);
  },
  setPassword(params){ //第一次设置密码
    return restfuls.post(第一次设置密码的接口地址,params);
  },
  resetPassword(params){ //找回密码
    return restfuls.post(找回密码的接口地址,params);
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

## 记住密码
点击记住密码会生成一个包含用户登录信息的cookie,cookie名为userinfo,有效时间为10天，值为一个json字符串
```
{
  "area":{
    "code":"+86",
    "name":"中国"
  },
  "mobile":{
    "type":"sms",
    "number":"15888888888",
    "password":"88888888"
  },
  "email":{
    "number":"88888888@163.com",
    "password":"88888888"
  }
}
```
可以使用JSON.parse可以解析出该用户信息,然后进行操作

自定义样式配置
如果你需要自定义样式，请直接编写自己的css样式覆盖默认样式
.fzm-logreg-wrap{
  //略
}
.fzm-logreg-win{
  //略
}

## 功能完成情况

- [x] ~~手机邮箱切换~~  
- [x] ~~手机验证码注册~~  
- [x] ~~手机验证码登录~~  
- [x] ~~邮箱验证码注册~~  
- [x] ~~邮箱验证码登录~~  
- [x] ~~手机设置密码~~   
- [x] ~~手机密码登录~~  
- [x] ~~手机找回密码~~  
- [x] ~~邮箱设置密码~~  
- [x] ~~邮箱密码登录~~  
- [x] ~~记住密码~~  
- [x] ~~邮箱找回密码~~  
- [x] ~~icon选择性添加~~  
- [x] ~~登录防刷验证码~~  
- [x] ~~验证码数秒倒计时~~  

## 发现BUG  
- [ ] 有时候腾讯云的验证不出现  
- [ ] 多次发送验证码之后,进行注册，后台以第一次发送的验证码为正确的验证码,而不是以最后一次发送的验证码为验证码  
- [x] ~~腾讯云验证码在加载之后虽然进行capDestory操作，但是在html中仍然保留了创建的script(老版本也存在该问题)~~  
