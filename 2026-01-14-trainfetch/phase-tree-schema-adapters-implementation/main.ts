// ************************************************************************** //
//                                                                            //
//                                                                            //
//   main.ts                                                                  //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/15 19:05:14 by jeportie                                 //
//   Updated: 2026/01/20 09:03:32 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import FetchApi from "./FetchApi";

export const api = new FetchApi("https://localhost:5000");

const data = await api.get("/api/user/me");
const api.

