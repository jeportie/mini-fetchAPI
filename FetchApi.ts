// ************************************************************************** //
//                                                                            //
//                                                :::::::::::    :::::::::    //
//   FetchApi.ts                                      :+:        :+:    :+:   //
//                                                    +:+        +:+    +:+   //
//   By: jeportie <jeromep.dev@gmail.com>             +#+        +#++:++#+    //
//                                                    +#+        +#+          //
//   Created: 2026/01/07 21:39:47 by jeportie     #+# #+#   #+#  #+#          //
//   Updated: 2026/01/07 21:40:38 by jeportie      #####    ###  ###          //
//                                                                            //
// ************************************************************************** //

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default class FetchApi {
  #baseURL: string;

  constructor(baseURL: string) {
    this.#baseURL = baseURL;
  }

  get<T>(endpoint: string) {
    return this.#query<T>(endpoint, "GET");
  }

  post<t>(endpoint: string, body: unknown) {
    return this.#query<t>(endpoint, "POST", body);
  }

  put<t>(endpoint: string, body: unknown) {
    return this.#query<t>(endpoint, "PUT", body);
  }

  delete<T>(endpoint: string) {
    return this.#query<T>(endpoint, "DELETE");
  }

  async #query<T>(endpoint: string, method: HttpMethod, body?: unknown): Promise<T> {
    const url: string = this.#baseURL + endpoint;

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
      };
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok)
      throw new Error(`[API ERROR]: ${response.status} of ${endpoint}`);

    return response.json() as Promise<T>;
  }
}
