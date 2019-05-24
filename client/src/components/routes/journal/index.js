import React, { Component } from 'react';
import { PageHeader, Typography } from 'antd';
import axios from 'axios';

import JournalEditContainer from './journalEditContainer';
import JournalEntriesContainer from './journalEntriesContainer';

const { Title } = Typography;

class Journal extends Component {
  constructor(props) {
    super(props);
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleView(entryId) {

  }

  handleEdit(entryId) {

  }

  handleDelete(entryIds) {

  }

  handleSave(title, content, entryId) {
    if (entryId) {
      axios.patch(`journal-entries/${entryId}`, {
        title,
        content
      }).then(res => {
        console.log('Axios: Journal Entry updated!');
        // Show notification
      }).catch(err => {
        console.log(err);
        // Show notification
      });
    } else {
      axios.post('/journal-entries', {
        title,
        content
      }).then(res => {
        console.log('Axios: New Journal Entry saved!');
        return res.data.entryId;
        // Show notification
      }).catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div>
        <PageHeader title="Journal" />
        <JournalEditContainer handleSave={this.handleSave} />
        <Title level={2}>My Journal Entries</Title>
        <JournalEntriesContainer
          handleView={this.handleView}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete} />
      </div>

    );
  }
}

export default Journal;
