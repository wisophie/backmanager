
import VueRouter from 'vue-router'

import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import Users from '@/views/users/Users.vue'
import Rights from '@/views/rights/Rights.vue'
import Roles from '@/views/roles/Roles.vue'
import Goods from '@/views/goods/Goods.vue'
import Add from '@/views/goods/Add.vue'
import Categories from '@/views/categories/Categories.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: "/login",
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: "/welcome",
    children: [{ path: "/welcome", name: "Welcome", component: Welcome },
    { path: "/users", name: "users", component: Users },
    { path: "/rights", name: "rights", component: Rights },
    { path: "/roles", name: "roles", component: Roles },
    { path: "/goods", name: "goods", component: Goods },
    { path: "/goods/add", name: "add", component: Add },
    { path: "/categories", name: "categories", component: Categories }
    ],

  },
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next()
  const tokenStr = window.sessionStorage.getItem("token")
  // await request.get("/admin/server").then((res) => {
  //   console.log(res);
  //   console.log(res.data["status"])
  // if (res.data.code === 401) return next("/login");
  // next();
  if (!tokenStr) return next("/login")
  next()


  // });

})

export default router
