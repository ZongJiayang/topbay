import React, { Component } from 'react';
import { Layout,Avatar} from 'antd';
import { Logo } from './style';
import {connect} from 'react-redux';
import Menus from './components/menus'

const { Header, Content } = Layout;


class Admin extends Component {
  render() {
    return (
        <Layout className="layout">
          <Header>
            <Avatar style={{ float: "right",margin:12}} size="large" icon="user"  />
            <Logo/>
            <Menus/>
          </Header>
          <Content style={{ background: '#fff',padding: 0}}>
            {this.props.children}
          </Content>
          
      </Layout>
    );
  }
}

export default connect()(Admin);
