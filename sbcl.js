const { exec } = require('child_process');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

process.on('message', (data) => {
    const fileName = `scripts/${uuidv4()}.lisp`;
    const wrapCode = (code) => [code, '(exit)'].join('');

    fs.writeFile(fileName, wrapCode(data), (err) => {
        if (err) {
            process.send('ERROR!');
        }

        const sbcl = exec(`sbcl --disable-debugger --load ${fileName}`, function (error, stdout, stderr) {
            if (error || stderr) {
                process.send(`ERROR: ${stderr}`);
            } else {
                process.send(stdout);
            }
        });

        sbcl.on('exit', (code) => {
            console.log(`Done: ${code}`);
            fs.unlink(fileName, (err) => {
                if (err) {
                    console.log('Failed to delete file!');
                } else {
                    console.log('File deleted!');
                }
            })
        });
    });
});
