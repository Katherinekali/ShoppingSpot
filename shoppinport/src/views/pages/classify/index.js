import React, { Component } from 'react'
import styles from "./index.module.scss"
import { inject, observer } from "mobx-react"
import CategoryItem from "../../../components/classify/categyItem"
import LineTitle from "../../../components/classify/TitleLine"

@inject("category")
@observer
class Classify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ind: 0
        }
    }

    componentDidMount() {
        //获得初始页数据
        this.props.category.getInit()
    }

    //切换分类
    changeNav(ind, id) {
        //切换左侧导航，获取右侧数据
        this.props.category.getCategory(id)
        this.setState({
            ind: ind
        })
    }

    render() {
        let { categoryList, categoryInfo } = this.props.category
        let { ind } = this.state
        return (
            <div className={styles.categoryWrap}>
                {/**搜索框 */}
                <div className={styles.searchWrap}>
                    <p className={styles.place} style={{ marginBottom: 0 }} onClick={() => { this.props.history.push("/goodSearch") }}><i className="icon iconfont icon-icon-"></i>搜索商品，共239款好物</p>
                </div>
                <div className={styles.categortContent}>
                    {/**导航*/}
                    <ul className={styles.navWrap}>
                        {categoryList && categoryList.map((item, index) => {
                            return <li key={item.id} className={ind == index ? styles.active : ""} onClick={() => { this.changeNav(index, item.id) }}>{item.name}</li>
                        })}
                    </ul>
                    {/**商品分类*/}
                    <div className={styles.categoryContent}>
                        <div className={styles.banner} style={{ backgroundImage: `url(${categoryInfo && categoryInfo.banner_url})` }}>{categoryInfo && categoryInfo.front_name}</div>
                        <LineTitle title={categoryInfo && categoryInfo.name}></LineTitle>
                        <div className={styles.goods}>
                            {categoryInfo.subCategoryList && categoryInfo.subCategoryList.map((item) => {
                                return <CategoryItem item={item} key={item.id}></CategoryItem>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Classify;
