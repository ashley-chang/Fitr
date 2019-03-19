import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Select, Icon, Button } from 'antd';

import TextToolbar from './textToolbar';

// Define the default node type (string)
const DEFAULT_NODE = 'paragraph';

// Define initial value
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
            ],
          },
        ],
      },
    ],
  },
})

class TextEditor extends Component {
  state = { value: initialValue }

  // On change, save the new value.
  onChange = ({ value }) => {
    this.setState({ value })
  }

  // On a keyboard formatting command, toggle a mark.
  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();
    event.preventDefault();

    // CTRL+(key) styling
    switch(event.key) {
      // Bolding text
      case 'b':
        editor.toggleMark('bold');
        break;
      // Italicizing text
      case 'i':
        editor.toggleMark('italic');
        break;
      // Underlining text
      case 'u':
        editor.toggleMark('underline');
        break;
      default: {
        return next();
      }
    }
  }

  // When a mark is clicked, toggle the mark on the selection.
  onClickMark = (e, type) => {
    e.preventDefault();
    this.editor.toggleMark(type);
  }

  // When a button is clicked, toggle the block type.
  onClickBlock = (e, type) => {
    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

  // Check if text selection has a mark with `type` in it
  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

  // Check if any of the selected blocks are of `type`
  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  }

  // Store a reference to the editor.
  ref = editor => {
    this.editor = editor;
  }

  // Render a mark toggling button for the toolbar.
  renderMarkButton = (type, icon) => {
      const isActive = this.hasMark(type);
      return (
        <Button
          onMouseDown={ e => this.onClickMark(e, type)}>
          <Icon type={icon} />
        </Button>
      )
  }

  renderBlockSelectOption = (type) => {
    let value = null;
    switch (type) {
      case 'heading-one':
        value = 'Heading 1';
        break;
      case 'heading-two':
        value = 'Heading 2';
        break;
      case 'paragraph':
        value = 'Paragraph';
        break;
      default:
        break;
    }

    return (
      <Select.Option value={type}>{value}</Select.Option>
    )
  }

  // Render a block toggling button for the toolbar.
  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);
    if ((type === 'numbered-list') || (type === 'bulleted-list')) {
      const { value: { document, blocks } } = this.state;
      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        onMouseDown={ e => this.onClickBlock(e, type) }>
        <Icon type={icon} />
      </Button>
    )

  }


  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;
    switch(props.mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underline':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  }

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;
    switch(node.type) {
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }

  render() {
    return (
      <Fragment>
        <TextToolbar>
          <Select defaultValue="Paragraph"
                  onChange={ value => this.onClickBlock(null, value)}
                  style={{width: 150}}>
            {this.renderBlockSelectOption('heading-one')}
            {this.renderBlockSelectOption('heading-two')}
            {this.renderBlockSelectOption('paragraph')}
          </Select>
          <Button.Group>
            {this.renderMarkButton('bold', 'bold')}
            {this.renderMarkButton('underline', 'underline')}
            {this.renderMarkButton('italic', 'italic')}
          </Button.Group>
          <Button.Group>
            {this.renderBlockButton('numbered-list', 'ordered-list')}
            {this.renderBlockButton('bulleted-list', 'bars')}
          </Button.Group>
        </TextToolbar>
        <Editor className="text-editor"
                autofocus={true}
                ref={this.ref}
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderNode={this.renderNode}
                renderMark={this.renderMark}/>
      </Fragment>

    );
  }
}

export default TextEditor;
