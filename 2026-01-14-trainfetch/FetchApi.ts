// ************************************************************************** //
//                                                                            //
//                                                                            //
//   FetchApi.ts                                                              //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/14 13:25:21 by jeportie                                 //
//   Updated: 2026/01/15 20:20:39 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { FilterRoutes, ApiBody, HttpMethods, ApiReturn, EndpointKey } from "./types";

// TODO:  enable JSdocs comment in autocomplete by parsing the ones included in open-api generated types

export default class FetchApi<S> {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  get<E extends FilterRoutes<S, "GET">>(endoint: E) {
    return this.#request(endoint, "GET");
  }

  post<E extends FilterRoutes<S, "POST">>(endoint: E, body: ApiBody<S, E, "POST">) {
    return this.#request(endoint, "POST", body);
  }

  put<E extends FilterRoutes<S, "PUT">>(endoint: E, body: ApiBody<S, E, "PUT">) {
    return this.#request(endoint, "PUT", body);
  }

  delete<E extends FilterRoutes<S, "DELETE">>(endoint: E) {
    return this.#request(endoint, "DELETE");
  }

  async #request<E extends EndpointKey<S>, M extends HttpMethods>(
    endpoint: E,
    method: M,
    body?: ApiBody<S, E, M>
  )
    : Promise<ApiReturn<S, E, M>> {
    const url = this.#baseUrl + endpoint;

    const options: RequestInit = {
      method,
      headers: {
        "Accept": "application/json",
      }
    }

    if (body !== undefined) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      }
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`[API Error]: ${response.status} from: %{endpoint}`);
    }

    return response.json() as Promise<ApiReturn<S, E, M>>;
  }
}
