import React, { Component } from 'react';
import { Form, InputNumber, Input, Switch, TreeSelect, Modal } from 'antd';
const TreeNode = TreeSelect.TreeNode;



const Addusers = Form.create({ name: 'form_in_modal' })(
    
    class extends Component {
        // 树形列表
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

        render() {
            const { visible, onCancel, onCreate, form, deptdate } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal
                    visible={visible}
                    title="创建报销详情"
                    okText="创建"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="姓名">
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true, message: '请输入姓名!',
                                }],
                            })(
                                <Input placeholder="请输入姓名!" />
                            )}
                        </Form.Item>
                        <Form.Item label="手机号码">
                            {getFieldDecorator('telephone', {
                                rules: [{
                                    required: true, message: '请输入手机号!',
                                }],
                            })(
                                <InputNumber style={{ width: "100%" }} />
                            )}
                        </Form.Item>
                        <Form.Item label="邮箱">
                            {getFieldDecorator('mail', {
                                rules: [{
                                    required: true, message: '请输入邮箱!',
                                }],
                            })(
                                <Input placeholder="请输入邮箱!" />
                            )}
                        </Form.Item>
                        <Form.Item label="部门">
                            {getFieldDecorator('deptId', {
                                rules: [{
                                    required: true,
                                    message: '请选择部门!'
                                },
                                ],
                            })(
                                <TreeSelect
                                    showSearch
                                    style={{ width: "100%" }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={this.onChange}
                                >
                                    {this.renderTreeNodes(deptdate)}
                                </TreeSelect>
                            )}
                        </Form.Item>

                        <Form.Item label="是否启用">
                            {getFieldDecorator('status', {
                                valuePropName: 'checked'
                            })(
                                <Switch />
                            )}
                        </Form.Item>

                        <Form.Item label="备注">
                            {getFieldDecorator('remark')(
                                <Input.TextArea />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default Addusers;