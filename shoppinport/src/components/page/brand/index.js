import React from 'react';
import './index.scss'
import { Link } from 'react-router-dom'
import ImgLazyLoad from "../../../utils/imgLoading/imgLoading"
class brand extends React.Component {
    componentDidMount(){
        console.log(this.refs.load,"11")
        ImgLazyLoad(this.refs.load)
    }
    render() {
        let { brand } = this.props;
        return <div className='brandBox' ref="load">
            <div className='brandTitle'>品牌制造商直供</div>
            <div className='title'>
                {
                    brand && brand.map((item, index) => {
                        return <div className='brandWrap' key={index} >
                            <Link to={`/brandetail/` + item.id}>
                                <div className='brandItemName'>{item.name}</div>
                                <div className='brandItemMinPrice'>￥{item.floor_price}元起</div>
                                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg" data-src={item.new_pic_url}/>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    }
}


export default brand