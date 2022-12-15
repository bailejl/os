import root from "__GENERATED__/root.svelte";
import { respond } from "../../node_modules/@sveltejs/kit/src/runtime/server/index.js";
import {
  set_paths,
  assets,
  base
} from "../../node_modules/@sveltejs/kit/src/runtime/paths.js";
import {
  set_building,
  set_version
} from "../../node_modules/@sveltejs/kit/src/runtime/env.js";
import { set_private_env } from "../../node_modules/@sveltejs/kit/src/runtime/env-private.js";
import { set_public_env } from "../../node_modules/@sveltejs/kit/src/runtime/env-public.js";

const app_template = ({ head, body, assets, nonce }) =>
  '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="' +
  assets +
  '/favicon.png" />\n    <meta name="viewport" content="width=device-width" />\n    ' +
  head +
  "\n  </head>\n  <body>\n    <div>" +
  body +
  "</div>\n  </body>\n</html>\n";

const error_template = ({ status, message }) =>
  '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="%sveltekit.assets%/favicon.png" />\n    <meta name="viewport" content="width=device-width" />\n  </head>\n  <body>\n    <div>Error</div>\n  </body>\n</html>\n';

let read = null;

set_paths({ base: "", assets: "" });
set_version("1671072773288");

let default_protocol = "https";

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
  default_protocol = settings.protocol || default_protocol;
  set_paths(settings.paths);
  set_building(settings.building);
  read = settings.read;
}

export class Server {
  constructor(manifest) {
    this.options = {
      csp: {
        mode: "auto",
        directives: {
          "upgrade-insecure-requests": false,
          "block-all-mixed-content": false
        },
        reportOnly: {
          "upgrade-insecure-requests": false,
          "block-all-mixed-content": false
        }
      },
      csrf: {
        check_origin: true
      },
      dev: false,
      embedded: false,
      handle_error: (error, event) => {
        return (
          this.options.hooks.handleError({ error, event }) ?? {
            message: event.route.id != null ? "Internal Error" : "Not Found"
          }
        );
      },
      hooks: null,
      manifest,
      paths: { base, assets },
      public_env: {},
      read,
      root,
      service_worker: false,
      app_template,
      app_template_contains_nonce: false,
      error_template,
      version: "1671072773288"
    };
  }

  /**
   * Take care: Some adapters may have to call `Server.init` per-request to set env vars,
   * so anything that shouldn't be rerun should be wrapped in an `if` block to make sure it hasn't
   * been done already.
   */
  async init({ env }) {
    const entries = Object.entries(env);

    const prv = Object.fromEntries(
      entries.filter(([k]) => !k.startsWith("PUBLIC_"))
    );

    const pub = Object.fromEntries(
      entries.filter(([k]) => k.startsWith("PUBLIC_"))
    );

    set_private_env(prv);
    set_public_env(pub);

    this.options.public_env = pub;

    if (!this.options.hooks) {
      const module = await import("./hooks.js");

      this.options.hooks = {
        handle: module.handle || (({ event, resolve }) => resolve(event)),
        handleError:
          module.handleError || (({ error }) => console.error(error.stack)),
        handleFetch:
          module.handleFetch || (({ request, fetch }) => fetch(request))
      };
    }
  }

  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }

    return respond(request, this.options, options);
  }
}
