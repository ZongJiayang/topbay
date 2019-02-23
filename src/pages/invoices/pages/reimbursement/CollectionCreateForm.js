import React, { Component } from 'react';
import { Form, InputNumber, Input, Select, Modal } from 'antd';
import convertCurrency from '../../../../static/utils/convertCurrency'
const Option = Select.Option;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends Component {

        handleSelectChange = (value) => {
            this.props.form.setFieldsValue({
                totalMoneyCn: convertCurrency(value),
            });
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
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
                        <Form.Item label="报销类型">
                            {getFieldDecorator('dept', {
                                rules: [{
                                    required: true, message: '请选择报销类型!',
                                }],
                            })(
                                <Select placeholder="请选择报销类型">
                                    <Option value="jack">打车费</Option>
                                    <Option value="lucy">晚餐补助</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="报销金额">
                            {getFieldDecorator('totalMoney', {
                                rules: [{
                                    required: true, message: '请输入报销金额!',
                                }],
                            })(
                                <InputNumber
                                    min={0} step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={this.handleSelectChange}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="大写金额">
                            {getFieldDecorator('totalMoneyCn')(
                                <Input placeholder="大写金额" disabled={true} />
                            )}
                        </Form.Item>
                        <Form.Item label="单据数量">
                            {getFieldDecorator('invoiceTotal', {
                                initialValue: "0",
                                rules: [{
                                    required: true, message: '请输入单据数量!',
                                }],
                            })(
                                <InputNumber min={0} style={{ width: "100%" }} />
                            )}
                        </Form.Item>
                        <Form.Item label="备注">
                            {getFieldDecorator('remark')(
                                <Input.TextArea rows={4} />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default CollectionCreateForm;