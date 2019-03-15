import React, { Component } from 'react';
import { PageHeader } from 'antd';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <PageHeader
        title="Dashboard"
      />
    );
  }
}

export default Dashboard;
