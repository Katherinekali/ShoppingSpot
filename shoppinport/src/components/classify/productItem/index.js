import React, { Component } from 'react'
import "./index.scss"
import { withRouter } from "react-router-dom"
import ImgLazyLoad from "../../../utils/imgLoading/imgLoading"

class ProductInfo extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        ImgLazyLoad(this.refs.load)
    }
    goToDetail(id) {
        sessionStorage.setItem("productId", JSON.stringify({ id: id }))
        this.props.history.push(`/productDetail/${id}`)
    }
    render() {
        let { item } = this.props
        return (
            <div className="pro_wrap" onClick={() => { this.goToDetail(item.id) }} ref="load">
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg" data-src={item.list_pic_url}/>
                <p className="product_name">{item.name}</p>
                <p style={{ color: "#f00", textAlign: "center" }}>{`￥${item.retail_price}元`}</p>
            </div>
        )
    }
}
export default withRouter(ProductInfo)