const fs = require('fs');
const path = require('path');

const currentDir = process.cwd();

function readFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file ${filename}: ${err.message}');
        } else {
            console.log('Contents of ${filename}:');
            console.log(data);
        }
    });
}

function writeFile(filename, data) {
    fs.writeFile(filename, data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file ${filename}: ${err.message}');
        } else {
            console.log('Successfully wrote to ${filename}');
        }
    });
}

function deleteFile(filename) {
    fs.unlink(filename, (err) => {
        if (err) {
            console.error('Error deleting file ${filename}: ${err.message}');
        } else {
            console.log('Successfully deleted ${filename}');
        }
    });
}

function listFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory ${directory}: ${err.message}');
        } else {
            console.log('Files in directory ${directory}:');
            files.forEach(file => {
                console.log(file);
            });
        }
    });
}

const command = process.argv[2];
const argument1 = process.argv[3];
const argument2 = process.argv[4];

switch(command) {
    case 'read':
        if (argument1) {
            readFile(argument1);
        } else {
            console.error('Please provide a filename to read');
        }
        break;
        case 'write':
            if (argument1 && argument2) {
                writeFile(argument1, argument2);
            } else {
                console.error('Please provide a filename and data to write');
            }
            break;
        case 'delete':
            if (argument1) {
                deleteFile(argument1);
            } else {
                console.error('Please provide a filename to delete');
            }
            break;
        case 'list':
            listFiles(currentDir);
            break;
            default:
                console.log('Usage:');
                console.log('node fileManager.js read <filename>');
                console.log('node fileManager.js write <filename> <data>');
                console.log('node fileManager.js delete <filename>');
                console.log('node fileManager.js list');
        }
