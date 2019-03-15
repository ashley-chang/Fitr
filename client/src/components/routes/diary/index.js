import React, { Component } from 'react';
import { PageHeader } from 'antd';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind.this;
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <div>
        <PageHeader title="Diary" />
        <ReactQuill value={this.state.text}
                    onChange={this.handleChange}/>
      </div>

    );
  }
}

export default Diary;
