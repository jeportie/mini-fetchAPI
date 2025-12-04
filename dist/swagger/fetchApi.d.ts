import type { BodyFor, ResponseFor, RoutesWithMethod } from "./api-types.js";
export default class FetchApi {
    #private;
    constructor();
    get<P extends RoutesWithMethod<"get">>(endpoint: P): Promise<ResponseFor<P, "GET">>;
    post<P extends RoutesWithMethod<"post">>(endpoint: P, body: BodyFor<P, "POST">): Promise<ResponseFor<P, "POST">>;
    put<P extends RoutesWithMethod<"put">>(endpoint: P, body: BodyFor<P, "PUT">): Promise<ResponseFor<P, "PUT">>;
    delete<P extends RoutesWithMethod<"delete">>(endpoint: P, body?: BodyFor<P, "DELETE">): Promise<ResponseFor<P, "DELETE">>;
}
