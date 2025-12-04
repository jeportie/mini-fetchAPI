#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const TEMPLATE_DIR = path_1.default.resolve("src/templates");
function copyTemplate(src, dest) {
    const content = fs_1.default.readFileSync(src, "utf8");
    fs_1.default.writeFileSync(dest, content, "utf8");
}
async function main() {
    console.log("\n🚀 mini-fetch — Typed Fetch API Client Generator\n");
    const { mode } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "mode",
            message: "Choose generation mode:",
            choices: [
                { name: "Swagger (auto-generate types)", value: "swagger" },
                { name: "Manual (fill ApiRoutes yourself)", value: "manual" }
            ]
        }
    ]);
    if (mode === "swagger")
        return swaggerMode();
    return manualMode();
}
async function swaggerMode() {
    const { url, out } = await inquirer_1.default.prompt([
        { type: "input", name: "url", message: "Swagger JSON URL:" },
        { type: "input", name: "out", message: "Output folder:", default: "src/api" }
    ]);
    fs_1.default.mkdirSync(out, { recursive: true });
    console.log("📥 Fetching Swagger…");
    (0, child_process_1.execSync)(`npx openapi-typescript ${url} -o ${out}/swagger-types.ts`, {
        stdio: "inherit"
    });
    const tpl = path_1.default.join(TEMPLATE_DIR, "swagger");
    copyTemplate(path_1.default.join(tpl, "fetchApi.ts.txt"), `${out}/fetchApi.ts`);
    copyTemplate(path_1.default.join(tpl, "api-types.ts.txt"), `${out}/api-types.ts`);
    console.log("\n✨ Swagger API Client generated in:", out);
}
async function manualMode() {
    const { out } = await inquirer_1.default.prompt([
        { type: "input", name: "out", message: "Output folder:", default: "src/api" }
    ]);
    fs_1.default.mkdirSync(out, { recursive: true });
    const tpl = path_1.default.join(TEMPLATE_DIR, "manual");
    copyTemplate(path_1.default.join(tpl, "fetchApi.ts.txt"), `${out}/fetchApi.ts`);
    copyTemplate(path_1.default.join(tpl, "api-types.ts.txt"), `${out}/api-types.ts`);
    console.log("\n✨ Manual API Client generated in:", out);
}
main();
