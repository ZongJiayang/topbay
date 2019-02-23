import React,{Component} from 'react';
import { Row,Col,Card,Tree,Table } from 'antd';
import {connect} from 'react-redux';
import * as actionCretors from './store/actionCretors';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const columns = [{
    title: '名字',
    dataIndex: 'username',
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

class Basdepa extends Component{

    onSelect = (selectedKeys, info) => {
        this.props.getUserlists(selectedKeys);
    }

    onRightClick = (event, node)=>{
        console.log(event);
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.get("deptList")) {
          return (
            <TreeNode title={item.get("name")} key={item.get("id")}>
              {this.renderTreeNodes(item.get("deptList"))}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
    })

    componentDidMount(){
        this.props.initTreeList();
        this.props.getUserlists(null);
    }

    render(){

        const rowSelection = {
            onChange: this.onSelectChange,
        };

        return(
            <Row gutter={24} style={{margin:10}}>
                <Col span={6}>
                    <Card 
                        title="部门组织" 
                        bordered={false}>

                        <DirectoryTree
                            multiple={false}
                            defaultExpandAll
                            onRightClick={this.onRightClick}
                            onSelect={this.onSelect}>
                            {this.renderTreeNodes(this.props.tree)}
                        </DirectoryTree>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card 
                        title="成员信息" 
                        bordered={false} >
                        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.user} />
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state)=>{
    const userlist = [];
    if(state.getIn(["dept","user"]) != null){
        state.getIn(["dept","user"]).map((item)=>
            userlist.push({ key: item.get("id"),username: item.get("username"),telephone: item.get("telephone"),mail: item.get("mail"),dept: item.get("deptName"),status: item.get("status"),remark: item.get("remark")})
        );
    }

    return {
        tree: state.getIn(["dept","tree"]),
        user: userlist
    }
}
  
const mapDispathToProps = (dispatch)=>{
    return {
        getUserlists(data){
            dispatch(actionCretors.getUserByDeptList(data));
        },
        initTreeList(){
            dispatch(actionCretors.InitializationList());
        }
    }
  }

export default connect(mapStateToProps,mapDispathToProps)(Basdepa);