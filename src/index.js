import Logreg from './packages/logreg/index.js';
import './assets/c/index.css'
const components = [Logreg];

let install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {version: '1.2.7', install}

// module.exports = {
//   version: '1.0.1',
//   install
// };
//
// module.exports.default = module.exports;
