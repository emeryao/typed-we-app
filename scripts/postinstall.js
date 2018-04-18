const fs = require('fs');

let baseDir = process.cwd();

let typesFolder = `${baseDir}/../@types`;

let targetPath = `${baseDir}/../@types/we-app`;

if (!fs.existsSync(typesFolder)) {
    fs.mkdirSync(typesFolder);
}

if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
}

console.log('Copying `we-app.d.ts` to "./node_modules/@types/we-app/index.d.ts" to make it work');
fs.copyFileSync(`${baseDir}/we-app.d.ts`, `${targetPath}/index.d.ts`);