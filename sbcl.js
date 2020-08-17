const { exec } = require('child_process');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

process.on('message', (message) => {
    const fileName = `scripts/${uuidv4()}.lisp`;
    fs.writeFile(fileName, message, (err) => {
        const sbcl = exec(`sbcl --load ${fileName}`, function (error, stdout, stderr) {
            if (error) {
                process.send(`Child Process STDERR: ${stderr}`);
            } else {
                process.send(`Child Process STDOUT: ${stdout}`);
            }
        });

        sbcl.on('exit', function (code) {
            console.log('Child process exited with exit code '+code);
        });
    });
});
