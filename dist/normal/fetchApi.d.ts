import { ApiRoutes } from "./api-types.js";
type Route = keyof ApiRoutes;
export default class FetchApi {
    #private;
    private baseURL;
    constructor(baseURL: string);
    get<K extends Route>(endpoint: K): Promise<ApiRoutes[K]["response"]>;
    post<K extends Route>(endpoint: K, body: ApiRoutes[K]["body"]): Promise<ApiRoutes[K]["response"]>;
    put<K extends Route>(endpoint: K, body: ApiRoutes[K]["body"]): Promise<ApiRoutes[K]["response"]>;
    delete<K extends Route>(endpoint: K, body?: ApiRoutes[K]["body"]): Promise<ApiRoutes[K]["response"]>;
}
export {};
