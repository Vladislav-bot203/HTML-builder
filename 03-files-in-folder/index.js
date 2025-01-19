const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
    if (err) console.log(`error: ${err.message}`);
    console.log('Secret-folder files:');
    files.forEach((file) => {
        const fileName = path.parse(file);
        const fileExt = fileName.ext.replace('.', '');
        fs.stat(path.join(__dirname, 'secret-folder',`/${file}`), (error, stats) => {
            if (error) console.log(`error: ${error.message}`);
            if (stats.isFile()) console.log(`${fileName.name} - ${fileExt} - ${stats.size / 1000}kB`);
        });
    });
});