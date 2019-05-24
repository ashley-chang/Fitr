import React, { Component } from 'react';
import { List, Checkbox, Button } from 'antd';
import axios from 'axios';

/*
  TODO:
    0 On mount, load the user's journal entries
    - Add sortable option
    - Make into checklist. Selectable delete, available for bulk delete
    - Each entry has a view/edit button, singular only
*/

class JournalEntriesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalEntries: [],
      bulkEdit: false
    }
  }

  // deriveStateFromProps?
  // probably move this to index
  componentDidMount() {
    axios.get('/journal-entries')
      .then((res) => {
          console.log(res.data);
          const journalEntries = res.data; // expect an array
          this.setState({ journalEntries })
      })
      .catch(err => console.log('Could not fetch journal entries', err));
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.state.journalEntries}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => this.props.handleView(item.entryId)} >View</Button>,
              <Button type="Default"onClick={() => this.props.handleEdit(item.entryId)}>Edit</Button>]}>
            <List.Item.Meta title={item.title} />
          </List.Item>
        )}
      />
    );
  }
}

export default JournalEntriesContainer;
