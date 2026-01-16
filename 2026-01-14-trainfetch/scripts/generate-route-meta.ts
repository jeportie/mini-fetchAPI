// ************************************************************************** //
//                                                                            //
//                                                                            //
//   generate-route-meta.ts                                                   //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/15 22:54:58 by jeportie                                 //
//   Updated: 2026/01/15 22:55:10 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { Project, Node, JSDoc } from "ts-morph";
import fs from "fs";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const source = project.getSourceFileOrThrow("apiSchema.ts");
const pathsInterface = source.getInterfaceOrThrow("paths");

const methods = ["get", "post", "put", "delete"] as const;
const routeEntries: string[] = [];

for (const prop of pathsInterface.getProperties()) {
  const route = prop.getName();
  const routeType = prop.getType();

  for (const method of methods) {
    const symbol = routeType.getProperty(method);
    if (!symbol) continue;

    let jsDocText = "";

    for (const decl of symbol.getDeclarations()) {
      if (Node.isJSDocable(decl)) {
        const docs = decl.getJsDocs();
        jsDocText = docs
          .map((doc: JSDoc) => doc.getComment() ?? "")
          .join("\n");
        break;
      }
    }

    routeEntries.push(`
  ${route}: {
${jsDocText
        ? `    /**\n${jsDocText
          .split("\n")
          .map((line: string) => `     * ${line}`)
          .join("\n")}\n     */`
        : ""}
    method: "${method.toUpperCase()}",
  },`);
  }
}

const output = `// ⚠️ AUTO-GENERATED — DO NOT EDIT
export const routeMeta = {
${routeEntries.join("\n")}
} as const;
`;

fs.writeFileSync("routeMeta.ts", output);
console.log("✅ routeMeta.ts generated");

