// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   apiFetch.ts                                        :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: jeportie <jeportie@42.fr>                  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/12/03 18:31:14 by jeportie          #+#    #+#             //
//   Updated: 2025/12/03 18:32:58 by jeportie         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import type { Route, BodyFor, ResponseFor, UpperMethod, RoutesWithMethod } from "./api-types";

export default class FetchApi {
    constructor() { }

    get<P extends RoutesWithMethod<"get">>(
        endpoint: P
    ): Promise<ResponseFor<P, "GET">> {
        return this.#request("GET", endpoint);
    }

    post<P extends RoutesWithMethod<"post">>(
        endpoint: P,
        body: BodyFor<P, "POST">
    ): Promise<ResponseFor<P, "POST">> {
        return this.#request("POST", endpoint, body);
    }

    put<P extends RoutesWithMethod<"put">>(
        endpoint: P,
        body: BodyFor<P, "PUT">
    ): Promise<ResponseFor<P, "PUT">> {
        return this.#request("PUT", endpoint, body);
    }

    delete<P extends RoutesWithMethod<"delete">>(
        endpoint: P,
        body?: BodyFor<P, "DELETE">
    ): Promise<ResponseFor<P, "DELETE">> {
        return this.#request("DELETE", endpoint, body);
    }

    async #request<P extends Route, U extends UpperMethod>(
        method: U,
        endpoint: P,
        body?: BodyFor<P, U>
    ): Promise<ResponseFor<P, U>> {

        const options: RequestInit = {
            method,
            headers: { "Content-Type": "application/json" }
        };

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(endpoint, options);
        if (!res.ok) {
            throw new Error(`[API ERROR] ${res.status} on ${endpoint}`);
        }

        const json = await res.json();
        return json as ResponseFor<P, U>;
    }
}
