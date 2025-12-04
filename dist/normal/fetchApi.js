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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FetchApi_instances, _FetchApi_request;
class FetchApi {
    constructor(baseURL) {
        _FetchApi_instances.add(this);
        this.baseURL = baseURL;
    }
    get(endpoint) {
        return __classPrivateFieldGet(this, _FetchApi_instances, "m", _FetchApi_request).call(this, "GET", endpoint);
    }
    post(endpoint, body) {
        return __classPrivateFieldGet(this, _FetchApi_instances, "m", _FetchApi_request).call(this, "POST", endpoint, body);
    }
    put(endpoint, body) {
        return __classPrivateFieldGet(this, _FetchApi_instances, "m", _FetchApi_request).call(this, "PUT", endpoint, body);
    }
    delete(endpoint, body) {
        return __classPrivateFieldGet(this, _FetchApi_instances, "m", _FetchApi_request).call(this, "DELETE", endpoint, body);
    }
}
_FetchApi_instances = new WeakSet(), _FetchApi_request = async function _FetchApi_request(method, endpoint, body) {
    const url = this.baseURL + endpoint;
    const options = {
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
    return res.json();
};
export default FetchApi;
