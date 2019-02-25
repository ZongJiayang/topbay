import React, { Component } from 'react';
import { Card, Col, Row, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Myinvoices from './pages/myinvoices';
import * as actionCreators from './store/actionCretors';

const menu = (data)=>
    <Menu>    
        {data.map((item)=>{
            return (
                <Menu.Item key={item.get("id")}>
                    <NavLink to={item.get("path")+"/"+item.get("id")}>{item.get("name")}</NavLink>
                </Menu.Item>
            )
        }) }
    </Menu>
;

class Invoices extends Component {

    componentDidMount() {
        this.props.getOrdinaryList("847bef6cf7394107bb59b15fb39ef56c");
        this.props.getDocumentTemplate();
    }

    render() {
        return (
            <Row gutter={24} style={{ margin: 10 }}>
                <Col span={6}>
                    <Card
                        title="我的单据"
                        bordered={true}>
                        <Myinvoices
                            costtype={this.props.costtype}
                            initdata={this.props.ordinarylist} />
                    </Card>
                </Col>
                <Col span={18}>
                    <Card
                        title="新建单据"
                        bordered={true}
                        extra={
                            <Dropdown overlay={menu(this.props.costtype)}>
                                <span>
                                    创建单据 <Icon type="down" />
                                </span>
                            </Dropdown>
                        }>
                        {this.props.children}
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ordinarylist: state.getIn(["invoices", "ordinarylist"]),
        costtype: state.getIn(["invoices","costtype"]),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        //得到单据列表
        getOrdinaryList(data) {
            dispatch(actionCreators.getordinarycostList(data));
        },
        getDocumentTemplate(){
            dispatch(actionCreators.getDocumenttemplate());
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Invoices);