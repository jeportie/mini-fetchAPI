// ************************************************************************** //
//                                                                            //
//                                                                            //
//   main.ts                                                                  //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/15 19:05:14 by jeportie                                 //
//   Updated: 2026/01/15 20:23:17 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import FetchApi from "./FetchApi";
import { paths } from "./apiSchema";

export const api = new FetchApi<paths>("example.com");

