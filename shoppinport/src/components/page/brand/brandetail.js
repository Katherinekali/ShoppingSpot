import React from 'react';
import './brandetail.scss'
import { Link } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import { inject, observer } from "mobx-react"

@inject('brandetail')
@observer
class Brandetail extends React.Component {
    componentDidMount() {
        this.props.brandetail.getbrandData({ id: this.props.match.params.id })
    }
    render() {
        let { getbrandList } = this.props.brandetail;
        return <div className='brandetail'>
            <header className='headers'>
                <Link to='/pages/page'><Icon type="left" size="xs" /></Link>
                <div>{getbrandList.name}</div>
                <div></div>
            </header>
            <div className='section'>
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8bc5c8ca3da4043fc6c9dbfb32d5dc89_121_121.jpg" data-src={getbrandList.list_pic_url} />
                <p className='breadDesc'>{getbrandList.simple_desc}</p>
            </div>
        </div>
    }
}

export default Brandetail
