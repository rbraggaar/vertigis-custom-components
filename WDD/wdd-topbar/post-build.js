const fs = require("fs");
const path = require("path");
const pkg = require("./package.json");

const version = pkg.version;
const outDir = path.join(__dirname, "build");
const baseName = "main"; // Standard base name for the output file (VertiGIS)
const srcFile = path.join(outDir, `${baseName}.js`);
const destFile = path.join(outDir, `geofacta.gxw.topbar-${version}.js`);

if (fs.existsSync(srcFile)) {
    fs.renameSync(srcFile, destFile);
    console.log(`Renamed ${srcFile} to ${destFile}`);
} else {
    console.error(`Source file not found: ${srcFile}`);
}