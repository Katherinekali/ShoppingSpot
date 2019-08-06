import React from "react"
import Loadable from "react-loadable"
import { Toast } from 'antd-mobile';
import ContentLoader from '../components/common/MyContentLoader';
import HomeLoader from "../components/common/MyContentLoader/home"

function Loading() {
    return <div className="loading">
        {Toast.loading('loading', 1)}
    </div>
}

const Page = Loadable({
    loader: () => import('../views/index'),
    loading: Loading
})
const Login = Loadable({
    loader: () => import('../views/login'),
    loading: Loading
})
const Home = Loadable({
    loader: () => import('../views/pages/home'),
    loading: HomeLoader
})
const Special = Loadable({
    loader: () => import('../views/pages/special'),
    loading: ContentLoader
})
const Classify = Loadable({
    loader: () => import('../views/pages/classify'),
    loading: ContentLoader
})
const Shopping = Loadable({
    loader: () => import('../views/pages/shopping'),
    loading:ContentLoader
})
const My = Loadable({
    loader: () => import('../views/pages/my'),
    loading: ContentLoader
})
const Search = Loadable({
    loader: () => import("../views/pages/classify/goodsSearch"),
    loading: ContentLoader
})
const ProductDetail = Loadable({
    loader: () => import('../views/pages/classify/productDetail'),
    loading: ContentLoader
})
const Category = Loadable({
    loader: () => import('../views/pages/classify/category'),
    loading: ContentLoader
})
const TopicalDetail=Loadable({
    loader:()=>import("../views/pages/special/topicalDetail"),
    loading:ContentLoader
})
const TopicalComment=Loadable({
    loader:()=>import("../views/pages/special/allRelated"),
    loading:ContentLoader
})
const TopicCommentWrite=Loadable({
    loader:()=>import("../views/pages/special/topicCommentWrite"),
    loading:ContentLoader
})
const Collectdetail=Loadable({
    loader: ()=>import("../views/pages/my/collectdetail"),
    loading: ContentLoader
})
const Addressdetail=Loadable({
    loader:()=>import("../views/pages/my/addressdetail"),
    loading:ContentLoader
})
const Brandetail=Loadable({
    loader:()=>import("../components/page/brand/brandetail"),
    loading:ContentLoader
})
const Comment=Loadable({
    loader:()=>import("../views/pages/classify/comment"),
    loading:ContentLoader
})


const routes = [{
    path: '/login',
    component: Login
}, {
    path: '/pages',
    component: Page,
    children: [{
        icon: 'iconfont icon-fangzi',
        path: '/pages/page',
        name: '首页',
        component: Home
    }, {
        icon: 'iconfont icon-zhuanti',
        path: '/pages/special',
        name: '专题',
        component: Special
    }, {
        icon: 'iconfont icon-leimupinleifenleileibie',
        path: '/pages/classify',
        name: '分类',
        component: Classify
    }, {
        icon: 'iconfont icon-icon_gouwuchexi',
        path: '/pages/shopping',
        name: '购物车',
        component: Shopping
    }, {
        icon: 'iconfont icon-wode',
        path: '/pages/my',
        name: '我的',
        component: My
    }]
}, {
    path: '/category/:id',
    component: Category
}, {
    path: '/goodSearch',
    component: Search
}, {
    path: '/productDetail/:id',
    component: ProductDetail
},{
    path:'/topicalDetail/:id',
    component:TopicalDetail
},{
    path:'/topicalComment',
    component:TopicalComment
},{
    path:'/topicCommentWrite',
    component:TopicCommentWrite
},{
    path:'/collectdetail',
    component:Collectdetail
},{
    path:'/addressdetail',
    component:Addressdetail
},{
    path:'/brandetail/:id',
    component:Brandetail
},{
    path:'/comment/:id',
    component: Comment
}]
export default routes