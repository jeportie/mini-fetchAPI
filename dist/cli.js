#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
// Recréer __dirname en ESM :
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_DIR = path.resolve(__dirname, "templates");
function copyTemplate(src, dest) {
    const content = fs.readFileSync(src, "utf8");
    fs.writeFileSync(dest, content, "utf8");
}
async function main() {
    console.log("\n🚀 mini-fetch — Typed Fetch API Client Generator\n");
    const { mode } = await inquirer.prompt([
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
    const { url, out } = await inquirer.prompt([
        { type: "input", name: "url", message: "Swagger JSON URL:" },
        { type: "input", name: "out", message: "Output folder:", default: "src/api" }
    ]);
    fs.mkdirSync(out, { recursive: true });
    console.log("📥 Fetching Swagger…");
    execSync(`npx openapi-typescript ${url} -o ${out}/swagger-types.ts`, {
        stdio: "inherit"
    });
    const tpl = path.join(TEMPLATE_DIR, "swagger");
    copyTemplate(path.join(tpl, "fetchApi.ts.txt"), `${out}/fetchApi.ts`);
    copyTemplate(path.join(tpl, "api-types.ts.txt"), `${out}/api-types.ts`);
    console.log("\n✨ Swagger API Client generated in:", out);
}
async function manualMode() {
    const { out } = await inquirer.prompt([
        { type: "input", name: "out", message: "Output folder:", default: "src/api" }
    ]);
    fs.mkdirSync(out, { recursive: true });
    const tpl = path.join(TEMPLATE_DIR, "normal");
    copyTemplate(path.join(tpl, "fetchApi.ts.txt"), `${out}/fetchApi.ts`);
    copyTemplate(path.join(tpl, "api-types.ts.txt"), `${out}/api-types.ts`);
    console.log("\n✨ Manual API Client generated in:", out);
}
main();
