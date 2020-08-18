import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
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
    <Row className="Editor">
      <Col>
        <form onSubmit={send}>
          <ButtonGroup aria-label="Control buttons">
            <Button id="run" variant="info" onClick={send}>Run</Button>
            <Button id="clear" variant="info" onClick={send}>Clear</Button>
          </ButtonGroup>
          <br/>
          <CodeMirror
            className='editor-pane'
            value={code}
            options={options}
            onChange={(editor, data, value) => {
              setCode(value);
            }}
          />
          <textarea readOnly rows="20" columns="80" value={output}/>
        </form>
      </Col>
    </Row>
  );
}

export default Editor;
