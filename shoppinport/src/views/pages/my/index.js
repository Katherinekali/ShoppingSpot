import React from 'react';
import './index.scss'
import {Toast} from 'antd-mobile'
import { Link } from 'react-router-dom';
import {inject,observer} from "mobx-react"
@inject("addres")
@observer
class My extends React.Component {
    constructor() {
        super()
        this.state = {
            myList: [{
                icon: 'icon-wenjianjia',
                name: '我的收藏',
                link: '/collectdetail'
            }, {
                icon: 'icon-weizhi',
                name: '地址管理',
                link: '/addressdetail'
            }, {
                icon: 'icon-icon--copy-copy',
                name: '我的订单'
            }, {
                icon: 'icon-rili',
                name: '周末拼单'
            }, {
                icon: 'icon-youhuiquan',
                name: '优惠券'
            }, {
                icon: 'icon--',
                name: '优选购'
            }, {
                icon: 'icon-hongbao',
                name: '我的红包'
            }, {
                icon: 'icon-vip',
                name: '会员plus'
            }, {
                icon: 'icon-desadanshi',
                name: '邀请返利'
            }, {
                icon: 'icon-yijian',
                name: '意见反馈'
            }, {
                icon: 'icon-a069',
                name: '客服咨询'
            }, {
                icon: 'icon-anquan',
                name: '账户安全'
            }]
        }
    }
    showPower(item) {
        if ('link' in item) {
            this.props.history.push(item.link)
        } else {
            Toast.offline(`${item.name}功能还未解锁，请耐心等候~`, 1)
        }
    }
    loginout(){
        window.localStorage.removeItem('token')
        this.props.history.push({pathname:'/login'})
    }
    /**
     * 更新头像
     */
    updateAvatar(e){
        //表单数据对象 FormData 对象允许你配置一组键值对并通过 XMLHttpRequest 发送它们
        // multipart/form-data, 或者 text/plain之一的（忽略参数）.…或者以下客户端头部之一的也可以被认为是简单头部
        
        //第一步  先创建FormData()实例
        let form=new FormData()
        console.log(e.target.files[0].name,e.target.files[0])
        //第二步  运用实例的append 方法， 里面有两个参数  e.target.files[0].name e.target.files[0]
        form.append(e.target.files[0].name,e.target.files[0])
        console.log(form)
        //第三步  axios发送
        this.props.addres.getAvatar()
    }
    render() {
        const { myList } = this.state
        return <div className='tabPageContent'>
            <div id='minePage'>
                <div className='userMsgWrap'>
                    <input type="file" id="file" style={{display:"none"}} onChange={(e)=>{this.updateAvatar(e)}}/>
                    <label for="file">
                    <div className='userLogo'></div>
                    </label>
                    <div className='userMsgs'>
                        <div>15023807318</div>
                        <div>普通用户</div>
                    </div>
                </div>
            </div>
            <div className='userPower'>
                {
                    myList && myList.map((item, index) => {
                        return <div key={index} className='power' onClick={this.showPower.bind(this, item)} style={'link' in item ? { color: '#2196f3' } : {}}>
                            <i className={`iconfont ${item.icon}`} style={'link' in item ? { color: '#2196f3' } : {}}></i>
                            <div>{item.name}</div>
                        </div>
                    })
                }
                <div className='loginOut' onClick={()=>{
                    this.loginout()
                }}>退出登录</div>
            </div>
        </div>
    }
}

export default My;