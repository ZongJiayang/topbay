import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Menu} from 'antd';
import { NavLink } from 'react-router-dom';
import * as actionCreators from './sotre/actionCretors';

class Menus extends Component{

  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

    render(){
        return (
            <Menu 
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
            >
              {this.props.list}
            </Menu>
        )
    }

    componentDidMount(){
        this.props.getMenusData();
    }
}

const mapStateToProps = (state)=>{
    const data = state.getIn(["menus","list"]);
    return {
      list:renderMenu(data)
    }
}

const renderMenu = (data)=>{
  return data.map((item)=>{
    if(item.get("children") !== undefined){
      return(
        <Menu.SubMenu title={item.get("title")} key={item.get("key")}>
          {renderMenu(item.get("children"))}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={item.get("key")}>
        <NavLink to={item.get("key")}>{item.get("title")}</NavLink>
      </Menu.Item>
    )
  });
}

const mapDispathToProps = (dispatch)=>{
    return {
        getMenusData(){
          dispatch(actionCreators.getMenusList());
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Menus);