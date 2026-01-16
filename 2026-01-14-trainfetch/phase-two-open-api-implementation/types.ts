// ************************************************************************** //
//                                                                            //
//                                                                            //
//   old-types.ts                                                             //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/14 13:25:29 by jeportie                                 //
//   Updated: 2026/01/15 19:48:18 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { paths } from "./apiSchema";

type ApiSchema = paths;

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

interface MethodsMap {
  GET: "get";
  POST: "post";
  PUT: "put";
  DELETE: "delete";
}

export type ApiEndpoints = keyof ApiSchema;

export type FilterRoutes<M extends HttpMethods> = {
  [E in ApiEndpoints]: ApiSchema[E] extends Record<MethodsMap[M], any> ? E : never;
}[ApiEndpoints];

type ApiOperation<
  E extends ApiEndpoints,
  M extends HttpMethods
> = ApiSchema[E] extends Record<MethodsMap[M], infer O> ? O : never;

type ResponsesOf<O, S extends number> =
  O extends { responses: infer R } ? (S extends keyof R ? R[S] : never) : never;

type RequestBodyOf<O> = O extends { requestBody: infer RB } ? RB : undefined;
type ParametersOf<O> = O extends { parameters: infer P } ? P : undefined;
type ContentOf<O> = O extends { content: infer C } ? C : undefined;
type JsonContent<O> = O extends { "application/json": infer J } ? J : never;

export type ApiBody<
  E extends ApiEndpoints,
  M extends HttpMethods
> = JsonContent<ContentOf<RequestBodyOf<ApiOperation<E, M>>>>;

export type ApiReturn<
  E extends ApiEndpoints,
  M extends HttpMethods,
  S extends number = 200
> = JsonContent<ContentOf<ResponsesOf<ApiOperation<E, M>, S>>>;

export type ApiParams<
  E extends ApiEndpoints,
  M extends HttpMethods
> = ParametersOf<ApiOperation<E, M>>;

export type TypeLog<T> = T extends any ? T : never;
// logs for debbuging (hover on Checks to see the type result)
// type CheckEndpoints = TypeLog<ApiEndpoints>;
// type CheckFilter = TypeLog<FilterRoutes<"GET">>;
// type CheckOperation = TypeLog<ApiOperation<"/api/auth/register", "POST">>
// type CheckBody = TypeLog<ApiBody<"/api/auth/register", "POST">>
// type CheckResponses = TypeLog<ApiReturn<"/api/auth/register", "POST">>
// type CheckParams = TypeLog<ApiParams<"/api/auth/register", "POST">>
