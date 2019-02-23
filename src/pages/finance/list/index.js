import React,{Component} from 'react';
import { Empty } from 'antd';
import {connect} from 'react-redux';

class FinancemeList extends Component{
    render(){
        return(
            <Empty/>
        )
    }
}



export default connect(null,null)(FinancemeList);