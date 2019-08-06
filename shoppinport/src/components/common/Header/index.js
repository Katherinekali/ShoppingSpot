import React, { Component } from 'react'
import styles from "./index.module.scss"
import {withRouter} from "react-router-dom"

class Header extends Component {
    goback(){
        this.props.history.go(-1)
    }
    render() {
        let {title} = this.props;
        return (
            <div className={styles.header}>
                <span onClick={()=>{this.goback()}}><i className="iconfont icon-fanhui"></i></span>
                <p>{title}</p>
                <span></span>
            </div>
        )
    }
}
Header.defaultProps = {
    clickLeft: () => null,
    title: '标题'
}
export default withRouter(Header)