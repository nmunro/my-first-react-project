import React, {useState} from 'react';
import axios from 'axios';
import './Help.css';


const Programs = (props) => {
  const [programs, setPrograms] = useState([]);

  axios.get('/progs').then((res) => {
    setPrograms(res.data.map((obj, idx) => <li key={idx}><a href="/run">{idx+1}</a></li>));
  });

  return (
    <div className="Programs">
      <h1>Programs</h1>
      <ol>
        {programs}
      </ol>
    </div>
  );
}

export default Programs;
