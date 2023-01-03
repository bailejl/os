export const manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: new Set([
    "favicon.png",
    "images/avatars/avatar-1.png",
    "images/avatars/avatar-2.png",
    "images/avatars/avatar-3.png",
    "images/avatars/avatar-4.png",
    "images/avatars/avatar-5.png",
    "images/background-auth.jpg",
    "images/background-call-to-action.jpg",
    "images/background-faqs.jpg",
    "images/background-features.jpg",
    "images/logos/laravel.svg",
    "images/logos/mirage.svg",
    "images/logos/statamic.svg",
    "images/logos/statickit.svg",
    "images/logos/transistor.svg",
    "images/logos/tuple.svg",
    "images/screenshots/contacts.png",
    "images/screenshots/expenses.png",
    "images/screenshots/inventory.png",
    "images/screenshots/payroll.png",
    "images/screenshots/profit-loss.png",
    "images/screenshots/reporting.png",
    "images/screenshots/vat-returns.png",
    "sample-avatar.jpeg"
  ]),
  mimeTypes: {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".jpeg": "image/jpeg"
  },
  _: {
    entry: {
      file: "_app/immutable/start-ad9008a5.js",
      imports: [
        "_app/immutable/start-ad9008a5.js",
        "_app/immutable/chunks/index-b7aff430.js",
        "_app/immutable/chunks/singletons-6839f04e.js",
        "_app/immutable/chunks/index-b2e54031.js"
      ],
      stylesheets: [],
      fonts: []
    },
    nodes: [
      () => import("./nodes/0.js"),
      () => import("./nodes/1.js"),
      () => import("./nodes/3.js"),
      () => import("./nodes/4.js"),
      () => import("./nodes/5.js"),
      () => import("./nodes/6.js")
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "/(no-default-footer-or-header)/login",
        pattern: /^\/login\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 4 },
        endpoint: null
      },
      {
        id: "/(no-default-footer-or-header)/register",
        pattern: /^\/register\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 5 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
