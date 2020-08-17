const express = require('express');
const {fork} = require('child_process');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).json({alive: true});
});

app.post('/run', async(req, res) => {
    const code = req.body.code.endsWith('(exit)') ? req.body.code : `${req.body.code}\n(exit)`;
    const output = fork('sbcl.js');

    console.log(`Code: ${code}`);

    output.on('message', (m) => {
        res.status(200).send(m.slice(361)); // Remember if output is missing this number may be wrong
    });

    output.send(code);
});

console.log('App online');
app.listen(process.env.PORT || 5000);
