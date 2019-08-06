import React, { Component } from 'react'
import RouterView from '../router/index'
import Footer from '../components/common/Footer'
import "./index.scss"


class IndexPage extends Component {
    render() {
        return (
            <div className='wrap'>
                <React.Fragment >
                    <div className='section'>
                        <RouterView {...this.props} />
                    </div>
                </React.Fragment>
                <Footer {...this.props}></Footer>
            </div>
        )
    }
}
export default IndexPage
