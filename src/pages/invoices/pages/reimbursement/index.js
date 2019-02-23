import React, { Component } from 'react';
import { Form, Input, Button, Table, TreeSelect } from 'antd';
import { connect } from 'react-redux';
import CollectionCreateForm from './CollectionCreateForm';

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
  key: 'action',
  render: (text, record) => (
    <span>
      <span>删除</span>
    </span>
  ),
}];

const data = [{
  key: '1',
  typeName: '打车',
  totalMoney: 32,
  totalMoneyCn: '三十二元整',
  remark: "备注说明",
}];

class Reimbursement extends Component {

  state = {
    visible: false,
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
      if (err) {
        return;
      }
      console.log(values)
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { deptdata } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
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
          {getFieldDecorator('dept', {
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
              onChange={this.onChange}
            >
              {this.renderTreeNodes(deptdata)}
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
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
          <Table columns={columns} dataSource={data} />
        </Form.Item>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Reimbursement);

export default connect(null, null)(WrappedRegistrationForm);