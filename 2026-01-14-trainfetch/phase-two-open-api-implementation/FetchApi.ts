// ************************************************************************** //
//                                                                            //
//                                                                            //
//   FetchApi.ts                                                              //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/14 13:25:21 by jeportie                                 //
//   Updated: 2026/01/15 19:49:55 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { ApiBody, ApiEndpoints, ApiReturn, FilterRoutes, HttpMethods } from "./types";

export default class FetchApi {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  get<E extends FilterRoutes<"GET">>(endoint: E) {
    return this.#request(endoint, "GET");
  }

  post<E extends FilterRoutes<"POST">>(endoint: E, body: ApiBody<E, "POST">) {
    return this.#request(endoint, "POST", body);
  }

  put<E extends FilterRoutes<"PUT">>(endoint: E, body: ApiBody<E, "PUT">) {
    return this.#request(endoint, "PUT", body);
  }

  delete<E extends FilterRoutes<"DELETE">>(endoint: E) {
    return this.#request(endoint, "DELETE");
  }

  async #request<E extends ApiEndpoints, M extends HttpMethods>(
    endpoint: E,
    method: M,
    body?: ApiBody<E, M>
  )
    : Promise<ApiReturn<E, M>> {
    const url: string = this.#baseUrl + endpoint;

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

    return response.json() as Promise<ApiReturn<E, M>>;
  }
}
