const express = require('express');
const {fork} = require('child_process');
const mongoose = require('mongoose');
const CodeModel = require('./models/Code');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect('mongodb://localhost/lisp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/run', async(req, res) => {
    const output = fork('sbcl.js');
    const Code = mongoose.model('Code', CodeModel);
    const codeObject = new Code({code: req.body.code});
    codeObject.save();

    output.on('message', (m) => {
        // Remember if output is missing this number (361) may be wrong
        //res.status(200).send(m.slice(361));
        res.status(200).send(m);
    });

    output.send(req.body.code);
});

app.get('/progs', async(req, res) => {
    const Code = mongoose.model('Code', CodeModel);
    Code.find({}, (err, programs) => {
        if (err) {
            res.status(500).send('Error!');
        } else {
            res.status(200).send(JSON.stringify(programs));
        }
    });
});

console.log('App online');
app.listen(process.env.PORT || 5000);
