import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from "axios"

// 流程图插件vue-super-flow
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'
Vue.use(SuperFlow)

//Echarts图表可视化插件
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
// 引入阿里图标库
// import './assets/iconfont/iconfont.css'
//引入字体图标文件
import '@/assets/font/font.css'
//导入动态路由设置js文件
// import "./permission"
import '@/assets/style'


//使用插件注册方式，全局统一管理API接口，高德地图、天地图配置、等资源
//全局导入MVP项目静态配置插件，通过Vue.use()使用插件【对于插件，Vue.use()会直接调用install方法】
import MVPConfig from './utils/mvpConfig.js'
Vue.use(MVPConfig);



Vue.config.productionTip = false

// 完整引入elementUI
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

// 按需引入elementUI
import {
  Button,
  Dialog,
  Input,

  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Table,
  TableColumn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Select,
  Option,
  Slider,
  Row,
  Col,

  Form,
  FormItem,
  ColorPicker,
  Carousel,
  CarouselItem,
  Card,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  RadioGroup,
  RadioButton,
  Drawer,
  Tabs,
  TabPane,
  Image,

} from 'element-ui';
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Input);

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(Select);
Vue.use(DropdownMenu);
Vue.use(Option);
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(ColorPicker);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Card);
Vue.use(Switch);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Drawer);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Image);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
