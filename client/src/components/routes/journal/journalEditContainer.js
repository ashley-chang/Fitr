import React, { Component } from 'react';
import ReactQuill, { Quill, Toolbar } from 'react-quill';
import { Button, Row, Col, Alert } from 'antd';

import axios from 'axios';

import 'react-quill/dist/quill.snow.css';

import InputField from './../../common/inputField';
/*
  TODO:
    - Add exit/save confirmation modal
    - Save to database
    - Edit existing entries
    - Parent container pass post id through props
    - Disable save button if no changes
    - Support file uploads
*/
class JournalEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      entryId: null // Retrieve from props just in case of create new + save
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    // If editing existing journal, retrieve data using info in this.props.entryId
    if (this.props.entryId) {
        this.setState({ entryId: this.props.entryId })
        axios.get(`journal/${this.props.entryId}`)
          .then((res) => {
            const entry = res.data;
            this.setState({
              title: entry.title,
              content: entry.content
            })
          }).catch((err) => {
            console.log(err);
          });
    } else {
      this.setState({ title: 'Untitled'})
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  formats = [
   'header',
   'bold', 'italic', 'underline', 'strike', 'blockquote',
   'list', 'bullet', 'indent',
   'link', 'image'
 ]

  // Change handler for title
  handleTitleChange(e) {
    console.log('title', e.target.value);
    this.setState({ title: e.target.value });
  }

  // Change handler for Quill editor -- returns value of text content, not event
  handleContentChange(value) {
    console.log(typeof this.state.content);
    this.setState({ content: value });
  }

  handleSave() {
    // If editing existing entry, save/update to the same id.
    // Otherwise, create new entry.
    if (this.state.entryId) {
      axios.patch(`/journal-entries/${this.state.entryId}`, {
        title: this.state.title,
        content: this.state.content
      }).then(res => {
        console.log('Axios: Journal entry updated!');
        // Do something with antd notification
      }).catch(err => {
        console.log(err);
        // Do something with antd notification
      });
    } else {
      axios.post('/journal-entries', {
        title: this.state.title,
        content: this.state.content
      }).then(res => {
        console.log('Axios: New journal entry saved!');
        this.setState({
          entryId: res.data.entryId
        });
        // Do something with antd notification
      }).catch(err => {
        console.log(err);
        // Do something with antd notification
      });
    }
  }

  render() {
    // TODO: If new entry, use Untitled, else retrieve title
    return(
      <div className="journal-edit">
        <Row type="flex" justify="start">
          <Col span={24}>
            <InputField onChange={ this.handleTitleChange }
                        size="large"
                        value={ this.state.title }
                        placeholder="Untitled" />
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span={24}>
            <ReactQuill onChange={ this.handleContentChange }
                        value={ this.state.content }
                        modules={ this.modules }
                        formats={ this.formats } >
            </ReactQuill>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span={24}>
            <Button type="primary" onClick={ this.handleSave }>Save</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default JournalEditContainer;
