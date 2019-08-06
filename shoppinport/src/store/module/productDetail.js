import {getProduct,getRelated} from "../../services/index"
import {observable,action} from "mobx"

class Product{
    
    @observable productInfo; //产品信息
    @observable relatedInfo; //相关产品信息

    @action async products(id){
        const data=await getProduct(id)
        this.productInfo=data
    }
    
    @action async relatedProducts(id){
        const data=await getRelated(id)
        this.relatedInfo=data.goodsList
    }
}
export default Product;