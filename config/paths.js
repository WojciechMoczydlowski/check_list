const path = require("path");

const configRoot = __dirname;
const appRoot = path.resolve(configRoot, "..");
const src = path.join(appRoot, "src");
const tsConfig = path.join(appRoot, "tsconfig.json");
const nodeModules = path.join(appRoot, "node_modules");

module.exports = {
    appRoot,
    src,
    tsConfig,
    nodeModules,
    config: env => path.join(src, "configuration", `config.${env}.ts`),
};
