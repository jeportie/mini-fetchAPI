// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   api-types.ts                                       :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: jeportie <jeportie@42.fr>                  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/12/03 18:00:13 by jeportie          #+#    #+#             //
//   Updated: 2025/12/03 18:07:32 by jeportie         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import type { paths } from "./swagger-types";

export type UpperMethod = "GET" | "POST" | "PUT" | "DELETE";

export type MethodMap = {
    GET: "get";
    POST: "post";
    PUT: "put";
    DELETE: "delete";
};

export type Route = keyof paths;

export type BodyFor<P extends Route, U extends UpperMethod> =
    paths[P][MethodMap[U]] extends { requestBody: any }
    ? paths[P][MethodMap[U]]["requestBody"]["content"]["application/json"]
    : undefined;

export type ResponseFor<P extends Route, U extends UpperMethod> =
    paths[P][MethodMap[U]] extends { responses: any }
    ? paths[P][MethodMap[U]]["responses"][200]["content"]["application/json"]
    : unknown;

export type RoutesWithMethod<M extends string> = {
    [P in Route]: paths[P] extends Record<M, any> ? P : never
}[Route];
