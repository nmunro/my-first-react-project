import React, {useState} from 'react';
import axios from 'axios';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import './Editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/keymap/vim';
import 'codemirror/mode/commonlisp/commonlisp';


const Editor = (props) => {
  const [code, setCode] = useState('(format t "Hello world!~%")\n(force-output)');
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

    if (event.target.id === 'run') {
      axios.post('/run', {code: code}).then((res) => setOutput(res.data));
    } else if (event.target.id === 'clear') {
      setCode('');
    }
  };

  return (
    <div className="Editor">
      <form onSubmit={send}>
        <button id="run" onClick={send}>Run</button>
        <button id="clear" onClick={send}>Clear</button>
        <br/>
        <CodeMirror
          className='editor-pane'
          value={code}
          options={options}
          onChange={(editor, data, value) => {
            setCode(value);
          }}
        />
        <textarea className='boxsizingBorder' readOnly rows="25" columns="120" value={output}/>
      </form>
    </div>
  );
}

export default Editor;
