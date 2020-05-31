/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2020-03-09 18:54:38
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-09 17:14:51
 */
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { getCookie, setCookie } from "../../helpers/cookies";
import store from '../../store';
import { Provider } from 'react-redux';

import HeaderCustom from './HeaderCustom';
import Index from '../index/index';
import noMatch from './404';

import '../../style/index.less';

const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: getCookie("mspa_SiderCollapsed") === "true",
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            setCookie("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (getCookie("mspa_SiderCollapsed") === null) {
            setCookie("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const { collapsed } = this.state;
        // const {location} = this.props;
        let name;
        // console.log(typeof getCookie(""));
        if (!getCookie("mspa_user") || getCookie("mspa_user") === "undefined") {
            // return <Redirect to="/login" />
        } else {
            name = JSON.parse(getCookie("mspa_user")).username;
        }

        return (
            <Layout className="ant-layout-has-sider">
                <Provider store={store}>
                    <Layout style={{ minHeight: "calc(100vh)" }}>
                        <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name} />
                        <Content style={{ width: 1080, margin: "0 auto" }}>
                            <Switch>
                                <Route exact path={'/app'} component={Index} />
                                <Route component={noMatch} />
                            </Switch>
                        </Content>

                        <Footer
                            style={{
                                textAlign: 'center',
                                backgroundColor: "#363636",
                                color: "white",
                            }}
                        >
                            <p style={{ marginBottom: "0px" }}>公司地址：上海市杨浦区军工路516号上海理工大学</p>
                            <p style={{ marginBottom: "0px" }}>联系电话：12345</p>
                            <p style={{ marginBottom: "0px" }}>邮箱：12345@qq.com</p>
                        </Footer>
                    </Layout>
                </Provider>
            </Layout>
        );
    }
}

export default withRouter(App);