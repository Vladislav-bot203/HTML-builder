const fs = require('fs');
const path = require('path');
const { stdout } = process;

let readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

readableStream.on('error', (error) => {
  stdout.write(`error: ${error.message}`);
});

readableStream.on('data', (chunk) => {
  stdout.write(chunk);
})
