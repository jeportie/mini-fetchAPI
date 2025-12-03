#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const NORMAL_TEMPLATE_DIR = path.resolve("src/normal");
const SWAGGER_TEMPLATE_DIR = path.resolve("src/swagger");

async function main() {
    console.log("\n🚀 mini-fetch — Typed Fetch API Client Generator\n");

    const { mode } = await inquirer.prompt([
        {
            type: "list",
            name: "mode",
            message: "Choose generation mode:",
            choices: [
                { name: "Swagger (auto-generate types from /docs/json)", value: "swagger" },
                { name: "Manual (empty ApiRoutes interface to fill manually)", value: "manual" }
            ]
        }
    ]);

    if (mode === "swagger") {
        generateSwaggerMode();
    } else {
        generateManualMode();
    }
}

function generateSwaggerMode() {
    console.log("\n📡 Swagger mode selected");

    inquirer.prompt([
        {
            type: "input",
            name: "url",
            message: "Swagger URL (ex: http://localhost:5000/docs/json):"
        },
        {
            type: "input",
            name: "out",
            message: "Output folder (ex: src/api):",
            default: "src/api"
        }
    ]).then(({ url, out }) => {
        console.log("📥 Fetching Swagger…");

        // 1. Create output folder
        fs.mkdirSync(out, { recursive: true });

        // 2. Run openapi-typescript
        execSync(`npx openapi-typescript ${url} -o ${out}/swagger-types.ts`, {
            stdio: "inherit"
        });

        // 3. Copy template fetchApi.ts + api-types.ts
        fs.copyFileSync(`${SWAGGER_TEMPLATE_DIR}/fetchApi.ts`, `${out}/fetchApi.ts`);
        fs.copyFileSync(`${SWAGGER_TEMPLATE_DIR}/api-types.ts`, `${out}/api-types.ts`);

        console.log("\n✨ DONE! Swagger API Client generated in:");
        console.log(`   → ${out}/`);
        console.log("   You can now import it like:");
        console.log("   import Api from './api/fetchApi';\n");
    });
}

function generateManualMode() {
    console.log("\n📝 Manual mode selected");

    inquirer.prompt([
        {
            type: "input",
            name: "out",
            message: "Output folder (ex: src/api):",
            default: "src/api"
        }
    ]).then(({ out }) => {

        fs.mkdirSync(out, { recursive: true });

        fs.copyFileSync(`${NORMAL_TEMPLATE_DIR}/fetchApi.ts`, `${out}/fetchApi.ts`);
        fs.copyFileSync(`${NORMAL_TEMPLATE_DIR}/api-types.ts`, `${out}/api-types.ts`);

        console.log("\n✨ Manual API Client generated in:");
        console.log(`   → ${out}/`);
        console.log("   Fill ApiRoutes manually to activate autocomplete.\n");
    });
}

main();
