const fs = require('fs');

let content = '';

const keys = Object.keys(process.env);

for (const key of keys) {
  if (!process.env[key]) {
    continue;
  }

  content += `\n  ${key}: "${String(process.env[key])}"`
}

console.log(content);

fs.appendFile(`${__dirname}/templates/configmap.yaml`, content, err => {
  if (err) {
    console.error(err)
    return
  }
});