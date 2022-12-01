export const manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: new Set(["favicon.png"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    entry: {
      file: "_app/immutable/start-d92a66a8.js",
      imports: [
        "_app/immutable/start-d92a66a8.js",
        "_app/immutable/chunks/index-edd250b0.js",
        "_app/immutable/chunks/singletons-c4092014.js"
      ],
      stylesheets: []
    },
    nodes: [
      () => import("./nodes/0.js"),
      () => import("./nodes/1.js"),
      () => import("./nodes/2.js")
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        names: [],
        types: [],
        optional: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
