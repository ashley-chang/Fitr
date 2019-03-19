import React from 'react';
import { Layout, Menu, } from 'antd';
import { Route, Switch } from 'react-router-dom';

import SideNav from './sidenav';

import Dashboard from './routes/dashboard/index';
import Recipes from './routes/recipes/index';
import Journal from './routes/journal/index';

const { Content, Footer, } = Layout;
const SubMenu = Menu.SubMenu;

class UserContent extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideNav />
        <Layout className="content">
          <Content style={{ margin: '16px' }}>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/recipes" component={Recipes} />
              <Route path="/journal" component={Journal} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Fitr ©2018 Created by Ashley Chang
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default UserContent;
