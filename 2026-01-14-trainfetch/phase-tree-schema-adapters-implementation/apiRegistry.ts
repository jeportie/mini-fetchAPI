// ************************************************************************** //
//                                                                            //
//                                                                            //
//   apiRegistry.ts                                                           //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/19 22:24:20 by jeportie                                 //
//   Updated: 2026/01/19 22:27:48 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { paths as MainPaths } from "./schema/apiSchema";

export interface ApiRegistry {
  "https://localhost:5000": MainPaths;
}
