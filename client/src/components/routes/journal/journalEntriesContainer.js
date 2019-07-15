import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Typography, List, Checkbox, Button } from 'antd';

import axios from 'axios';

const { Title } = Typography;

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
          this.setState({ journalEntries: res.data }); // expect an array
      })
      .catch(err => console.log('Could not fetch journal entries', err));
  }

  render() {
    return (
      <Fragment>
        <Title level={2}>My Journal Entries</Title>
        <List
          itemLayout="horizontal"
          dataSource={this.state.journalEntries}
          renderItem={item => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => this.props.handleView(item.entryId)} >View</Button>,
                <Button type="Default"><Link to={`/journal/edit/${item._id}`}>Edit</Link></Button>]}>
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default JournalEntriesContainer;
