export { matchers } from "./client-matchers.js";

export const nodes = [
  () => import("./nodes/0"),
  () => import("./nodes/1"),
  () => import("./nodes/2"),
  () => import("./nodes/3"),
  () => import("./nodes/4"),
  () => import("./nodes/5"),
  () => import("./nodes/6")
];

export const server_loads = [];

export const dictionary = {
  "/": [4],
  "/(no-default-footer-or-header)/login": [5, [3]],
  "/(no-default-footer-or-header)/register": [6, [3]]
};

export const hooks = {
  handleError: ({ error }) => {
    console.error(error);
  }
};
