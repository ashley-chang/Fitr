import React, { Component } from 'react';
import { PageHeader } from 'antd';

import TextEditor from './textEditor';

class Journal extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <PageHeader title="Journal" />
        <TextEditor />
      </div>

    );
  }
}

export default Journal;
