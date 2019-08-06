import React, { Component } from 'react'
import "./index.scss"
import {inject,observer} from "mobx-react"
import { Toast } from 'antd-mobile';
@inject("product","addCart")
@observer

class AddcartBtn extends Component {
    componentDidMount(){
        Toast.loading('Loading...', 30, () => {
            console.log('Load complete !!!');
          });
      
          setTimeout(() => {
            Toast.hide();
          }, 3000);
    }
    showToast() {
        Toast.info('请选择商品数量!!!', 1);
    }
    success() {
        Toast.info('添加购物车成功', 1);
    }
    addCart(){
        let {productInfo}=this.props.product;
        let data=productInfo.productList.filter((item)=>{
            console.log(item,"item",this.props.addCart.colorId)
            return item.goods_specification_ids===`${this.props.addCart.colorId&&this.props.addCart.colorId.id}_${this.props.addCart.attarId&&this.props.addCart.attarId.id}`
        })
        //如果需要选择产品规格
        if(this.props.addCart.number){
            if(data.length&&data[0].goods_number>this.props.addCart.number){
                this.props.addCart.addGoods({goodsId:productInfo.info.id+"",number:this.props.addCart.number,productId:data&&data[0].id})
            }else{
            //只有一种规格
                this.props.addCart.addGoods({goodsId:productInfo.info.id+"",number:this.props.addCart.number,productId:productInfo.productList[0].id})
            }  
            this.success()
        }else{
            this.showToast()
        }
       
    }
    render() {
        return (
            <div className="goods_standed_btn">
                <button className="good_standed_add" onClick={()=>{this.addCart()}}>加入购物车</button>
                <button className="good_standed_order">立即下单</button>
            </div>
        )
    }
}
export default AddcartBtn;