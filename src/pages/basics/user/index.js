import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import Addusers from './components/addusers';
import * as actionCreators from './store/actionCretors';
import { InitializationList } from '../depa/store/actionCretors';

const columns = [{
    title: '名字',
    dataIndex: 'USERNAME',
}, {
    title: '手机号',
    dataIndex: 'telephone',
}, {
    title: '邮箱',
    dataIndex: 'mail',
}, {
    title: '所在部门',
    dataIndex: 'deptId',
}, {
    title: '状态',
    dataIndex: 'status',
}, {
    title: '备注',
    dataIndex: 'remark',
}];


class Basuser extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        visible: false
    };

    showModal = () => {
        this.props.addusersByDept();
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            this.setState({ visible: false });
            this.props.saveUsersData(values)
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    start = () => {
        this.setState({ loading: true });

        this.props.batchDeleteData(this.state.selectedRowKeys);

        this.setState({ loading: false });
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <div style={{ margin: 16 }}>
                    <Button type="primary"
                        onClick={this.showModal}>添加</Button>
                    <Button
                        type="danger"
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                        style={{ marginLeft: 5 }}
                    > 删除</Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `已选择 ${selectedRowKeys.length} 条信息` : ''}
                    </span>
                </div>
                <Addusers
                    wrappedComponentRef={this.saveFormRef}
                    deptdate={this.props.dept}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.list} />
            </div>
        );
    }

    componentDidMount() {
        this.props.getUserlists();
    }
}

const mapStateToProps = (state) => {
    const data = state.getIn(["users", "list"]);

    const list = [];
    data.map((item) => list.push({ key: item.get("id"), username: item.get("username"), telephone: item.get("telephone"), mail: item.get("mail"), dept: item.get("deptName"), status: item.get("status"), remark: item.get("remark") }));

    console.log(state.getIn(["dept", "tree"]))

    return {
        list: list,
        dept: state.getIn(["dept", "tree"]),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        getUserlists(data) {
            dispatch(actionCreators.getUserList(data));
        },
        saveUsersData(data) {
            dispatch(actionCreators.saveUsers(data));
        },
        batchDeleteData(data) {
            dispatch(actionCreators.batchDeleteByIds(data));
        },
        addusersByDept() {
            dispatch(InitializationList())
        }
    }
}


export default connect(mapStateToProps, mapDispathToProps)(Basuser);