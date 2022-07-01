var fs = require('fs');
const path = require("path");

const root = path.join(__dirname + "/../");
const componentsFolder = root + "public/components/";

function onFileContent(filename, content) {
    if (!/\.(js|txt)$/.test(filename)) {
        return false;
    }
    fs.appendFile(path.resolve(`${componentsFolder}/all.js`),
        content + "\n", 'utf-8', function(err, data) {
            if (err) throw err;
        });
    // fs.writeFile(path.resolve(`${componentsFolder}/all.js`),
    //     content, 'utf-8', function(err, data) {
    //         if (err) throw err;
    //     });
}

function onError(error) {
    console.log(error);
}

function combineFiles(dirname, onFileContent, onError) {
    fs.writeFile(path.resolve(`${componentsFolder}/all.js`),
        "", 'utf-8', function(err, data) {
            if (err) throw err;
        });

    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}

// combineFiles(componentsFolder, onFileContent, onError);
module.exports = {
    onError,
    combineFiles,
    onFileContent,
    componentsFolder,
}
