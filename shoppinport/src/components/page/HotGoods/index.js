import React from 'react';
import { withRouter } from "react-router-dom"
import ProgressiveImage from 'react-progressive-image'
class HotGoods extends React.Component {
    constructor(props) {
        super(props)
        this.wrapper = React.createRef()
    }
    goTo(item) {
        sessionStorage.setItem("productId", JSON.stringify({ id: item.id }))
        this.props.history.push(`/productDetail/${item.id}`)
    }
    render() {
        let { hotGoodsList } = this.props;
        return <div className='hotGoodsBox' ref={this.wrapper} style={{marginBottom:".1rem"}}>
            <div className='hotGoodsTitle'>人气推荐</div>
            {
                hotGoodsList && hotGoodsList.map((item, index) => {
                    return <div key={index} className='newGoodsWrap' onClick={() => { this.goTo(item) }}>
                        <a className='hotGoodsItem'>
                            <ProgressiveImage src={item.list_pic_url} placeholder="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg">
                                {src => <img src={src} className="lazy" alt="an image" />}
                            </ProgressiveImage>
                            <div className='hotGoodsInfos'>
                                <div className='hotGoodsName'>{item.name}</div>
                                <div className='hotGoodsInfo'>{item.goods_brief}</div>
                                <div className='hotGoodsPrice'>￥{item.retail_price}</div>
                            </div>
                        </a>
                    </div>
                })
            }
        </div>
    }
}
export default withRouter(HotGoods)