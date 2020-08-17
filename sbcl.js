const { exec } = require('child_process');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

process.on('message', (message) => {
    const fileName = `scripts/${uuidv4()}.lisp`;

    fs.writeFile(fileName, message, (err) => {
        if (err) {
            process.send('ERROR!');
        }

        const sbcl = exec(`sbcl --load ${fileName}`, function (error, stdout, stderr) {
            if (error || stderr) {
                process.send('ERROR!');
            } else {
                process.send(stdout);
            }
        });

        sbcl.on('exit', function (code) {
            console.log(`Done: ${code}`);
        });
    });
});
