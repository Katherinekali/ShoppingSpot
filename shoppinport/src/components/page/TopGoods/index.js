import React from 'react';
import './index.scss'
import { Carousel, WingBlank } from 'antd-mobile';
import ProgressiveImage from 'react-progressive-image'
class TopGoods extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }
    render() {
        return <WingBlank className='WingBlank'>
            <div className='topGoodsTitle'>专题精选</div>
            <Carousel className="space-carousel"
                frameOverflow="visible"
                cellSpacing={10}
                slideWidth={0.8}
                autoplay
                infinite
                dots={false}
                afterChange={index => this.setState({ slideIndex: index })}
            >
                {this.props.topicList && this.props.topicList.map((val, index) => (
                    <a
                        key={val.id}
                        style={{
                            display: 'block',
                            position: 'relative',
                            height: this.state.imgHeight,

                        }}
                    >
                        <ProgressiveImage src={val.item_pic_url} placeholder="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg">
                            {src => <img src={src} className='img' alt="an image"
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    this.setState({ imgHeight: 'auto' });
                                }} />}
                        </ProgressiveImage>
                        <div className='topGoodSubTitle'>
                            {val.title}
                            <span className='topGoodPrice'>￥{val.price_info}元起</span>
                        </div>
                        <div className='topGoodTitle'>{val.subtitle}</div>
                    </a>
                ))}
            </Carousel>
        </WingBlank>
    }
}

export default TopGoods
