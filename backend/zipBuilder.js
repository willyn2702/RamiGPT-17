
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

async function createZipFromText(content) {
  const dir = path.join(__dirname, '../public/zips');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, 'generated.txt');
  fs.writeFileSync(filePath, content);

  const output = fs.createWriteStream(path.join(dir, 'generated.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    archive.pipe(output);
    archive.file(filePath, { name: 'generated.txt' });
    archive.finalize();
    output.on('close', resolve);
    archive.on('error', reject);
  });
}

module.exports = { createZipFromText };
