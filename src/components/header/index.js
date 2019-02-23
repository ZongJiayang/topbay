import React,{Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component{
    render(){
        return(
            <div>aaa</div>
        )
    }
}

//store 映射到 props
const mapStateToProps = (state)=>{
    return {

    }
}

const mapDispathToProps = (dispatch)=>{
    return {

    }
}

export default connect(mapStateToProps,mapDispathToProps)(Header);