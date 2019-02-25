import React, { Component } from 'react';
import { Form, Input, Card, Button, TreeSelect, InputNumber,Select } from 'antd';
import { connect } from 'react-redux';
import { InitializationList } from '../../../basics/depa/store/actionCretors';
import convertCurrency from '../../../../static/utils/convertCurrency'
import { getTypeList } from '../../../aam/cost/sotre/actionCretors';
import * as actionCreators from '../../store/actionCretors';
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;

const renderTreeNodes = data => data.map((item) => {
    if (item.get("deptList")) {
        return (
            <TreeNode value={item.get("id")} title={item.get("name")} key={item.get("id")}>
                {renderTreeNodes(item.get("deptList"))}
            </TreeNode>
        );
    }
    return <TreeNode value={item.get("id")} title={item.get("name")} key={item.get("id")} />;
})

const propertyview = data => 
    <Select 
        labelInValue
        placeholder="请选择资金性质" 
        style={{ width: "100%" }}>
            {data.map((item)=>
                <Option value={item.get("id")} key={item.get("id")}>{item.get("name")}</Option>
            )}
    </Select>
;


const InvoicesBorrow = Form.create({ name: 'InvoicesBorrow' })(
    class extends Component {

        handleSelectChange = (value) => {
            this.props.form.setFieldsValue({
                borrowMoneyCn: convertCurrency(value),
            });
        }

        //加载数据
        componentDidMount(){
            this.props.getDeptTree();
            this.props.getCostTypeList();
        }

        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) {return}
                console.info(values)

                this.props.addSubBorrow({
                    type: this.props.match.params.id,
                    typeId: values.property.key,
                    typeName: values.property.label,
                    company: values.company,
                    cause: values.cause,
                    borrowMoney: values.borrowMoney,
                    borrowMoneyCn: values.borrowMoneyCn,
                    bank: values.bank,
                    bankCode: values.bankCode,
                    remark: values.remark === undefined?"":values.remark,
                });

                this.props.form.resetFields();
            });
          }

        render() {

            const {form,dept,types} = this.props;
            const { getFieldDecorator } = form;

            return (
                <Card
                    bodyStyle={{padding:0}}
                    bordered={false}
                    actions={[<Button type="primary" shape="round" onClick={this.handleSubmit} >提交</Button>, <Button shape="round" >保存</Button>]}
                >
                    <Form 
                        layout="horizontal">

                        <Form.Item
                            label="资金性质">
                            {getFieldDecorator('property', {
                                rules: [{
                                    required: true, message: '请选择资金性质!',
                                }],
                            })(
                                propertyview(types)
                            )}
                        </Form.Item>

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
                            {getFieldDecorator('dept', {
                                rules: [{
                                    required: true, message: '请选择部门!',
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
                                    {renderTreeNodes(dept)}
                                </TreeSelect>
                            )}
                        </Form.Item>


                        <Form.Item
                            label="借款事由">
                            {getFieldDecorator('cause', {
                                rules: [{
                                    required: true, message: '请输入借款事由!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="借款金额">
                            {getFieldDecorator('borrowMoney', {
                                rules: [{
                                    required: true, message: '请输入借款金额!',
                                }],
                            })(
                                <InputNumber
                                    min={0} step={0.01}
                                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                    onChange={this.handleSelectChange}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="金额大写">
                            {getFieldDecorator('borrowMoneyCn')(
                                <Input placeholder="大写金额" disabled={true} />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="开户银行">
                            {getFieldDecorator('bank', {
                                rules: [{
                                    required: true, message: '请输入开户银行!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="收款账号">
                            {getFieldDecorator('bankCode', {
                                rules: [{
                                    required: true, message: '请输入收款账号!',
                                }],
                            })(
                                <Input />
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
        dept:state.getIn(["dept", "tree"]),
        types: state.getIn(["costs","list"]),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        //部门树
        getDeptTree() {
            dispatch(InitializationList());
        },
        //获取报销类型
        getCostTypeList() {
            dispatch(getTypeList(-1));
        },
        //添加预支单
        addSubBorrow(data){
            dispatch(actionCreators.saveBorrows(data));
        },
    }
}

export default connect(mapStateToProps, mapDispathToProps)(InvoicesBorrow);