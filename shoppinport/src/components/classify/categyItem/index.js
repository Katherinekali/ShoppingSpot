import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import "./index.scss"
class CategoItem extends Component {
    constructor(props) {
        super(props)
    }
    catego_page(id, catego_id) {
        sessionStorage.setItem("categoInfo", JSON.stringify({ id: id, categoId: catego_id }))
        this.props.history.push(`/category/${catego_id}`)
    }
    render() {
        let { item, id } = this.props
        return (
            <div className="CategoItem" onClick={() => { this.catego_page(id, item.id) }}>
                <ProgressiveImage src={item.wap_banner_url} placeholder="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg">
                    {src => <img src={src} className="lazy" alt="an image" />}
                </ProgressiveImage>
                <div className="sub_content_item">
                    {item.name}
                </div>
            </div>
        )
    }
}
export default withRouter(CategoItem)