const fs = require('fs/promises');
const path = require('path');

async function readJSON(fileName) {
    const filePath = path.join(__dirname, '..', 'datos', fileName);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function writeJSON(fileName, content) {
    const filePath = path.join(__dirname, '..', 'datos', fileName);
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');
}

module.exports = { readJSON, writeJSON };
