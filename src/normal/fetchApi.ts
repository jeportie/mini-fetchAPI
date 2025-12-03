// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   fetchApi.ts                                        :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: jeportie <jeportie@42.fr>                  +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/12/03 18:37:59 by jeportie          #+#    #+#             //
//   Updated: 2025/12/03 18:44:18 by jeportie         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import { ApiRoutes } from "./api-types.js";

type Route = keyof ApiRoutes;

export default class FetchApi {
    constructor(private baseURL: string) { }

    get<K extends Route>(
        endpoint: K
    ): Promise<ApiRoutes[K]["response"]> {
        return this.#request("GET", endpoint);
    }

    post<K extends Route>(
        endpoint: K,
        body: ApiRoutes[K]["body"]
    ): Promise<ApiRoutes[K]["response"]> {
        return this.#request("POST", endpoint, body);
    }

    put<K extends Route>(
        endpoint: K,
        body: ApiRoutes[K]["body"]
    ): Promise<ApiRoutes[K]["response"]> {
        return this.#request("PUT", endpoint, body);
    }

    delete<K extends Route>(
        endpoint: K,
        body?: ApiRoutes[K]["body"]
    ): Promise<ApiRoutes[K]["response"]> {
        return this.#request("DELETE", endpoint, body);
    }

    async #request<K extends Route>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        endpoint: K,
        body?: ApiRoutes[K]["body"]
    ): Promise<ApiRoutes[K]["response"]> {

        const url = this.baseURL + endpoint;

        const options: RequestInit = {
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`[API ERROR] ${res.status} on ${endpoint}`);
        }

        return res.json() as Promise<ApiRoutes[K]["response"]>;
    }
}

