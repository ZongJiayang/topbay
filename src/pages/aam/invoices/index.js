import React,{Component} from 'react';
import { Row,Col,Card} from 'antd';
import {connect} from 'react-redux';

class Aaminvoices extends Component{
    render(){
        return(
            <Row gutter={24} style={{margin:10}}>
                <Col span={6}>
                    <Card 
                        title="我的单据" 
                        bordered={true}
                        style={{ height: 800 }}>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card 
                        title="新建单据" 
                        bordered={true} 
                        style={{ height: 800 }}>
                            
                    </Card>
                </Col>
            </Row>
        )
    }
}



export default connect(null,null)(Aaminvoices);