import React from "react"
import { Carousel } from "antd"
import './carousel.css'
import 'antd/dist/antd.css'
import { inject, observer } from "mobx-react"
import ProgressiveImage from 'react-progressive-image'
@inject("page")
@observer
class Carousels extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { getpageList } = this.props.page
    if (!Object.keys(getpageList).length) {
      return null;
    }
    return <div className="carousel">
      <Carousel autoplay >
        {
          getpageList.banner.map((item, index) => {
            return <dl key={index}>
              <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg" data-src={item.image_url} />
            </dl>
          })
        }
      </Carousel>
    </div>
  }
}
export default Carousels;