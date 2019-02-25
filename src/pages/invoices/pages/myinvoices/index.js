import React,{Component} from 'react';
import { List,Avatar,Progress } from 'antd';
import {connect} from 'react-redux';

const awatartype = data =>{

    switch(data){
        case "chailubaoxiaodan":
            return <Avatar style={{ color: '#fff', backgroundColor: '#f56a00'} }>差旅</Avatar>
        case "feiyongbaoxiaodan":
            return <Avatar style={{ color: '#fff', backgroundColor: '#7265e6'} }>费用</Avatar>
        case "yuzhidan":
            return <Avatar style={{ color: '#fff', backgroundColor: '#ffbf00'} }>预支</Avatar>
        case "huankuandan":
            return <Avatar style={{ color: '#fff', backgroundColor: '#00a2ae'} }>还款</Avatar>
        default:
            return <Avatar style={{ color: '#fff', backgroundColor: '#87d068'} }>其他</Avatar>
    }
}

class Myinvoices extends Component{
    render(){
        const { initdata,costtype } = this.props;

        return(
            <List
                itemLayout="horizontal"
                dataSource={initdata}
                renderItem={item => (
                <List.Item 
                    key={item.get("id")}>
                    <List.Item.Meta
                    avatar={
                        awatartype(item.get("type"))
                    }
                    title={item.get("title")}
                    description={<Progress percent={100} size="small" />}
                    />
                </List.Item>
                )}
            />
        )
    }
}



export default connect(null,null)(Myinvoices);