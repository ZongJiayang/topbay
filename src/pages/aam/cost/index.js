import React,{Component} from 'react';
import { Row,Col,Card,List, Avatar, Button, Select, Form, Input,Dropdown, Icon, Menu} from 'antd';
import {connect} from 'react-redux';
import * as actionCreators from './sotre/actionCretors';

const typess = (bol) =>{
    if(bol){
        return <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf'} }>费用</Avatar>
    }
    return <Avatar style={{ color: '#fff', backgroundColor: '#87d068'} }>行程</Avatar>;
}

class Aamcost extends Component{

    selectionsort = ({key})=>{
        this.props.getInitTypeList(key)
    }
    menu = (
        <Menu onClick={this.selectionsort}>
            <Menu.Item key="-1">全部类型</Menu.Item>
            <Menu.Item key="1">费用类型</Menu.Item>
            <Menu.Item key="2">出行类型</Menu.Item>
        </Menu>
    );

    componentDidMount(){
        this.props.getInitTypeList(-1);
    }

    handleSaveData = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.saveTypesData(values);
            this.props.form.resetFields();
          }
        });
    }

    delleteOnClick = (id)=>{
        this.props.deleteTypeData(id);
    }

    render(){
        const {Option} = Select;
        const { getFieldDecorator } = this.props.form;
        return (
            <Row gutter={24} style={{margin:10}}>
                <Col span={6}>
                    <Card 
                        size="small"
                        title="类型管理" 
                        bordered={true}
                        extra={
                            <Dropdown overlay={this.menu}>
                              <span>
                              全部分类 <Icon type="down" />
                              </span>
                            </Dropdown>
                        }
                        style={{ height: 880,padding:0 }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.list}
                            renderItem={item => (
                            <List.Item 
                                key={item.get("id")}
                                actions={[<Icon type="delete" theme="filled" onClick={this.delleteOnClick.bind(this,item.get("id"))} />]}>
                                <List.Item.Meta
                                avatar={typess(item.get("type")===1)}
                                title={item.get("name")}
                                />
                            </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={18}>
                    <Card 
                        title="新建类型" 
                        bordered={true}
                        extra={<Button type="primary" onClick={this.handleSaveData}>添加</Button>}
                        style={{ height: 880 }}>

                        <Form>
                            <Form.Item label="类型名称">
                                {getFieldDecorator("name",{
                                    initialValue: this.props.name,
                                    rules: [ {
                                        required: true, message: '请输入类型清楚',
                                    }]
                                })(
                                    <Input></Input>
                                )}
                            </Form.Item>
                            <Form.Item label="类型种类">
                                {getFieldDecorator("type",{
                                    initialValue: this.props.type,
                                    rules: [ {
                                        required: true, message: '请选择类型种类',
                                    }]
                                })(
                                    <Select>
                                        <Option value={1}>费用类型</Option>
                                        <Option value={2}>出行类型</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="备注规则">
                                {getFieldDecorator("ramark",{
                                    initialValue: this.props.ramark,
                                    rules: [ {
                                        required: true, message: '手动输入规则与备注',
                                    }]
                                })(
                                    <Input.TextArea rows={6}/>
                                )}
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const AamcostFrom = Form.create({ name: 'aamcost' })(Aamcost);

const mapStateToProps = (state)=>{
    const data = state.getIn(["costs","list"]);
    return {
        name:"",
        type:1,
        ramark:"",
        list:data
    }
}
  
const mapDispathToProps = (dispatch)=>{
    return {
        getInitTypeList(data){
            dispatch(actionCreators.getTypeList(data));
        },
        saveTypesData(data){
            dispatch(actionCreators.saveTypes(data));
        },
        deleteTypeData(data){
            dispatch(actionCreators.deleteType(data));
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps)(AamcostFrom);