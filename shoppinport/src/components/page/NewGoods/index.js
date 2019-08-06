import React from 'react';
import './index.scss'
import { withRouter } from "react-router-dom"
import ProductItem from "../../../components/classify/productItem"
class NewGoods extends React.Component {
    render() {
        let { newGoodsList } = this.props;
        return <div className='newGoodsBox'>
            <div className='newGoodsTitle'>新品首发</div>
            <div className='title'>
                {
                    newGoodsList && newGoodsList.map((item, index) => {
                        return <ProductItem item={item} key={index}></ProductItem>
                    })
                }
            </div>
        </div>
    }
}


export default withRouter(NewGoods)