import React, {useState} from 'react';
import axios from 'axios';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import './Editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/keymap/vim';
import 'codemirror/mode/commonlisp/commonlisp';


const Editor = (props) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const options = {
    mode: 'commonlisp',
    styleActiveLine: true,
    keyMap: 'vim',
    theme: 'material-darker',
    lineNumbers: true
  };

  const send = (event) => {
    event.preventDefault();
    axios.post('/run', {code: code}).then((res) => {
      setOutput(res.data);
    });
  };

  return (
    <div className="Editor">
      <form onSubmit={send}>
        <button>Run</button>
        <br/>
        <CodeMirror
          className='editor-pane'
          value='(format t "Hello World!~%")'
          options={options}
          onChange={(editor, data, value) => {
            setCode(value);
          }}
        />
        <br/>
        <hr/>
        <br/>
        <textarea className='boxsizingBorder' readOnly rows="25" columns="120" className="editor-window" value={output}/>
      </form>
    </div>
  );
}

export default Editor;
