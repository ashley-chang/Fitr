import React, { Component } from 'react';
import { PageHeader } from 'antd';

import TextEditor from './textEditor';

class Diary extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <PageHeader title="Diary" />
        <TextEditor placeholder="Dear Diary,"/>
      </div>

    );
  }
}

export default Diary;
