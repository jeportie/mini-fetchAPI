// ************************************************************************** //
//                                                                            //
//                                                                            //
//   types.ts                                                                 //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/14 13:25:29 by jeportie                                 //
//   Updated: 2026/01/15 20:16:09 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { routeMeta } from "./routeMeta";
export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

interface MethodsMap {
  GET: "get";
  POST: "post";
  PUT: "put";
  DELETE: "delete";
}

export type ApiEndpoints<Schema> = keyof Schema;
export type EndpointKey<S> = Extract<keyof S, string>;

export type FilterRoutes<
  Schema,
  M extends HttpMethods
> = {
  [E in EndpointKey<Schema>]: Schema[E] extends Record<MethodsMap[M], any> ? E : never;
}[EndpointKey<Schema>];

export type RouteWithMethod<
  Schema,
  M extends HttpMethods
> = {
  [E in EndpointKey<Schema>]:
  E extends keyof typeof routeMeta
  ? typeof routeMeta[E]["method"] extends M
  ? E
  : never
  : never
}[EndpointKey<Schema>];

type ApiOperation<
  Schema,
  E extends keyof Schema,
  M extends HttpMethods
> = Schema[E] extends Record<MethodsMap[M], infer O> ? O : never;

type ResponsesOf<O, S extends number> =
  O extends { responses: infer R } ? (S extends keyof R ? R[S] : never) : never;

type RequestBodyOf<O> = O extends { requestBody: infer RB } ? RB : undefined;
type ParametersOf<O> = O extends { parameters: infer P } ? P : undefined;
type ContentOf<O> = O extends { content: infer C } ? C : undefined;
type JsonContent<O> = O extends { "application/json": infer J } ? J : never;

export type ApiBody<
  Schema,
  E extends keyof Schema,
  M extends HttpMethods
> = JsonContent<ContentOf<RequestBodyOf<ApiOperation<Schema, E, M>>>>;

export type ApiReturn<
  Schema,
  E extends keyof Schema,
  M extends HttpMethods,
  S extends number = 200
> = JsonContent<ContentOf<ResponsesOf<ApiOperation<Schema, E, M>, S>>>;

export type ApiParams<
  Schema,
  E extends keyof Schema,
  M extends HttpMethods
> = ParametersOf<ApiOperation<Schema, E, M>>;

// import { paths } from "../apiSchema";
// type OpenApiSchema = paths;

// export type TypeLog<T> = T extends any ? T : never;
// logs for debbuging (hover on Checks to see the type result)
// type CheckEndpoints = TypeLog<ApiEndpoints<OpenApiSchema>>;
// type CheckFilter = TypeLog<FilterRoutes<"GET">>;
// type CheckOperation = TypeLog<ApiOperation<"/api/auth/register", "POST">>
// type CheckBody = TypeLog<ApiBody<OpenApiSchema, "/api/auth/register", "POST">>
// type CheckResponses = TypeLog<ApiReturn<"/api/auth/register", "POST">>
// type CheckParams = TypeLog<ApiParams<"/api/auth/register", "POST">>
