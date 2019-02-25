import React, { Component } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'react-redux';

const InvoicesRepay = Form.create({ name: 'InvoicesRepay' })(
    class extends Component {

        render() {

            const {form} = this.props;
            const { getFieldDecorator } = form;

            return (
                <Card
                    bodyStyle={{padding:0}}
                    bordered={false}
                    actions={[<Button type="primary" shape="round" >提交</Button>, <Button shape="round" >保存</Button>]}
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
                    </Form>
                </Card>
            )
        }
    }
);

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispathToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispathToProps)(InvoicesRepay);