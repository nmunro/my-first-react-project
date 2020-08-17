import React, {useState} from 'react';
import axios from 'axios';
import './Editor.css';


const Editor = (props) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const updateCode = (event) => {
    setCode(event.target.value);
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
        <textarea onChange={updateCode} rows="25" columns="80" className="editor-window" value={code}/>
        <br/>
        <button>Run</button>
        <br/>
        <textarea readOnly rows="25" columns="80" className="editor-window" value={output}/>
      </form>
    </div>
  );
}

export default Editor;
