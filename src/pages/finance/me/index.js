import React,{Component} from 'react';
import { Empty } from 'antd';
import {connect} from 'react-redux';

class Financeme extends Component{
    render(){
        return(
            <Empty/>
        )
    }
}



export default connect(null,null)(Financeme);