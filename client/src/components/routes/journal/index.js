import React, { Component, Fragment } from 'react';
import { PageHeader, Typography} from 'antd';
import { Route } from 'react-router-dom';
import axios from 'axios';

import JournalEditContainer from './journalEditContainer';
import JournalEntriesContainer from './journalEntriesContainer';

const { Title } = Typography;

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEntry: null
    }
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleView(entryId) {

  }

  handleEdit(entryId) {
    // console.log('Edit mode');
    // console.log(this.state);
    // console.log(entryId);
    // this.setState({
    //   currentMode : EDIT,
    //   activeEntry : entryId
    // });
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


// remember to set active entry back to null when on manage.
  render() {
    return (
      <div>
        <PageHeader title="Journal" />
        <Fragment>
          <Title level={2}>My Journal Entries</Title>
          <JournalEntriesContainer
            handleView={this.handleView}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete} />
        </Fragment>
        <Route path="/journal/edit/:id" component={JournalEditContainer} />
      </div>

    );
  }
}

export default Journal;
