import FzmLogReg from './src/index.vue'
FzmLogReg.install = function (Vue) {
    Vue.component(FzmLogReg.name,FzmLogReg)
    // 添加全局方法或属性

    // 添加全局过滤器 Vue.filter()

    // 注入组件 Vue.mixin()

    // 添加实例方法 Vue.prototype
}

export default FzmLogReg;
