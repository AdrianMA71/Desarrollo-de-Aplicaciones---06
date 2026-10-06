
import { transformSync } from "@babel/core";
import presetReact from "@babel/preset-react";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const tmp = path.resolve(".verificacion_tmp");
mkdirSync(path.join(tmp, "components"), { recursive: true });

const archivos = ["App.jsx", "components/Encabezado.jsx"];
for (const archivo of archivos) {
  const fuente = readFileSync(path.join("src", archivo), "utf8");
  const { code } = transformSync(fuente, {
    presets: [[presetReact, { runtime: "automatic" }]],
    filename: archivo,
    babelrc: false,
    configFile: false,
  });
  const listo = code.replace(/from "(\.\/[^"]+)"/g, 'from "$1.js"');
  writeFileSync(path.join(tmp, archivo.replace(".jsx", ".js")), listo);
}

const { default: App } = await import(pathToFileURL(path.join(tmp, "App.js")).href);
console.log(renderToStaticMarkup(createElement(App)));
rmSync(tmp, { recursive: true, force: true });
