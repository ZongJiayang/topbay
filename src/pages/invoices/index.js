import React,{Component} from 'react';
import { Card, Form, Col, Row,Menu, Dropdown, Icon, Button, } from 'antd';
import {connect} from 'react-redux'

import Reimbursement from './pages/reimbursement/index';
import Myinvoices from './pages/myinvoices';

import * as actionCreators from './store/actionCretors';
import {InitializationList} from '../basics/depa/store/actionCretors'


class Invoices extends Component{

    handleSunmit = ()=>{
        let userInfo = this.props.form.getFieldValue("username");
        console.log(userInfo)
    }

    componentDidMount(){
      this.props.getOrdinaryList(1);
      this.props.addusersByDept();
    }

    onClick = ({ key }) => {
        this.props.getInitTypeList(key)
    };
    
    menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="1">普通费用报销单</Menu.Item>
        <Menu.Item key="2">差旅费用报销单</Menu.Item>
        <Menu.Item key="3">借款单</Menu.Item>
        <Menu.Item key="4">还款单</Menu.Item>
      </Menu>
    );

    render(){
        return(
            <Row gutter={24} style={{margin:10}}>
            <Col span={6}>
                <Card 
                    title="我的单据" 
                    bordered={true}>
                    <Myinvoices
                      inittypes={this.props.typelist}
                      initdata={this.props.ordinarylist}/>
                </Card>
            </Col>
            <Col span={18}>
                <Card 
                    title="新建单据" 
                    bordered={true} 
                    extra={
                            <Dropdown overlay={this.menu}>
                              <span>
                                创建单据 <Icon type="down" />
                              </span>
                            </Dropdown>
                    }
                    actions={[<Button type="primary">提交</Button>,<Button>保存</Button>]}>
                        <Reimbursement
                          deptdata={this.props.dept}  
                        />
                </Card>
            </Col>
        </Row>
        )
    }
}

const FromLoginAntd = Form.create()(Invoices);


const mapStateToProps = (state)=>{
  return {
      typelist:state.getIn(["invoices","typelist"]),
      ordinarylist:state.getIn(["invoices","ordinarylist"]),
      dept: state.getIn(["dept","tree"]),
      types:""
  }
}

const mapDispathToProps = (dispatch)=>{
  return {
      getInitTypeList(data){
          dispatch(actionCreators.getTypeList(data));
      },
      getOrdinaryList(data){
        dispatch(actionCreators.getordinarycostList(data));
      },
      addusersByDept(){
        dispatch(InitializationList())
      }
  }
}

export default connect(mapStateToProps,mapDispathToProps)(FromLoginAntd);