import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import "./topical.css"

class Recommend extends Component {
    render() {
        let { relateds, isShow } = this.props
        return (
            <>
                {
                    relateds && relateds.map((item) => {
                        return <NavLink key={item.id} className={isShow ? "topicItem" : "topicItem topicItemShow"} to={"/topicalDetail/" + item.id}>
                            <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg" data-src={item.scene_pic_url}/>
                            <div className={isShow ? "topicItemTitle" : "topicItemTitle topicItemIsShow"}>{item.title}</div>
                            <div className="topicItemSubtitle">{item.subtitle}</div>
                            <div className={isShow ? "topicItemPrice" : "topicItemPrice topicItemIsShow"}>{item.price_info}元起</div>
                        </NavLink>
                    })
                }
            </>
        )
    }
}
export default Recommend