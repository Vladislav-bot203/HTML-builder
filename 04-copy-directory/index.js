const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'files'), (error, files) => {
    if (error) console.log(`error: ${error.message}`);
    fs.stat(path.join(__dirname, 'files-copy'), (er) => {
        if (!er) {
            fillWithNewFiles(files);
        } else if (er.code === 'ENOENT') {
            fs.mkdir(path.join(__dirname, 'files-copy'), (e) => {
                if (e) console.log(`error: ${e.message}`);
                fillWithNewFiles(files);
            });
        }
    });
});

function fillWithNewFiles(files) {
    files.forEach((file) => {
        const pathCopyFrom = path.join(__dirname, 'files', file);
        const pathCopyTo = path.join(__dirname, 'files-copy', file);
        fs.copyFile(pathCopyFrom, pathCopyTo, (err) => {
            if (err) console.log(`error: ${err.message}`);
        });
    });
}