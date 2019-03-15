import React, { Component } from 'react';
import { PageHeader } from 'antd';

class Recipes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <PageHeader
        title="Recipes"
      />
    );
  }
}

export default Recipes;
