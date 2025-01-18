const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readline = require('readline');

let writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

writableStream.on('error', (error) => {
    console.log(`error: ${error.message}`)
});

stdout.write('Hello, my friend! text.txt was created.\n');

const rl = readline.createInterface(
    {
      prompt: 'Enter the sentence: ',
      output: process.stdout,
      input: process.stdin
    }
);

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
        case 'exit':
            rl.close();
            break;
        default: 
            let sentence = line + '\n';
            writableStream.write(sentence);
            rl.prompt();
            break;
    }
});

rl.on('close', () => {
    writableStream.end();
    writableStream.on('finish', () => {
    console.log(`\nAll your sentences were saved to ${path.join(__dirname, 'text.txt')}`);
    process.exit(0);
    })
});