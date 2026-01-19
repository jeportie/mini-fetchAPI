// ************************************************************************** //
//                                                                            //
//                                                                            //
//   generate-fetch-overloads.ts                                              //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/15 22:54:58 by jeportie                                 //
//   Updated: 2026/01/17 14:16:47 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { Project, Node } from "ts-morph";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const methods: Record<HttpMethod, "get" | "post" | "put" | "delete"> = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

// ---------------- helpers ----------------

function extractJsDocText(decl: Node): string[] {
  if (!Node.isJSDocable(decl)) return [];

  const lines: string[] = [];

  for (const doc of decl.getJsDocs()) {
    const comment = doc.getComment();
    if (typeof comment === "string" && comment.trim() !== "") {
      lines.push(comment.trim());
    }

    for (const tag of doc.getTags()) {
      const tagComment = tag.getComment();
      const text =
        "@" + tag.getTagName() + (tagComment ? " " + tagComment : "");
      lines.push(text.trim());
    }
  }

  return lines;
}

function formatRoute(route: string, lines: string[]): string {
  if (lines.length === 0) {
    return [
      `@endpoint \`${route}\``,
      "",
    ].join("\n");
  }

  const [title, ...rest] = lines;

  return [
    `@endpoint \`${route}\``,
    title ? `  ${title}` : "",
    ...rest.map(l => `  ${l}`),
    "",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildMethodDoc(method: HttpMethod, routes: string[]): string {
  const routesBlock =
    routes.length > 0
      ? routes.join("\n\n") // ⬅️ blank line between routes
      : "N/A";

  return [
    `Perform a ${method} request.`,
    ``,
    `Available routes:`,
    ``,
    routesBlock,
  ].join("\n");
}

// ---------------- project ----------------

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

const apiSchema = project.getSourceFileOrThrow("apiSchema.ts");
const fetchApi = project.getSourceFileOrThrow("FetchApi.ts");

const paths = apiSchema.getInterfaceOrThrow("paths");

const collected: Record<HttpMethod, string[]> = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: [],
};

// ---------------- extract ----------------

for (const prop of paths.getProperties()) {
  const route = prop.getName().replace(/^"|"$/g, "");
  const routeType = prop.getType();

  for (const [METHOD, key] of Object.entries(methods) as [
    HttpMethod,
    (typeof methods)[HttpMethod]
  ][]) {
    const symbol = routeType.getProperty(key);
    if (!symbol) continue;

    const decl = symbol.getValueDeclaration();
    if (!decl) continue;

    if (decl.getType().getNonNullableType().isNever()) continue;

    const docs = extractJsDocText(decl);
    collected[METHOD].push(formatRoute(route, docs));
  }
}

// ---------------- inject ----------------

const clazz = fetchApi.getClassOrThrow("FetchApi");

for (const [METHOD, name] of Object.entries(methods) as [
  HttpMethod,
  (typeof methods)[HttpMethod]
][]) {
  const method = clazz.getMethod(name);
  if (!method) continue;

  // remove existing docs
  method.getJsDocs().forEach(d => d.remove());

  const lines = buildMethodDoc(METHOD, collected[METHOD]).split("\n");

  method.addJsDoc({
    description: lines.join("\n"),
  });
}

// ---------------- save ----------------

fetchApi.saveSync();
console.log("✅ FetchApi.ts updated");
