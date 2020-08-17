const express = require('express');
const {fork} = require('child_process');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).json({alive: true});
});

app.post('/run', async(req, res) => {
    const output = fork('sbcl.js');

    output.on('message', (m) => {
        // Remember if output is missing this number (361) may be wrong
        //res.status(200).send(m.slice(361));
        res.status(200).send(m);
    });

    output.send(req.body.code);
});

console.log('App online');
app.listen(process.env.PORT || 5000);
