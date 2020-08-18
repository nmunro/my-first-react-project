import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {UnControlled as CodeMirror} from 'react-codemirror2';

import './Programs.css';
import './Editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/keymap/vim';
import 'codemirror/mode/commonlisp/commonlisp';


const Programs = (props) => {
  const [programs, setPrograms] = useState([]);
  const options = {
    mode: 'commonlisp',
    styleActiveLine: true,
    keyMap: 'vim',
    theme: 'material-darker',
    lineNumbers: true,
    readOnly: true
  };


  const buildCard = (data, idx) => {
    return (
      <Card key={idx} className="code-card">
        <Card.Body>
          <Card.Title>ID: {data._id}</Card.Title>
          <Card.Text>
          <CodeMirror
            className='editor-pane'
            value={data.code}
            options={options}
          />
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  axios.get('/progs').then((res) => {
    setPrograms(res.data.map((obj, idx) => buildCard(obj, idx)));
  });

  return (
    <div className="Programs">
      <h1>Programs</h1>
      {programs}
    </div>
  );
}

export default Programs;
