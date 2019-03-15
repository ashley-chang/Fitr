import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu, MenuItemGroup } = Menu;

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    console.log("hi", this.props.location);
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        breakpoint={ 'sm' }
      >
        <div className="logo">Fitr.</div>
        <Menu selectedKeys={[this.props.location.pathname]}
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onClick={this.handleClick}
        >
          <Menu.Item key="1">
            <Link to="/dashboard">
              <Icon type="area-chart" />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/recipes">
              <Icon type="book" />
              <span>Recipe Book</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/diary">
              <Icon type="form" />
              <span>Diary</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>User</span></span>}
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}


export default withRouter(SideNav);
