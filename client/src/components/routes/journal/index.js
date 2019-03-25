import React, { Component } from 'react';
import { PageHeader } from 'antd';

import JournalEditContainer from './journalEditContainer';

class Journal extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <PageHeader title="Journal" />
        <JournalEditContainer />

      </div>

    );
  }
}

export default Journal;
