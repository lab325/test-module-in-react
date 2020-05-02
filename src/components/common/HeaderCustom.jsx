import React, { Component } from 'react';
import { Layout, Icon, Menu, Input } from 'antd';
import history from './history';
import {removeCookie} from "../../helpers/cookies";
import logo from '../../statistics/logo.png'
import {Redirect, Link, withRouter} from 'react-router-dom'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const { Search } = Input;

function nowTime(){
    const date = new Date();
    const seperator1 = "-";
    const seperator2 = ":";
    const month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    const strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    const strHours = date.getHours()<10?'0' + date.getHours():date.getHours();
    const strSeconds = date.getSeconds()<10?'0' + date.getSeconds():date.getSeconds();
    const strMinutes = date.getMinutes()<10?'0' + date.getMinutes():date.getMinutes();
    const currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
        + " "  + strHours  + seperator2  + strMinutes + seperator2 + strSeconds;
    return currentdate
}

class HeaderCustom extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed,
            date: nowTime(),
            search_input: "",
            to_search_result_page: false,
        }
        this.logout = this.logout.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
        });
    };

    logout(){
        // 删除登陆信息，并跳转页面
        removeCookie("mspa_user");
        history.push('/login');
    }

    //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: nowTime()
        });
    }

    changeStateValueOfToSearchResultPage(){
        this.setState({
            to_search_result_page: true
        })
    }

    toSearchResultPage(){
        this.setState({
            to_search_result_page: false,
            search_input: "",
        })
        // console.log(this.props)
        let aim = null;
        if (this.props.location.pathname!=='/app/search_result'){
            // 根据上一路径判断是否需要跳转至搜索页面
            aim = <Redirect to='/app/search_result'/>;
        }
        return aim
    }

    render(){
        return(
            <Header style={{ background: '#fff', padding: 0, fontSize: "18px", color:"white", backgroundColor:"#363636"}} className="header">
                {this.state.to_search_result_page?this.toSearchResultPage():null}
                <Link to='/app'>
                    <img src={logo} style={{height:58, marginBottom:5.5, marginLeft:3}} alt={"众创空间网络课堂"}/>
                </Link>
                <p style={{display:"inline", marginLeft:"2vw"}}>众创空间网络课堂</p>
                <p
                    style={{ float:'right', display:'inline-block', marginRight:"2vw"}}
                    // id='element_remind'
                >
                    {this.state.date.toLocaleString()}
                </p>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '62px', float: 'right', backgroundColor:"#363636" }}
                >
                    <SubMenu title={
                            <span style={{fontSize:"18px", color: 'white'}}>
                            <Icon type="user" style={{fontSize:"18px", color: 'white' }}/>
                            {this.props.username}
                            </span>
                        }>
                        <Menu.Item key="logout" style={{textAlign:'center'}} className="logout">
                            <span onClick={this.logout}>logout</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                <div style={{display:"inline", float: 'right',}}>
                    <Search
                        placeholder="搜 索 成 员"
                        value={this.state.search_input}
                        onChange={e=>this.setState({search_input: e.target.value})}
                        onSearch={value => this.changeStateValueOfToSearchResultPage()}
                        style={{ width: 200 }}
                    />
                </div>
            </Header>
        )
    }
}

export default withRouter(HeaderCustom)