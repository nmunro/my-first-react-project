const express = require('express');
const {fork} = require('child_process');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).json({alive: true});
});

app.get('/run-lisp', async(req, res) => {
    const output = fork('sbcl.js');

    output.on('message', (m) => {
        res.status(200).send(m.slice(383));
    });

    output.send('(format t "Hello world!~%")\n(exit)\n');
});

console.log('App online');
app.listen(process.env.PORT || 5000);
