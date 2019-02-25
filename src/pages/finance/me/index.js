import React, { Component } from 'react';
import { Statistic, Card, Row, Col, Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux';
import { getMyAccount,getChangeList } from '../store/actionCretors'

const columns = [{
    title: '名字',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '金额',
    dataIndex: 'money',
    key: 'money',
}, {
    title: '资金类型',
    dataIndex: 'typeName',
    key: 'typeName',
}, {
    title: '出/入帐',
    dataIndex: 'type',
    key: 'type',
    render: type => {
        if (type == 1) {
            return <Tag color="volcano" key={type}>入账</Tag>;
        }
        return <Tag color="green" key={type}>出账</Tag>;
    }
}, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
}, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
}];

const data = [{
    key: '1',
    name: 'John Brown',
    money: 32,
    typeName:"费用",
    type: 1,
    createTime: "2018",
  },
  {
    key: '2',
    name: 'John Brown',
    money: 32,
    typeName:"费用",
    type: 2,
    createTime: "2018",
  }]

class Financeme extends Component {

    componentDidMount() {
        this.props.initAccount("5be4ed051da3433a9cd39b5f542dd8af");
        this.props.initChangeList("5be4ed051da3433a9cd39b5f542dd8af");
    }

    render() {

        const { account,changelist } = this.props;
        const datalist = [];
        changelist.map((item)=>{
            datalist.push({
                key: item.get("id"),
                name: item.get("name"),
                money: item.get("money"),
                typeName: item.get("typeName"),
                type: item.get("type"),
                createTime: item.get("createTime"),
                action: ""
            });
        })

        return (
            <div>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card>
                                <Statistic
                                    title="总金额:"
                                    value={account.get("aggregateAmount")}
                                    precision={2}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                                <Statistic
                                    title="未报销金额:"
                                    value={account.get("havenotReimbursement")}
                                    precision={2}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 15 }}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="预支金额:"
                                    value={account.get("advance")}
                                    precision={2}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="还款金额:"
                                    value={account.get("repayment")}
                                    precision={2}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="已报销金额:"
                                    value={account.get("alreadyReimbursement")}
                                    precision={2}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="工资代还金额:"
                                    value={account.get("salary")}
                                    precision={2}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Table columns={columns} dataSource={datalist} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        account: state.getIn(["account", "account"]),
        changelist: state.getIn(["account", "changelist"]),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        initAccount(data) {
            dispatch(getMyAccount(data));
        },
        initChangeList(data){
            dispatch(getChangeList(data));
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Financeme);