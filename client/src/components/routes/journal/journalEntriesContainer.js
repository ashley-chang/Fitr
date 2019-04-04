import React, { Component } from 'react';
import { List } from 'antd';
import axios from 'axios';

/*
  TODO:
    0 On mount, load the user's journal entries
    - Add link/buttons to view/edit/delete journal entries
*/

class JournalEntriesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalEntries: []
    }
  }

  // deriveStateFromProps?
  componentDidMount() {
    axios.get('/journal-entries')
      .then((res) => {
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
          <List.Item>
            <List.Item.Meta
              title={item.title}
            />
      </List.Item>
    )}
  />
    );
  }
}

export default JournalEntriesContainer
