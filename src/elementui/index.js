import {
  Form, FormItem, Button, Input, Message,
  Upload, Checkbox, Container, Header,
  Aside, Main, Menu, Submenu, MenuItemGroup,
  MenuItem, Breadcrumb, BreadcrumbItem, Card,
  Row, Col, Table, TableColumn, Tooltip, Switch,
  Pagination, Dialog, MessageBox, Tag, Tree, Select, Option,
  Alert, Step, Steps, Tabs, TabPane, Cascader,
} from 'element-ui'


const element = {
  install: function (Vue) {
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Input)
    Vue.prototype.$message = Message
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.use(Upload)
    Vue.use(Checkbox)
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItemGroup)
    Vue.use(MenuItem)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Card)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Switch)
    Vue.use(Tooltip)
    Vue.use(Pagination)
    Vue.use(Dialog)
    Vue.use(Tag)
    Vue.use(Tree)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Alert)
    Vue.use(Step)
    Vue.use(Steps)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Cascader)

  }
}
export default element