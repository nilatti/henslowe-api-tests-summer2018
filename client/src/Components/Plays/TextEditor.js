import React, { Component } from 'react';
import { EditorState, Editor, convertFromRaw, convertToRaw } from 'draft-js';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { };

    const content = window.localStorage.getItem('content');

    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
}

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  }

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TextEditor;
