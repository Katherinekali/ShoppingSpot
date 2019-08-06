import React, { Component } from 'react'
import styles from "./index.module.scss"
import Header from "../../../../components/common/Header"
import { inject, observer } from "mobx-react"
import { Tabs } from 'antd-mobile';
import ProductItem from "../../../../components/classify/productItem"
import BScroll from "better-scroll"

@inject("category")
@observer
class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            categoryId : this.props.match.params.id
        }
        this.catego = React.createRef()
    }

    componentDidMount(){
        //获取导航数据
        this.props.category.getNav(this.state.categoryId)
        //获取产品信息
        this.props.category.getGoodsInfo({categoryId: this.state.categoryId,page: 1, size: 10})
    }

    componentDidUpdate(){
        if(this.catego.current && !this.scroll){
             //初始化better-scroll
            let el=this.catego.current;
            this.scroll=new BScroll(el, {
                click: true,
                probeType: 2,
                pullDownRefresh: {
                    threshold: 50,
                    stop: 20
                },
                pullUpLoad: {
                    threshold: 50
                }
            })
            //下拉
            this.scroll.on("pullingDown", async() => {
                await this.props.category.getGoodsInfo({categoryId: this.state.categoryId, page: 1, size: 10})
                this.scroll.refresh()
                this.scroll.finishPullDown()
            })
            //上拉
            this.scroll.on("pullingUp", async() => {
                await this.props.category.getGoodsInfo({categoryId: this.state.categoryId, page: this.props.category.page+1, size: 10})
                this.scroll.refresh()
                this.scroll.finishPullUp()
            })
        }
    }

    //切换导航获取商品数据
    changeList(tabs){
        this.setState({
            categoryId: tabs.id
        })
        this.props.category.getNav(tabs.id)
        this.props.category.getGoodsInfo({categoryId: tabs.id,page: 1,size:10})
    }

    render() {
        if(!this.props.category.categoryNav.length&&this.props.category.productInfo.length&&this.props.category.currentData.length){
            return null;
        }
        let tabs = [];
        let {categoryNav, productInfo, currentData} = this.props.category;

        //处理导航数据
        categoryNav.map(item => {
            tabs.push({title: item.name, id: item.id})
        })

        return (
            <div className={styles.wrapper}>
                <Header title={"奇趣分类"}></Header>
                {/**导航 */}
                <div className={styles.tab_wrapper}>
                    <Tabs  tabs={tabs&&tabs} onTabClick={(tabs)=>{this.changeList(tabs)}} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}>
                    </Tabs>
                </div>
                <div className={styles.catego_content} ref={this.catego}>
                    <div className={styles.catego_container}>
                        <p className={styles.pullup}>下拉刷新...</p>
                        <div className={styles.catego_wrap}>
                            {/**产品分类详细信息 */}
                            <div className={styles.catego_detail}>
                                {
                                    <div className={styles.title_wrap}>
                                        <div className={styles.catego_title}>{currentData.name}</div>
                                        <div className={styles.catego_sub_title}>{currentData.front_desc}</div>
                                    </div>  
                                }
                            </div>  
                            {/**产品信息 */}
                            <div className={styles.catego_goodsList}>
                                    {productInfo.map(item=>{
                                        return <ProductItem item={item} key={item.id}></ProductItem>
                                    })}
                            </div>
                        </div>
                        <p className={styles.pulldown}>上拉加载...</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Category
