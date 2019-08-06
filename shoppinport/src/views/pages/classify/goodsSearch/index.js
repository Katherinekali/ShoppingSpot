import React, { Component, Fragment } from 'react'
import styles from "./index.module.scss"
import { SearchBar, Icon } from 'antd-mobile';
import ProductItem from "../../../../components/classify/productItem"
import { inject, observer } from "mobx-react"
import { Debounce } from "../../../../utils/debounce"

@inject("search")
@observer
class GoodsSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: "",
            flag: false, //改变类别样式
            priceStyle: null, //切换价格样式
        }
        // this.method=Debounce((val)=>{
        //     this.props.search.Search(val)
        // },1000)
    }

    componentDidMount() {
        //初始数据
        this.props.search.getKeywords()
    }

    //更改input值
    changeVal(val) {
        this.setState({ val: val })
        //判断input是否为空
        if (val.length !== 0) {
            // this.method(val)
            this.props.search.Search(val)
        } else {
            this.props.search.clear()
            this.props.search.getKeywords()
        }
    }

    //enter事件触发
    submit() {
        //随着input值的改变去搜寻下拉列表数据---需要添加节流防抖增加性能
        if (this.state.val.length) {
            this.props.search.searchRelated({ keyword: this.state.val })
            this.props.search.getKeywords()
        }
    }

    //搜索相关信息
    goSearch(val) {
        this.setState({ val: val })
        this.props.search.searchRelated({ keyword: val })
    }

    //点击取消
    cancel() {
        this.props.search.clear()
    }

    //点击分类进行的操作
    //点击全部，价格，全部分类
    changeList(val) {
        this.setState({ style: val })
        if (val === "componse") {
            this.props.search.searchRelated({ keyword: this.state.val })
            this.setState({ flag: false, priceStyle: null })
        } else if (val === "price") {
            this.props.search.searchRelated({ keyword: this.state.val, sort: "price", order: this.state.priceStyle ? "asc" : "desc" })
            this.setState({ priceStyle: !this.state.priceStyle, flag: false, })
        } else if (val === "allType") {
            this.setState({ flag: !this.state.flag, priceStyle: null })
        }
        //改变分类样式
        this.props.search.changeClassifyStyle(val)
    }

    //改变价格切换样式
    changePrice(e) {
        e.stopPropagation()
        this.setState({ priceStyle: !this.state.priceStyle })
    }

    //点击全部分类下面分类
    getType(ind, id) {
        this.setState({ ind: ind })
        console.log(1)
        //根据id去请求数据
        this.props.search.getType({ categoryId: id, keyword: this.state.val })
    }

    //点击删除历史记录
    clearHistory() {
        this.props.search.clearSearch()
    }

    goTo() {
        this.props.history.go(-1)
        this.props.search.clear()
    }

    render() {
        let { defaultKeyword, historyKeywordList, hotKeywordList, searchList, related, filterCategory, style } = this.props.search
        let { val } = this.state
        return (
            <div className={styles.wrapper}>
                {/** 搜索 */}
                <div className={styles.search}>
                    <i className="iconfont icon-fanhui" onClick={() => { this.goTo() }}></i>
                    <SearchBar placeholder="Search" maxLength={8}
                        showCancelButton={true}
                        placeholder={defaultKeyword && defaultKeyword.keyword}
                        value={val}
                        onChange={(e) => { this.changeVal(e) }}
                        onSubmit={() => { this.submit() }}
                        onCancel={() => { this.cancel() }}
                    />
                </div>
                {!val.length && searchList && searchList.length === 0 ? <Fragment>
                    {/** 历史记录 */}
                    {historyKeywordList && historyKeywordList.length > 0 ? <div className={styles.history}>
                        <div className={styles.history_title}>
                            <p>历史记录</p>
                            <i className="iconfont icon-lajitong" onClick={() => { this.clearHistory() }}></i>
                        </div>
                        <ul>
                            {historyKeywordList && historyKeywordList.map((item, index) => {
                                return <li onClick={() => { this.goSearch(item) }} key={index}>{item}</li>
                            })}
                        </ul>
                    </div> : null}

                    {/** 热门搜索 */}
                    {hotKeywordList && hotKeywordList.length > 0 ? <div className={styles.hot}>
                        <div className={styles.hot_title}>热门搜索</div>
                        <ul>
                            {hotKeywordList && hotKeywordList.map((item, index) => {
                                return <li onClick={() => { this.goSearch(item.keyword) }} className={item.is_hot ? styles.ishot : ""} key={index}>{item.keyword}</li>
                            })}
                        </ul>
                    </div> : null}
                </Fragment> : null}

                {/** 搜索列表*/}
                {searchList.length ? <ul className={styles.searchWrap}>
                        {searchList && searchList.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul> : null}

                {/** 相关产品列表 */}
                {this.props.search.goodsFlag ? (related && related.length ? <div className={styles.related_info}>
                    <ul className={styles.related_info_title} style={{ marginBottom: 0 }}>
                        <li className={style === "componse" ? styles.type : ""} onClick={() => { this.changeList("componse") }}>综合</li>
                        <li className={style === "price" ? styles.type : ""} onClick={() => { this.changeList("price") }}>价格<span>
                            <b className={this.state.priceStyle === true ? styles.style : ""} onClick={(e) => { this.changePrice(e) }}><Icon type="down" size={"xxs"} /></b>
                            <b className={this.state.priceStyle === false ? styles.style : ""} onClick={(e) => { this.changePrice(e) }}><Icon type="up" size={"xxs"} /></b></span></li>
                        <li className={this.state.style === "allType" ? styles.type : ""} onClick={() => { this.changeList("allType") }}>全部分类</li>
                    </ul>
                    {this.state.flag ? <div className={styles.all_classify_list}>
                        {filterCategory && filterCategory.map((item, index) => {
                            return <span className={this.state.ind === index ? styles.active : ""} key={index}
                                onClick={() => { this.getType(index, item.id) }}
                            >{item.name}</span>
                        })}
                    </div> : null}
                    <div className={styles.related_info_content}>
                        <div>
                            {related && related.map((item, index) => {
                                return <ProductItem key={index} item={item}></ProductItem>
                            })}
                        </div>
                    </div>
                </div> : <div className={styles.imgWrap}>
                    <div>
                        <div className={styles.img}></div>
                        <p>您寻找的东西还未上架</p>
                    </div>
                </div>) : null}
            </div>
        )
    }
} 

export default GoodsSearch;