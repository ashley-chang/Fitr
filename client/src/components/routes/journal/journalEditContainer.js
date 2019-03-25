import React, { Component } from 'react';
import ReactQuill, { Quill, Toolbar } from 'react-quill';
import { Button, Row, Col, Alert } from 'antd';

import 'react-quill/dist/quill.snow.css';

import InputField from './../../common/inputField';

// TODO: Add exit/save confirmation modal

class JournalEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: localStorage.getItem('title') || '',
      content: localStorage.getItem('content') || ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    // If editing existing journal, retrieve data using info in props.entry
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
    this.setState({ content: value });
  }

  handleSave() {
    if (localStorage.getItem('title') !== this.state.title) {
      localStorage.setItem('title', this.state.title);
    }
    if (localStorage.getItem('content') !== this.state.content) {
      localStorage.setItem('content', this.state.content);
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
