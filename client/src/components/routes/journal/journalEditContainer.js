import React, { Component } from 'react';
import ReactQuill, { Quill, Toolbar } from 'react-quill';
import { Button, Row, Col, Alert } from 'antd';

import axios from 'axios';

import 'react-quill/dist/quill.snow.css';

import InputField from './../../common/inputField';
/*
  TODO:
    - Add exit/save confirmation modal
    0 Save to database
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
    if (this.props.match.params.id) {
        this.setState({ entryId: this.props.match.params.id });
        axios.get(`/journal-entries/${this.props.match.params.id}`)
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
    this.setState({ title: e.target.value });
  }

  // Change handler for Quill editor -- returns value of text content, not event
  handleContentChange(value) {
    this.setState({ content: value });
  }

  handleSave() {
    // Save entry. If handleSave returns a new entryID, store it in the current editor.
    let entryId = this.props.handleSave(this.state.title, this.state.content, this.state.entryId);
    if (entryId) {
      this.setState({ entryId });
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
            <Button type="primary" onClick={ ()=> this.handleSave(this.state.entryId) }>Save</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default JournalEditContainer;
