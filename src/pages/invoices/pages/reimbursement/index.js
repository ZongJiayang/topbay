import React, { Component } from 'react';
import { Form, Input, Button, Table, TreeSelect, Card } from 'antd';
import CollectionCreateForm from './CollectionCreateForm';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actionCretors';
import { InitializationList } from '../../../basics/depa/store/actionCretors';
import { getTypeList } from '../../../aam/cost/sotre/actionCretors';

const TreeNode = TreeSelect.TreeNode;

const columns = [{
    title: '报销类型',
    dataIndex: 'typeName',
    key: 'typeName'
}, {
    title: '报销金额',
    dataIndex: 'totalMoney',
    key: 'totalMoney',
}, {
    title: '大写金额',
    dataIndex: 'totalMoneyCn',
    key: 'totalMoneyCn',
}, {
    title: '备注说明',
    key: 'remark',
    dataIndex: 'remark'
}, {
    title: '管理',
    key: 'action'
}];

const WrappedRegistrationForm = Form.create({ name: 'Reimbursement' })(
    class extends Component {

        state = {
            visible: false,
            subList:[]
        };

        renderTreeNodes = data => data.map((item) => {
            if (item.get("deptList")) {
                return (
                    <TreeNode value={item.get("id")} title={item.get("name")} key={item.get("id")}>
                        {this.renderTreeNodes(item.get("deptList"))}
                    </TreeNode>
                );
            }
            return <TreeNode value={item.get("id")} title={item.get("name")} key={item.get("id")} />;
        })

        showModal = () => {
            this.setState({ visible: true });
        }

        handleCancel = () => {
            this.setState({ visible: false });
        }

        handleCreate = () => {
            const form = this.formRef.props.form;
            form.validateFields((err, values) => {
                if (err) { return }

                this.props.addSubUsersByDept({
                    typeId: values.type.key,
                    typeName: values.type.label,
                    invoiceTotal: values.invoiceTotal,
                    remark: values.remark === undefined ? "" : values.remark,
                    totalMoney: values.totalMoney,
                    totalMoneyCn: values.totalMoneyCn
                });

                form.resetFields();
                this.setState({ visible: false });
            });
        }

        saveFormRef = (formRef) => {
            this.formRef = formRef;
        }

        //加载数据
        componentDidMount() {
            this.props.getCostTypeList();
            this.props.getDeptTree();
        }

        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err ) {return}

                const subData = [];
                for(let i=0;i<this.props.sublist.size;i++){
                    const item = this.props.sublist.get(i);
                    subData.push({
                        type:1,
                        typeId:item.get("typeId"),
                        typeName:item.get("typeName"),
                        remark:item.get("remark"),
                        invoiceTotal:item.get("invoiceTotal"),
                        totalMoney:item.get("totalMoney"),
                        totalMoneyCn:item.get("totalMoneyCn"),
                    })
                }

                const data = {
                    type: this.props.match.params.id,
                    company: values.company,
                    depId:values.type.value,
                    depName:values.type.label,
                    subList: subData,
                }

                this.props.createReimbursement(data);

                this.props.form.resetFields();
            });
          }

        render() {
            const { sublist, dept, types, form } = this.props;
            const { getFieldDecorator } = form;

            const dataList = [];
            for (let i = 0; i < sublist.size; i++) {
                const item = sublist.get(i);
                dataList.push({
                    key: i,
                    typeId: item.get("typeId"),
                    typeName: item.get("typeName"),
                    totalMoney: item.get("totalMoney"),
                    totalMoneyCn: item.get("totalMoneyCn"),
                    remark: item.get("remark"),
                    action: "",
                })
            }

            return (
                <Card
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                    actions={[<Button type="primary" shape="round" onClick={this.handleSubmit} >提交</Button>, <Button shape="round" >保存</Button>]}
                >
                    <Form
                        layout="horizontal">
                        <Form.Item
                            label="公司">
                            {getFieldDecorator('company', {
                                initialValue: "上海韬沛企业管理有限公司",
                                rules: [{
                                    required: true, message: '请输入公司名称!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="部门">
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true, message: '请输入公司名称!',
                                }],
                            })(
                                <TreeSelect
                                    showSearch
                                    style={{ width: "100%" }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择部门"
                                    allowClear
                                    treeDefaultExpandAll
                                    labelInValue
                                >
                                    {this.renderTreeNodes(dept)}
                                </TreeSelect>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="明细">
                            <Button type="primary" shape="round" icon="edit"
                                style={{ marginBottom: 10 }}
                                onClick={this.showModal}>添加明细</Button>
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                bxtypes={types}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                            <Table columns={columns} dataSource={dataList} />
                        </Form.Item>
                    </Form>
                </Card>
            )
        }
    }
);

const mapStateToProps = (state) => {
    return {
        sublist: state.getIn(["invoices", "subList"]),
        dept: state.getIn(["dept", "tree"]),
        types: state.getIn(["costs", "list"]),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        //添加子表信息
        addSubUsersByDept(data) {
            dispatch(actionCreators.saveSubList(data));
        },
        //获取报销类型
        getCostTypeList() {
            dispatch(getTypeList(1));
        },
        //部门树
        getDeptTree() {
            dispatch(InitializationList());
        },
        createReimbursement(data){
            dispatch(actionCreators.saveReimbursement(data));
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(WrappedRegistrationForm);;