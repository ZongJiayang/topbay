import React,{Component} from 'react';
import { List,Avatar } from 'antd';
import {connect} from 'react-redux';



class Myinvoices extends Component{
    render(){
        const { initdata } = this.props;

        return(
            <List
                itemLayout="horizontal"
                dataSource={initdata}
                renderItem={item => (
                <List.Item 
                    key={item.get("id")}>
                    <List.Item.Meta
                    avatar={
                        <Avatar style={{ color: '#fff', backgroundColor: '#87d068'} }>报销</Avatar>
                    }
                    title={item.get("company")}
                    description={item.get("createTime")}
                    />
                </List.Item>
                )}
            />
        )
    }
}



export default connect(null,null)(Myinvoices);