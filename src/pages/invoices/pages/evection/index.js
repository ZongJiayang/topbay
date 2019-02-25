import React, { Component } from 'react';
import { Form, Input, InputNumber, Select, TreeSelect, Card, Button ,Table} from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCretors';
import { InitializationList } from '../../../basics/depa/store/actionCretors';
import { getTypeList } from '../../../aam/cost/sotre/actionCretors';
import EvectionCreateForm from './evectionCreateForm';

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const { Column, ColumnGroup } = Table;

const tablesItem = (data)=>
    data.map((item)=>{
        return(
            <Column
            title={item.get("name")}
            dataIndex={item.get("fieldName")}
            key={item.get("fieldName")}
        />
        )
    })
;

const InvoicesEvection = Form.create({ name: 'InvoicesEvection' })(
    class extends Component {

        state = {
            visible: false,
        };

        showModal = () => {
            this.setState({ visible: true });
        }

        handleCancel = () => {
            this.setState({ visible: false });
        }

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

        //加载数据
        componentDidMount(){
            this.props.getCostTypeList();
            this.props.getDeptTree();
        }

        render() {
            const {sublist,dept,types,form} = this.props;
            const { getFieldDecorator } = form;

            const dataList = [];
            for(let i=0;i<sublist.size;i++){
                const item = sublist.get(i);
                dataList.push({
                    key:i,
                    typeId:item.get("typeId"),
                    typeName:item.get("typeName"),
                    totalMoney:item.get("totalMoney"),
                    totalMoneyCn:item.get("totalMoneyCn"),
                    remark:item.get("remark"),
                    action:"",
                })
            }

            return (
                <Card
                    bodyStyle={{padding:0}}
                    bordered={false}
                    actions={[<Button type="primary" shape="round" >提交</Button>, <Button shape="round" >保存</Button>]}
                >
                    <Form onSubmit={this.handleSubmit}
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
                                >
                                    {this.renderTreeNodes(dept)}
                                </TreeSelect>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="项目名称">
                            {getFieldDecorator('items', {
                                rules: [{
                                    required: true, message: '请输入项目名称!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="出差任务">
                            {getFieldDecorator('task', {
                                rules: [{
                                    required: true, message: '请输入出差任务!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="开户银行">
                            {getFieldDecorator('openingBank', {
                                rules: [{
                                    required: true, message: '请输入开户银行!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="收款账号">
                            {getFieldDecorator('proposerAccount', {
                                rules: [{
                                    required: true, message: '请输入收款账号!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="明细">
                            <Button type="primary" shape="round" icon="edit"
                                style={{ marginBottom: 10 }}
                                onClick={this.showModal}>添加明细</Button>
                            <EvectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                bxtypes={types}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                            <Table dataSource={dataList}>
                                <ColumnGroup title="出发">
                                    <Column
                                        title="日期"
                                        dataIndex="startTime"
                                        key="startTime"
                                    />
                                    <Column
                                        title="地点"
                                        dataIndex="startAddress"
                                        key="startAddress"
                                    />
                                </ColumnGroup>
                                <ColumnGroup title="到达">
                                    <Column
                                        title="日期"
                                        dataIndex="endTime"
                                        key="endTime"
                                    />
                                    <Column
                                        title="地点"
                                        dataIndex="endAddress"
                                        key="endAddress"
                                    />
                                </ColumnGroup>
                                {tablesItem(types)}
                                <Column
                                    title="单据张数"
                                    dataIndex="subinvoiceTotal"
                                    key="subendAddress"
                                />
                                <Column
                                    title="金额小计"
                                    dataIndex="subtotalMoney"
                                    key="subtotalMoney"
                                />
                            </Table>
                        </Form.Item>

                        <Form.Item label="合计金额">
                            {getFieldDecorator('totalMoney', {
                                initialValue: "0",
                            })(
                                <InputNumber min={0} style={{ width: "100%" }} disabled={true} />
                            )}
                        </Form.Item>
                        <Form.Item label="合计金额大写">
                            {getFieldDecorator('totalMoneyCn')(
                                <Input placeholder="大写金额" disabled={true} />
                            )}
                        </Form.Item>
                        <Form.Item label="发票数量合计">
                            {getFieldDecorator('invoiceTotal', {
                                initialValue: "0"
                            })(
                                <InputNumber min={0} style={{ width: "100%" }} disabled={true} />
                            )}
                        </Form.Item>
                        
                        <Form.Item label="备注">
                            {getFieldDecorator('remark')(
                                <Input.TextArea rows={4} />
                            )}
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
        types: state.getIn(["costs","list"]),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        //添加子表信息
        addSubUsersByDept(data){
            dispatch(actionCreators.saveSubList(data));
        },
        //获取报销类型
        getCostTypeList() {
            dispatch(getTypeList(2));
        },
        //部门树
        getDeptTree() {
            dispatch(InitializationList());
        },
    }
}

export default connect(mapStateToProps, mapDispathToProps)(InvoicesEvection);