import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal, Icon } from 'antd-mobile';
import ProStanded from "../../../../components/classify/productStanded"
import Header from "../../../../components/common/Header"
import ProductInfo from "../../../../components/classify/productItem"
import TitleLine from "../../../../components/classify/TitleLine"
import "./index.scss"
import Swiper from "swiper"
import BScroll from "better-scroll"
@inject("product", "addCart", "collect")
@observer
class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.banner_Swiper = React.createRef();
        this.state = {
            modal2: false,
            flag: false
        }
        this.bsroll = React.createRef()
    }
    componentDidMount() {
        //根据商品id获取到商品详细信息
        this.props.product.products(this.props.match.params.id)
        //根据商品id获取到相关商品
        this.props.product.relatedProducts(this.props.match.params.id)
        //获取购物车商品数量
        this.props.addCart.getNum()
        const node = this.banner_Swiper.current;
        //实例化轮播图
        new Swiper(node, {
            autoplay: true,
            observer: true,
            pagination: {
                el: ".swiper-pagination",
            }
        })

        //实例化
        let current = this.bsroll.current;
        new BScroll(current, {
            click: true,
        })
        //清空购物车数量
        this.props.addCart.change()
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    //添加收藏
    addCol() {
        let { userHasCollect, productInfo } = this.props.product
        this.props.collect.addcollect({ typeId: productInfo.userHasCollect, valueId: this.props.product.productInfo.info.id })
    }
    close() {
        this.setState({
            modal2: false,
        });
    }
    render() {
        let { product, collect, history, addCart } = this.props
        let { productInfo, relatedInfo } = this.props.product;
        return (
            <div className="product_wrap">
                <Header title={productInfo && productInfo.info.name}></Header>
                <div className="product_content" ref={this.bsroll}>
                    <div>
                        <div className="swiper-container product_swiper" ref={this.banner_Swiper}>
                            <div className="swiper-wrapper">
                                {productInfo && productInfo.gallery.map((item, index) => {
                                    return <div className="swiper-slide" key={item.id}>
                                        <img src={item.img_url} alt="" />
                                    </div>
                                })}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                        <ul className="product_servicelist">
                            <li><span>★</span>30天无忧退货</li>
                            <li><span>★</span>48小时快速退款</li>
                            <li><span>★</span>满88元免邮费</li>
                        </ul>
                        <div className="goods_message">
                            <div className="goods_title">{productInfo && productInfo.info.name}</div>
                            <div className="goods_subTitle">{productInfo && productInfo.info.goods_brief}</div>
                            <div className="goods_price">￥{productInfo && productInfo.info.retail_price}</div>
                            {productInfo && productInfo.brand.name ?<div className="goods_making" ><span>{product.productInfo && product.productInfo.brand.name}</span></div>:null}
                        </div>
                        <div className="goods_size" onClick={this.showModal('modal2')}>
                            {productInfo && productInfo.specificationList[0] ?<div className="goods_noCon">
                                <span>1.{productInfo && productInfo.specificationList[0] && productInfo.specificationList[0].valueList[0].value}</span>
                                <span>2.{productInfo && productInfo.specificationList[1] && productInfo.specificationList[1].valueList[0].value}</span>
                            </div>:<div className="goods_noCon"></div>}
                            <div className="goods_totle_price">x {addCart.number}</div>
                            <div>选择规格</div>
                            <Icon type={"right"} size={"xs"}></Icon>
                        </div>
                        <div className="goods_comments">
                            <div className="goods_comments_title">
                                <div className="goods_comments_comment">
                                    <div>评论<span>{productInfo && productInfo.comment.count}</span></div>
                                    <p onClick={() => { history.push(`/comment/${productInfo && productInfo.info.id}`) }}>查看全部</p>
                                </div>
                                <Icon type={"right"} size={"xs"}></Icon>
                            </div>
                            {productInfo && productInfo.comment.count ? <div className="goods_comments_content">
                                <div className="comments_user_info">
                                    <div>匿名用户</div>
                                    <div>{productInfo && productInfo.comment.data.add_time}</div>
                                </div>
                                <div className="comments_default_one">
                                    <div className="user_comments_content">
                                        {productInfo && productInfo.comment.data.content}
                                    </div>
                                    <ul className="user_comment_img">
                                        {productInfo && productInfo.comment.data.pic_list && productInfo.comment.data.pic_list.map((item) => {
                                            return <li key={item.comment_id}>
                                                <img src={item.pic_url} alt="" />
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div> : null}
                        </div>
                        {productInfo && productInfo.attribute.length ? <div className="goods_attribute">
                            <TitleLine title={"商品参数"}></TitleLine>
                            <div className="attribute_list">
                                {productInfo && productInfo.attribute.map((item, index) => {
                                    return <div className="attribute_item" key={index}>
                                        <div className="attribute_item_name">
                                            {item.name}
                                        </div>
                                        <div className="attribute_item_content">
                                            {item.value}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div> : null}
                        <div dangerouslySetInnerHTML={{ __html: productInfo && productInfo.info.goods_desc }} className="attribute_des">

                        </div>
                        <div className="attribute_questions">
                            <TitleLine title={"常见问题"}></TitleLine>
                            {productInfo && productInfo.issue.map((item) => {
                                return <div className="attribute_qes_item" key={item.id}>
                                    <div className="attribute_qes_title">
                                        <span className="attribute_mark">√</span>
                                        {item.question}
                                    </div>
                                    <div className="attribute_qes_anwers">
                                        {item.answer}
                                    </div>
                                </div>
                            })}
                        </div>
                        <div className="attribute_related">
                            <TitleLine title={"大家都在看"}></TitleLine>
                            <div className="attribute_con">
                                {relatedInfo && relatedInfo.map((item) => {
                                    return <ProductInfo key={item.id} item={item}></ProductInfo>
                                })}
                            </div>
                        </div>
                        <Modal
                            popup
                            visible={this.state.modal2}
                            onClose={this.onClose('modal2')}
                            animationType="slide-up"
                        >
                            <ProStanded close={() => { this.close() }}></ProStanded>
                        </Modal>
                    </div>
                </div>
                <div className="product_footer">
                    <div className={collect && collect.collectInfo ? "collect collectBtn" : ("collectBtn")} onClick={() => { this.addCol() }}>
                        <i className="iconfont icon-xingzhuang60kaobei2"></i>
                    </div>
                    <div className="addcartBtn" onClick={() => { history.push("/pages/shopping") }}>
                        <i className="iconfont icon-icon_gouwuchexi"></i>
                        <span className="addcart_num">{addCart.totalNum}</span>
                    </div>
                    <div className="goods_standed_btn">
                        <button className="good_standed_add" onClick={this.showModal('modal2')}>加入购物车</button>
                        <button className="good_standed_order">立即下单</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default (props) => <ProductDetail {...props} key={props.location.pathname} />