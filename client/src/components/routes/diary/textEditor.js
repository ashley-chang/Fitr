import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { value: initialValue  }
  }

  handleChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    return (
      <div>
        <Editor value={this.state.value}
                onChange={this.handleChange} />
      </div>

    );
  }
}

export default TextEditor;
