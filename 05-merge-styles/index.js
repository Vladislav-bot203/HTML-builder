const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
    if (error) console.log(`error: ${error.message}`);

    const copyTo = path.join(__dirname, 'project-dist', 'bundle.css');

    fs.access(copyTo, (er) => {
        if (er) {
            const writableStream = fs.createWriteStream(copyTo);
            addToFile(files, writableStream);
        } else {
            fs.truncate(copyTo, (err) => {
                if (err) console.log(`error: ${err.message}`);
                const writableStream = fs.createWriteStream(copyTo);
                addToFile(files, writableStream);
            })
        }
    })
});


function addToFile(files, writableStream) {
    files.forEach((file) => {
        if (path.extname(file) === '.css') {
            const copyFrom = path.join(__dirname, 'styles', file);
            const readableStream = fs.createReadStream(copyFrom);
            readableStream.on('data', async (chunk) => {
            await writableStream.write(chunk);
            await writableStream.write('\n');
            });
        }
    });
}