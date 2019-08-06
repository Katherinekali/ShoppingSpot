import React from 'react';
import {inject,observer} from "mobx-react"
import Recommend from "../../../components/topical/recommend"
import "./special.css"
import ImgLazyLoad from "../../../utils/imgLoading/imgLoading"

@inject('special')
@observer
class Special extends React.Component{
    componentDidMount(){
        this.props.special.getTopicData()
        ImgLazyLoad(this.refs.load)
    }
    render(){
        let topicalList=this.props.special.topicList
        return <div className="special" ref="load">
           <Recommend relateds={topicalList} isShow={true}></Recommend>
        </div>
    }
}
export default Special;