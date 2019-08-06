import AddCart from "./module/addCart"
import Category from "./module/category"
import GoodsSearch from "./module/goodsSearch"
import ProductDetail from "./module/productDetail"
import ShopCar from "./module/shopCar"
import Collect from "./module/collect"
import Login from "./module/login"
import Special from "./module/special"
import Page from "./module/page"
import Addres from "./module/addres"
import Brandetail from "./module/brandetail"
import IsLoading from "./module/loading"

//实例化
let addCart = new AddCart()
let category = new Category()
let search = new GoodsSearch()
let product = new ProductDetail()
let shopCar = new ShopCar()
let collect = new Collect()
let login=new Login()
let special=new Special()
let page=new Page()
let addres=new Addres()
let brandetail =new Brandetail()
let loading=new IsLoading()


export default {
    login,
    special,
    product,
    page,
    shopCar,
    addCart,
    collect, 
    addres,
    brandetail,
    search,
    category,
    loading,
}