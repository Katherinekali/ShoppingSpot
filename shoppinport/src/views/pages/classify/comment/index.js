import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import "./index.scss"

@inject("product")
@observer
class Comment extends Component {
    render() {
        let { productInfo } = this.props.product;
        console.log(productInfo)
        return (
            <div className='comment_wrap'>
                <div className="goods_comments_content">
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
                </div>
            </div>
        )
    }
}
export default Comment
