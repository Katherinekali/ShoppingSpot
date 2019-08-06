import { categoryInit, getCategoryNav, getCategoryGoods, getProductInfo } from "../../services/index"
import { observable, action } from "mobx"

export default class Category {
    //分类初始化数据
    @observable categoryList = [];  //分类页页初始数据
    @observable categoryInfo = [];  //分类页右侧分类数据
    @observable categoryNav = [];   //分类页 跳详情导航数据
    @observable productInfo = [];   //产品信息
    @observable currentData = [];   //分类页跳详情当前分类数据
    @observable page = 1;
    @observable hasFlag = false;

    //获取我的收藏列表
    @action getInit = async () => {
        const data = await categoryInit()
        this.categoryList = data.categoryList
        this.categoryInfo = data.currentCategory
    }

    //获取导航对应分类数据
    @action getCategory = async (id) => {
        const data = await getCategoryGoods(id)
        this.categoryInfo = data.currentCategory
    }

    //获取分类详情页导航信息
    @action getNav = async (id) => {
        const data = await getCategoryNav(id)
        this.categoryNav = data.brotherCategory
        this.currentData = data.currentCategory
    }

    //获取分类对应产品信息
    @action getGoodsInfo = async (params) => {
        this.page = params.page
        const data = await getProductInfo(params)
        if (params.page == 1) {
            this.productInfo = data.data
        } else {
            this.productInfo = [...this.productInfo, ...data.data]
        }
    }
}