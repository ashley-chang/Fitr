import React, { Component } from 'react';
import ReactQuill, { Quill, Toolbar } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: localStorage.getItem('text') || '' };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(value) {
    if (value !== this.state.text) {
      localStorage.setItem('text', value);
    }
    this.setState({ text: value });
  }

  render() {
    return(
      <ReactQuill value={this.state.text}
                  modules={this.modules}
                  formats={this.formats}
                  onChange={this.handleChange}>
      </ReactQuill>
    )
  }
}

export default TextEditor;
