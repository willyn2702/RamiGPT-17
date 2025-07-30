const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

async function createZipFromText(content) {
  try {
    const dir = path.join(__dirname, '../public/zips');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log("📁 Carpeta 'zips' creada");
    }

    const filePath = path.join(dir, 'generated.txt');
    fs.writeFileSync(filePath, content);
    console.log("📝 Archivo .txt generado correctamente");

    const zipPath = path.join(dir, 'generated.zip');

    // Eliminar zip anterior si existe
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
      console.log("🗑️ ZIP anterior eliminado");
    }

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        console.log(`✅ ZIP generado (${archive.pointer()} bytes)`);
        resolve();
      });

      archive.on('error', (err) => {
        console.error("❌ Error al generar el ZIP:", err.message || err);
        reject(err);
      });

      archive.pipe(output);
      archive.file(filePath, { name: 'generated.txt' });
      archive.finalize();
    });

  } catch (err) {
    console.error("❌ Error general en zipBuilder:", err.message || err);
    throw new Error("Fallo al generar el archivo ZIP.");
  }
}

module.exports = { createZipFromText };
