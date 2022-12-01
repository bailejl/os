import {
  S as Ye,
  i as Xe,
  s as Ze,
  a as Qe,
  e as V,
  c as xe,
  b as M,
  g as pe,
  t as F,
  d as de,
  f as J,
  h as G,
  j as et,
  o as Re,
  k as tt,
  l as nt,
  m as rt,
  n as ve,
  p as B,
  q as at,
  r as st,
  u as ot,
  v as Y,
  w as X,
  x as Le,
  y as Z,
  z as Q,
  A as Ve
} from "./chunks/index-edd250b0.js";
import {
  g as Fe,
  f as Je,
  s as z,
  a as Se,
  b as it,
  i as lt
} from "./chunks/singletons-c4092014.js";
function ct(r, e) {
  return r === "/" || e === "ignore"
    ? r
    : e === "never"
    ? r.endsWith("/")
      ? r.slice(0, -1)
      : r
    : e === "always" && !r.endsWith("/")
    ? r + "/"
    : r;
}
function ft(r) {
  for (const e in r)
    r[e] = r[e]
      .replace(/%23/g, "#")
      .replace(/%3[Bb]/g, ";")
      .replace(/%2[Cc]/g, ",")
      .replace(/%2[Ff]/g, "/")
      .replace(/%3[Ff]/g, "?")
      .replace(/%3[Aa]/g, ":")
      .replace(/%40/g, "@")
      .replace(/%26/g, "&")
      .replace(/%3[Dd]/g, "=")
      .replace(/%2[Bb]/g, "+")
      .replace(/%24/g, "$");
  return r;
}
const ut = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function pt(r, e) {
  const t = new URL(r);
  for (const o of ut) {
    let s = t[o];
    Object.defineProperty(t, o, {
      get() {
        return e(), s;
      },
      enumerable: !0,
      configurable: !0
    });
  }
  return dt(t), t;
}
function dt(r) {
  Object.defineProperty(r, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
const ht = "/__data.json";
function mt(r) {
  return r.replace(/\/$/, "") + ht;
}
function gt(r) {
  let e = 5381;
  if (typeof r == "string") {
    let t = r.length;
    for (; t; ) e = (e * 33) ^ r.charCodeAt(--t);
  } else if (ArrayBuffer.isView(r)) {
    const t = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    let o = t.length;
    for (; o; ) e = (e * 33) ^ t[--o];
  } else throw new TypeError("value must be a string or TypedArray");
  return (e >>> 0).toString(36);
}
const he = window.fetch;
window.fetch = (r, e) => {
  if (
    (r instanceof Request
      ? r.method
      : (e == null ? void 0 : e.method) || "GET") !== "GET"
  ) {
    const o = new URL(
      r instanceof Request ? r.url : r.toString(),
      document.baseURI
    ).href;
    ue.delete(o);
  }
  return he(r, e);
};
const ue = new Map();
function _t(r, e, t) {
  let s = `script[data-sveltekit-fetched][data-url=${JSON.stringify(
    r instanceof Request ? r.url : r
  )}]`;
  (t == null ? void 0 : t.body) &&
    (typeof t.body == "string" || ArrayBuffer.isView(t.body)) &&
    (s += `[data-hash="${gt(t.body)}"]`);
  const d = document.querySelector(s);
  if (d != null && d.textContent) {
    const { body: n, ...f } = JSON.parse(d.textContent),
      _ = d.getAttribute("data-ttl");
    return (
      _ && ue.set(e, { body: n, init: f, ttl: 1e3 * Number(_) }),
      Promise.resolve(new Response(n, f))
    );
  }
  return he(r, t);
}
function yt(r, e) {
  const t = ue.get(r);
  if (t) {
    if (performance.now() < t.ttl) return new Response(t.body, t.init);
    ue.delete(r);
  }
  return he(r, e);
}
const wt = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function bt(r) {
  const e = [],
    t = [],
    o = [];
  let s = !0;
  return {
    pattern:
      r === "/"
        ? /^\/$/
        : new RegExp(
            `^${Et(r)
              .map((n, f, _) => {
                const u = decodeURIComponent(n),
                  m = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(u);
                if (m)
                  return e.push(m[1]), t.push(m[2]), o.push(!1), "(?:/(.*))?";
                const y = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(u);
                if (y)
                  return (
                    e.push(y[1]), t.push(y[2]), o.push(!0), "(?:/([^/]+))?"
                  );
                const S = f === _.length - 1;
                return u
                  ? "/" +
                      u
                        .split(/\[(.+?)\](?!\])/)
                        .map((T, D) => {
                          if (D % 2) {
                            const q = wt.exec(T);
                            if (!q)
                              throw new Error(
                                `Invalid param: ${T}. Params and matcher names can only have underscores and alphanumeric characters.`
                              );
                            const [, K, ae, x, se] = q;
                            return (
                              e.push(x),
                              t.push(se),
                              o.push(!!K),
                              ae ? "(.*?)" : K ? "([^/]*)?" : "([^/]+?)"
                            );
                          }
                          return (
                            S && T.includes(".") && (s = !1),
                            T.normalize()
                              .replace(/%5[Bb]/g, "[")
                              .replace(/%5[Dd]/g, "]")
                              .replace(/#/g, "%23")
                              .replace(/\?/g, "%3F")
                              .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                          );
                        })
                        .join("")
                  : void 0;
              })
              .join("")}${s ? "/?" : ""}$`
          ),
    names: e,
    types: t,
    optional: o
  };
}
function vt(r) {
  return !/^\([^)]+\)$/.test(r);
}
function Et(r) {
  return r.slice(1).split("/").filter(vt);
}
function kt(r, { names: e, types: t, optional: o }, s) {
  const d = {};
  for (let n = 0; n < e.length; n += 1) {
    const f = e[n],
      _ = t[n];
    let u = r[n + 1];
    if (u || !o[n]) {
      if (_) {
        const m = s[_];
        if (!m) throw new Error(`Missing "${_}" param matcher`);
        if (!m(u)) return;
      }
      d[f] = u != null ? u : "";
    }
  }
  return d;
}
function Rt(r, e, t, o) {
  const s = new Set(e);
  return Object.entries(t).map(([f, [_, u, m]]) => {
    const { pattern: y, names: S, types: U, optional: H } = bt(f),
      T = {
        id: f,
        exec: (D) => {
          const q = y.exec(D);
          if (q) return kt(q, { names: S, types: U, optional: H }, o);
        },
        errors: [1, ...(m || [])].map((D) => r[D]),
        layouts: [0, ...(u || [])].map(n),
        leaf: d(_)
      };
    return (
      (T.errors.length = T.layouts.length =
        Math.max(T.errors.length, T.layouts.length)),
      T
    );
  });
  function d(f) {
    const _ = f < 0;
    return _ && (f = ~f), [_, r[f]];
  }
  function n(f) {
    return f === void 0 ? f : [s.has(f), r[f]];
  }
}
function St(r) {
  let e, t, o;
  var s = r[0][0];
  function d(n) {
    return { props: { data: n[2], form: n[1] } };
  }
  return (
    s && (e = Y(s, d(r))),
    {
      c() {
        e && X(e.$$.fragment), (t = V());
      },
      l(n) {
        e && Le(e.$$.fragment, n), (t = V());
      },
      m(n, f) {
        e && Z(e, n, f), M(n, t, f), (o = !0);
      },
      p(n, f) {
        const _ = {};
        if (
          (f & 4 && (_.data = n[2]),
          f & 2 && (_.form = n[1]),
          s !== (s = n[0][0]))
        ) {
          if (e) {
            pe();
            const u = e;
            F(u.$$.fragment, 1, 0, () => {
              Q(u, 1);
            }),
              de();
          }
          s
            ? ((e = Y(s, d(n))),
              X(e.$$.fragment),
              J(e.$$.fragment, 1),
              Z(e, t.parentNode, t))
            : (e = null);
        } else s && e.$set(_);
      },
      i(n) {
        o || (e && J(e.$$.fragment, n), (o = !0));
      },
      o(n) {
        e && F(e.$$.fragment, n), (o = !1);
      },
      d(n) {
        n && G(t), e && Q(e, n);
      }
    }
  );
}
function Ot(r) {
  let e, t, o;
  var s = r[0][0];
  function d(n) {
    return {
      props: { data: n[2], $$slots: { default: [$t] }, $$scope: { ctx: n } }
    };
  }
  return (
    s && (e = Y(s, d(r))),
    {
      c() {
        e && X(e.$$.fragment), (t = V());
      },
      l(n) {
        e && Le(e.$$.fragment, n), (t = V());
      },
      m(n, f) {
        e && Z(e, n, f), M(n, t, f), (o = !0);
      },
      p(n, f) {
        const _ = {};
        if (
          (f & 4 && (_.data = n[2]),
          f & 523 && (_.$$scope = { dirty: f, ctx: n }),
          s !== (s = n[0][0]))
        ) {
          if (e) {
            pe();
            const u = e;
            F(u.$$.fragment, 1, 0, () => {
              Q(u, 1);
            }),
              de();
          }
          s
            ? ((e = Y(s, d(n))),
              X(e.$$.fragment),
              J(e.$$.fragment, 1),
              Z(e, t.parentNode, t))
            : (e = null);
        } else s && e.$set(_);
      },
      i(n) {
        o || (e && J(e.$$.fragment, n), (o = !0));
      },
      o(n) {
        e && F(e.$$.fragment, n), (o = !1);
      },
      d(n) {
        n && G(t), e && Q(e, n);
      }
    }
  );
}
function $t(r) {
  let e, t, o;
  var s = r[0][1];
  function d(n) {
    return { props: { data: n[3], form: n[1] } };
  }
  return (
    s && (e = Y(s, d(r))),
    {
      c() {
        e && X(e.$$.fragment), (t = V());
      },
      l(n) {
        e && Le(e.$$.fragment, n), (t = V());
      },
      m(n, f) {
        e && Z(e, n, f), M(n, t, f), (o = !0);
      },
      p(n, f) {
        const _ = {};
        if (
          (f & 8 && (_.data = n[3]),
          f & 2 && (_.form = n[1]),
          s !== (s = n[0][1]))
        ) {
          if (e) {
            pe();
            const u = e;
            F(u.$$.fragment, 1, 0, () => {
              Q(u, 1);
            }),
              de();
          }
          s
            ? ((e = Y(s, d(n))),
              X(e.$$.fragment),
              J(e.$$.fragment, 1),
              Z(e, t.parentNode, t))
            : (e = null);
        } else s && e.$set(_);
      },
      i(n) {
        o || (e && J(e.$$.fragment, n), (o = !0));
      },
      o(n) {
        e && F(e.$$.fragment, n), (o = !1);
      },
      d(n) {
        n && G(t), e && Q(e, n);
      }
    }
  );
}
function Ge(r) {
  let e,
    t = r[5] && Ke(r);
  return {
    c() {
      (e = tt("div")), t && t.c(), this.h();
    },
    l(o) {
      e = nt(o, "DIV", {
        id: !0,
        "aria-live": !0,
        "aria-atomic": !0,
        style: !0
      });
      var s = rt(e);
      t && t.l(s), s.forEach(G), this.h();
    },
    h() {
      ve(e, "id", "svelte-announcer"),
        ve(e, "aria-live", "assertive"),
        ve(e, "aria-atomic", "true"),
        B(e, "position", "absolute"),
        B(e, "left", "0"),
        B(e, "top", "0"),
        B(e, "clip", "rect(0 0 0 0)"),
        B(e, "clip-path", "inset(50%)"),
        B(e, "overflow", "hidden"),
        B(e, "white-space", "nowrap"),
        B(e, "width", "1px"),
        B(e, "height", "1px");
    },
    m(o, s) {
      M(o, e, s), t && t.m(e, null);
    },
    p(o, s) {
      o[5]
        ? t
          ? t.p(o, s)
          : ((t = Ke(o)), t.c(), t.m(e, null))
        : t && (t.d(1), (t = null));
    },
    d(o) {
      o && G(e), t && t.d();
    }
  };
}
function Ke(r) {
  let e;
  return {
    c() {
      e = at(r[6]);
    },
    l(t) {
      e = st(t, r[6]);
    },
    m(t, o) {
      M(t, e, o);
    },
    p(t, o) {
      o & 64 && ot(e, t[6]);
    },
    d(t) {
      t && G(e);
    }
  };
}
function It(r) {
  let e, t, o, s, d;
  const n = [Ot, St],
    f = [];
  function _(m, y) {
    return m[0][1] ? 0 : 1;
  }
  (e = _(r)), (t = f[e] = n[e](r));
  let u = r[4] && Ge(r);
  return {
    c() {
      t.c(), (o = Qe()), u && u.c(), (s = V());
    },
    l(m) {
      t.l(m), (o = xe(m)), u && u.l(m), (s = V());
    },
    m(m, y) {
      f[e].m(m, y), M(m, o, y), u && u.m(m, y), M(m, s, y), (d = !0);
    },
    p(m, [y]) {
      let S = e;
      (e = _(m)),
        e === S
          ? f[e].p(m, y)
          : (pe(),
            F(f[S], 1, 1, () => {
              f[S] = null;
            }),
            de(),
            (t = f[e]),
            t ? t.p(m, y) : ((t = f[e] = n[e](m)), t.c()),
            J(t, 1),
            t.m(o.parentNode, o)),
        m[4]
          ? u
            ? u.p(m, y)
            : ((u = Ge(m)), u.c(), u.m(s.parentNode, s))
          : u && (u.d(1), (u = null));
    },
    i(m) {
      d || (J(t), (d = !0));
    },
    o(m) {
      F(t), (d = !1);
    },
    d(m) {
      f[e].d(m), m && G(o), u && u.d(m), m && G(s);
    }
  };
}
function Lt(r, e, t) {
  let { stores: o } = e,
    { page: s } = e,
    { components: d } = e,
    { form: n } = e,
    { data_0: f = null } = e,
    { data_1: _ = null } = e;
  et(o.page.notify);
  let u = !1,
    m = !1,
    y = null;
  return (
    Re(() => {
      const S = o.page.subscribe(() => {
        u && (t(5, (m = !0)), t(6, (y = document.title || "untitled page")));
      });
      return t(4, (u = !0)), S;
    }),
    (r.$$set = (S) => {
      "stores" in S && t(7, (o = S.stores)),
        "page" in S && t(8, (s = S.page)),
        "components" in S && t(0, (d = S.components)),
        "form" in S && t(1, (n = S.form)),
        "data_0" in S && t(2, (f = S.data_0)),
        "data_1" in S && t(3, (_ = S.data_1));
    }),
    (r.$$.update = () => {
      r.$$.dirty & 384 && o.page.set(s);
    }),
    [d, n, f, _, u, m, y, o, s]
  );
}
class At extends Ye {
  constructor(e) {
    super(),
      Xe(this, e, Lt, It, Ze, {
        stores: 7,
        page: 8,
        components: 0,
        form: 1,
        data_0: 2,
        data_1: 3
      });
  }
}
const jt = (function () {
    const e = document.createElement("link").relList;
    return e && e.supports && e.supports("modulepreload")
      ? "modulepreload"
      : "preload";
  })(),
  Nt = function (r, e) {
    return new URL(r, e).href;
  },
  ze = {},
  Ee = function (e, t, o) {
    if (!t || t.length === 0) return e();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      t.map((d) => {
        if (((d = Nt(d, o)), d in ze)) return;
        ze[d] = !0;
        const n = d.endsWith(".css"),
          f = n ? '[rel="stylesheet"]' : "";
        if (!!o)
          for (let m = s.length - 1; m >= 0; m--) {
            const y = s[m];
            if (y.href === d && (!n || y.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${d}"]${f}`)) return;
        const u = document.createElement("link");
        if (
          ((u.rel = n ? "stylesheet" : jt),
          n || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = d),
          document.head.appendChild(u),
          n)
        )
          return new Promise((m, y) => {
            u.addEventListener("load", m),
              u.addEventListener("error", () =>
                y(new Error(`Unable to preload CSS for ${d}`))
              );
          });
      })
    ).then(() => e());
  },
  Pt = {},
  me = [
    () =>
      Ee(
        () => import("./chunks/0-63f803f4.js"),
        [
          "./chunks/0-63f803f4.js",
          "./components/layout.svelte-dd5e5f5e.js",
          "./chunks/index-edd250b0.js"
        ],
        import.meta.url
      ),
    () =>
      Ee(
        () => import("./chunks/1-df3d78da.js"),
        [
          "./chunks/1-df3d78da.js",
          "./components/error.svelte-f2f4ef15.js",
          "./chunks/index-edd250b0.js",
          "./chunks/singletons-c4092014.js"
        ],
        import.meta.url
      ),
    () =>
      Ee(
        () => import("./chunks/2-4017c828.js"),
        [
          "./chunks/2-4017c828.js",
          "./components/pages/_page.svelte-6023fbb3.js",
          "./chunks/index-edd250b0.js"
        ],
        import.meta.url
      )
  ],
  Ut = [],
  Tt = { "/": [2] },
  Dt = {
    handleError: ({ error: r }) => {
      console.error(r);
    }
  };
class Oe {
  constructor(e, t) {
    (this.status = e),
      typeof t == "string"
        ? (this.body = { message: t })
        : t
        ? (this.body = t)
        : (this.body = { message: `Error: ${e}` });
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Me {
  constructor(e, t) {
    (this.status = e), (this.location = t);
  }
}
async function Bt(r) {
  var e;
  for (const t in r)
    if (typeof ((e = r[t]) == null ? void 0 : e.then) == "function")
      return Object.fromEntries(
        await Promise.all(Object.entries(r).map(async ([o, s]) => [o, await s]))
      );
  return r;
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
const qt = -1,
  Ct = -2,
  Vt = -3,
  Ft = -4,
  Jt = -5,
  Gt = -6;
function Kt(r) {
  return zt(JSON.parse(r));
}
function zt(r) {
  if (typeof r == "number") return o(r, !0);
  if (!Array.isArray(r) || r.length === 0) throw new Error("Invalid input");
  const e = r,
    t = Array(e.length);
  function o(s, d = !1) {
    if (s === qt) return;
    if (s === Vt) return NaN;
    if (s === Ft) return 1 / 0;
    if (s === Jt) return -1 / 0;
    if (s === Gt) return -0;
    if (d) throw new Error("Invalid input");
    if (s in t) return t[s];
    const n = e[s];
    if (!n || typeof n != "object") t[s] = n;
    else if (Array.isArray(n))
      if (typeof n[0] == "string")
        switch (n[0]) {
          case "Date":
            t[s] = new Date(n[1]);
            break;
          case "Set":
            const _ = new Set();
            t[s] = _;
            for (let y = 1; y < n.length; y += 1) _.add(o(n[y]));
            break;
          case "Map":
            const u = new Map();
            t[s] = u;
            for (let y = 1; y < n.length; y += 2) u.set(o(n[y]), o(n[y + 1]));
            break;
          case "RegExp":
            t[s] = new RegExp(n[1], n[2]);
            break;
          case "Object":
            t[s] = Object(n[1]);
            break;
          case "BigInt":
            t[s] = BigInt(n[1]);
            break;
          case "null":
            const m = Object.create(null);
            t[s] = m;
            for (let y = 1; y < n.length; y += 2) m[n[y]] = o(n[y + 1]);
            break;
        }
      else {
        const f = new Array(n.length);
        t[s] = f;
        for (let _ = 0; _ < n.length; _ += 1) {
          const u = n[_];
          u !== Ct && (f[_] = o(u));
        }
      }
    else {
      const f = {};
      t[s] = f;
      for (const _ in n) {
        const u = n[_];
        f[_] = o(u);
      }
    }
    return t[s];
  }
  return o(0);
}
const We = "sveltekit:scroll",
  C = "sveltekit:index",
  le = Rt(me, Ut, Tt, Pt),
  $e = me[0],
  Ie = me[1];
$e();
Ie();
let re = {};
try {
  re = JSON.parse(sessionStorage[We]);
} catch {}
function ke(r) {
  re[r] = Se();
}
function Mt({ target: r, base: e, trailing_slash: t }) {
  var Be;
  const o = [];
  let s = null;
  const d = { before_navigate: [], after_navigate: [] };
  let n = { branch: [], error: null, url: null },
    f = !1,
    _ = !1,
    u = !0,
    m = !1,
    y = !1,
    S,
    U = (Be = history.state) == null ? void 0 : Be[C];
  U ||
    ((U = Date.now()),
    history.replaceState({ ...history.state, [C]: U }, "", location.href));
  const H = re[U];
  H && ((history.scrollRestoration = "manual"), scrollTo(H.x, H.y));
  let T = !1,
    D,
    q,
    K;
  async function ae() {
    (K = K || Promise.resolve()), await K, (K = null);
    const a = new URL(location.href),
      c = ye(a, !0);
    (s = null), await Ae(c, a, []);
  }
  async function x(
    a,
    {
      noscroll: c = !1,
      replaceState: p = !1,
      keepfocus: i = !1,
      state: l = {},
      invalidateAll: h = !1
    },
    g,
    E
  ) {
    return (
      typeof a == "string" && (a = new URL(a, Fe(document))),
      we({
        url: a,
        scroll: c ? Se() : null,
        keepfocus: i,
        redirect_chain: g,
        details: { state: l, replaceState: p },
        nav_token: E,
        accepted: () => {
          h && (y = !0);
        },
        blocked: () => {},
        type: "goto"
      })
    );
  }
  async function se(a) {
    const c = ye(a, !1);
    if (!c)
      throw new Error(
        `Attempted to prefetch a URL that does not belong to this app: ${a}`
      );
    return (s = { id: c.id, promise: Pe(c) }), s.promise;
  }
  async function Ae(a, c, p, i, l = {}, h) {
    var E, k;
    q = l;
    let g = a && (await Pe(a));
    if (
      (g ||
        (g = await De(
          c,
          null,
          ne(new Error(`Not found: ${c.pathname}`), {
            url: c,
            params: {},
            routeId: null
          }),
          404
        )),
      (c = (a == null ? void 0 : a.url) || c),
      q !== l)
    )
      return !1;
    if (g.type === "redirect")
      if (p.length > 10 || p.includes(c.pathname))
        g = await oe({
          status: 500,
          error: ne(new Error("Redirect loop"), {
            url: c,
            params: {},
            routeId: null
          }),
          url: c,
          routeId: null
        });
      else return x(new URL(g.location, c).href, {}, [...p, c.pathname], l), !1;
    else
      ((k = (E = g.props) == null ? void 0 : E.page) == null
        ? void 0
        : k.status) >= 400 &&
        (await z.updated.check()) &&
        (await ie(c));
    if (((o.length = 0), (y = !1), (m = !0), i && i.details)) {
      const { details: b } = i,
        v = b.replaceState ? 0 : 1;
      (b.state[C] = U += v),
        history[b.replaceState ? "replaceState" : "pushState"](b.state, "", c);
    }
    if (((s = null), _)) {
      (n = g.state), g.props.page && (g.props.page.url = c);
      const b = fe();
      S.$set(g.props), b();
    } else je(g);
    if (i) {
      const { scroll: b, keepfocus: v } = i;
      if (!v) {
        const O = document.body,
          I = O.getAttribute("tabindex");
        (O.tabIndex = -1),
          O.focus({ preventScroll: !0 }),
          setTimeout(() => {
            var L;
            (L = getSelection()) == null || L.removeAllRanges();
          }),
          I !== null
            ? O.setAttribute("tabindex", I)
            : O.removeAttribute("tabindex");
      }
      if ((await Ve(), u)) {
        const O = c.hash && document.getElementById(c.hash.slice(1));
        b ? scrollTo(b.x, b.y) : O ? O.scrollIntoView() : scrollTo(0, 0);
      }
    } else await Ve();
    (u = !0), g.props.page && (D = g.props.page), h && h(), (m = !1);
  }
  function je(a) {
    var l, h;
    n = a.state;
    const c = document.querySelector("style[data-sveltekit]");
    c && c.remove(), (D = a.props.page);
    const p = fe();
    (S = new At({ target: r, props: { ...a.props, stores: z }, hydrate: !0 })),
      p();
    const i = {
      from: null,
      to: ce("to", {
        params: n.params,
        routeId: (h = (l = n.route) == null ? void 0 : l.id) != null ? h : null,
        url: new URL(location.href)
      }),
      type: "load"
    };
    d.after_navigate.forEach((g) => g(i)), (_ = !0);
  }
  async function ee({
    url: a,
    params: c,
    branch: p,
    status: i,
    error: l,
    route: h,
    form: g
  }) {
    var I;
    const E = p.filter(Boolean),
      k = {
        type: "loaded",
        state: { url: a, params: c, branch: p, error: l, route: h },
        props: { components: E.map((L) => L.node.component) }
      };
    g !== void 0 && (k.props.form = g);
    let b = {},
      v = !D;
    for (let L = 0; L < E.length; L += 1) {
      const N = E[L];
      (b = { ...b, ...N.data }),
        (v || !n.branch.some((P) => P === N)) &&
          ((k.props[`data_${L}`] = b),
          (v = v || Object.keys((I = N.data) != null ? I : {}).length > 0));
    }
    if (
      (v || (v = Object.keys(D.data).length !== Object.keys(b).length),
      !n.url || a.href !== n.url.href || n.error !== l || g !== void 0 || v)
    ) {
      k.props.page = {
        error: l,
        params: c,
        routeId: h && h.id,
        status: i,
        url: a,
        form: g,
        data: v ? b : D.data
      };
      const L = (N, P) => {
        Object.defineProperty(k.props.page, N, {
          get: () => {
            throw new Error(`$page.${N} has been replaced by $page.url.${P}`);
          }
        });
      };
      L("origin", "origin"), L("path", "pathname"), L("query", "searchParams");
    }
    return k;
  }
  async function ge({
    loader: a,
    parent: c,
    url: p,
    params: i,
    routeId: l,
    server_data_node: h
  }) {
    var b, v, O, I, L;
    let g = null;
    const E = {
        dependencies: new Set(),
        params: new Set(),
        parent: !1,
        url: !1
      },
      k = await a();
    if ((b = k.shared) != null && b.load) {
      let N = function (...$) {
        for (const w of $) {
          const { href: R } = new URL(w, p);
          E.dependencies.add(R);
        }
      };
      const P = {
        routeId: l,
        params: new Proxy(i, { get: ($, w) => (E.params.add(w), $[w]) }),
        data: (v = h == null ? void 0 : h.data) != null ? v : null,
        url: pt(p, () => {
          E.url = !0;
        }),
        async fetch($, w) {
          let R;
          $ instanceof Request
            ? ((R = $.url),
              (w = {
                body:
                  $.method === "GET" || $.method === "HEAD"
                    ? void 0
                    : await $.blob(),
                cache: $.cache,
                credentials: $.credentials,
                headers: $.headers,
                integrity: $.integrity,
                keepalive: $.keepalive,
                method: $.method,
                mode: $.mode,
                redirect: $.redirect,
                referrer: $.referrer,
                referrerPolicy: $.referrerPolicy,
                signal: $.signal,
                ...w
              }))
            : (R = $);
          const j = new URL(R, p).href;
          return N(j), _ ? yt(j, w) : _t(R, j, w);
        },
        setHeaders: () => {},
        depends: N,
        parent() {
          return (E.parent = !0), c();
        }
      };
      Object.defineProperties(P, {
        props: {
          get() {
            throw new Error(
              "@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693"
            );
          },
          enumerable: !1
        },
        session: {
          get() {
            throw new Error(
              "session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
            );
          },
          enumerable: !1
        },
        stuff: {
          get() {
            throw new Error(
              "@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693"
            );
          },
          enumerable: !1
        }
      }),
        (g = (O = await k.shared.load.call(null, P)) != null ? O : null),
        (g = g ? await Bt(g) : null);
    }
    return {
      node: k,
      loader: a,
      server: h,
      shared:
        (I = k.shared) != null && I.load
          ? { type: "data", data: g, uses: E }
          : null,
      data: (L = g != null ? g : h == null ? void 0 : h.data) != null ? L : null
    };
  }
  function Ne(a, c, p, i) {
    if (y) return !0;
    if (!p) return !1;
    if ((p.parent && c) || (p.url && a)) return !0;
    for (const l of p.params) if (i[l] !== n.params[l]) return !0;
    for (const l of p.dependencies) if (o.some((h) => h(new URL(l)))) return !0;
    return !1;
  }
  function _e(a, c) {
    var p, i;
    return (a == null ? void 0 : a.type) === "data"
      ? {
          type: "data",
          data: a.data,
          uses: {
            dependencies: new Set((p = a.uses.dependencies) != null ? p : []),
            params: new Set((i = a.uses.params) != null ? i : []),
            parent: !!a.uses.parent,
            url: !!a.uses.url
          }
        }
      : (a == null ? void 0 : a.type) === "skip" && c != null
      ? c
      : null;
  }
  async function Pe({ id: a, invalidating: c, url: p, params: i, route: l }) {
    var $;
    if ((s == null ? void 0 : s.id) === a) return s.promise;
    const { errors: h, layouts: g, leaf: E } = l,
      k = [...g, E];
    h.forEach((w) => (w == null ? void 0 : w().catch(() => {}))),
      k.forEach((w) => (w == null ? void 0 : w[1]().catch(() => {})));
    let b = null;
    const v = n.url ? a !== n.url.pathname + n.url.search : !1,
      O = k.reduce((w, R, j) => {
        var te;
        const A = n.branch[j],
          W =
            !!(R != null && R[0]) &&
            ((A == null ? void 0 : A.loader) !== R[1] ||
              Ne(
                v,
                w.some(Boolean),
                (te = A.server) == null ? void 0 : te.uses,
                i
              ));
        return w.push(W), w;
      }, []);
    if (O.some(Boolean)) {
      try {
        b = await He(p, O);
      } catch (w) {
        return oe({
          status: 500,
          error: ne(w, { url: p, params: i, routeId: l.id }),
          url: p,
          routeId: l.id
        });
      }
      if (b.type === "redirect") return b;
    }
    const I = b == null ? void 0 : b.nodes;
    let L = !1;
    const N = k.map(async (w, R) => {
      var te;
      if (!w) return;
      const j = n.branch[R],
        A = I == null ? void 0 : I[R];
      if (
        (!A || A.type === "skip") &&
        w[1] === (j == null ? void 0 : j.loader) &&
        !Ne(v, L, (te = j.shared) == null ? void 0 : te.uses, i)
      )
        return j;
      if (((L = !0), (A == null ? void 0 : A.type) === "error")) throw A;
      return ge({
        loader: w[1],
        url: p,
        params: i,
        routeId: l.id,
        parent: async () => {
          var Ce;
          const qe = {};
          for (let be = 0; be < R; be += 1)
            Object.assign(qe, (Ce = await N[be]) == null ? void 0 : Ce.data);
          return qe;
        },
        server_data_node: _e(
          A === void 0 && w[0] ? { type: "skip" } : A != null ? A : null,
          j == null ? void 0 : j.server
        )
      });
    });
    for (const w of N) w.catch(() => {});
    const P = [];
    for (let w = 0; w < k.length; w += 1)
      if (k[w])
        try {
          P.push(await N[w]);
        } catch (R) {
          if (R instanceof Me)
            return { type: "redirect", location: R.location };
          let j = 500,
            A;
          I != null && I.includes(R)
            ? ((j = ($ = R.status) != null ? $ : j), (A = R.error))
            : R instanceof Oe
            ? ((j = R.status), (A = R.body))
            : (A = ne(R, { params: i, url: p, routeId: l.id }));
          const W = await Ue(w, P, h);
          return W
            ? await ee({
                url: p,
                params: i,
                branch: P.slice(0, W.idx).concat(W.node),
                status: j,
                error: A,
                route: l
              })
            : await De(p, l.id, A, j);
        }
      else P.push(void 0);
    return await ee({
      url: p,
      params: i,
      branch: P,
      status: 200,
      error: null,
      route: l,
      form: c ? void 0 : null
    });
  }
  async function Ue(a, c, p) {
    for (; a--; )
      if (p[a]) {
        let i = a;
        for (; !c[i]; ) i -= 1;
        try {
          return {
            idx: i + 1,
            node: {
              node: await p[a](),
              loader: p[a],
              data: {},
              server: null,
              shared: null
            }
          };
        } catch {
          continue;
        }
      }
  }
  async function oe({ status: a, error: c, url: p, routeId: i }) {
    var b;
    const l = {},
      h = await $e();
    let g = null;
    if (h.server)
      try {
        const v = await He(p, [!0]);
        if (v.type !== "data" || (v.nodes[0] && v.nodes[0].type !== "data"))
          throw 0;
        g = (b = v.nodes[0]) != null ? b : null;
      } catch {
        (p.origin !== location.origin ||
          p.pathname !== location.pathname ||
          f) &&
          (await ie(p));
      }
    const E = await ge({
        loader: $e,
        url: p,
        params: l,
        routeId: i,
        parent: () => Promise.resolve({}),
        server_data_node: _e(g)
      }),
      k = {
        node: await Ie(),
        loader: Ie,
        shared: null,
        server: null,
        data: null
      };
    return await ee({
      url: p,
      params: l,
      branch: [E, k],
      status: a,
      error: c,
      route: null
    });
  }
  function ye(a, c) {
    if (Te(a)) return;
    const p = decodeURI(a.pathname.slice(e.length) || "/");
    for (const i of le) {
      const l = i.exec(p);
      if (l) {
        const h = new URL(a.origin + ct(a.pathname, t) + a.search + a.hash);
        return {
          id: h.pathname + h.search,
          invalidating: c,
          route: i,
          params: ft(l),
          url: h
        };
      }
    }
  }
  function Te(a) {
    return a.origin !== location.origin || !a.pathname.startsWith(e);
  }
  async function we({
    url: a,
    scroll: c,
    keepfocus: p,
    redirect_chain: i,
    details: l,
    type: h,
    delta: g,
    nav_token: E,
    accepted: k,
    blocked: b
  }) {
    var N, P, $, w;
    let v = !1;
    const O = ye(a, !1),
      I = {
        from: ce("from", {
          params: n.params,
          routeId:
            (P = (N = n.route) == null ? void 0 : N.id) != null ? P : null,
          url: n.url
        }),
        to: ce("to", {
          params: ($ = O == null ? void 0 : O.params) != null ? $ : null,
          routeId: (w = O == null ? void 0 : O.route.id) != null ? w : null,
          url: a
        }),
        type: h
      };
    g !== void 0 && (I.delta = g);
    const L = {
      ...I,
      cancel: () => {
        v = !0;
      }
    };
    if ((d.before_navigate.forEach((R) => R(L)), v)) {
      b();
      return;
    }
    ke(U),
      k(),
      _ && z.navigating.set(I),
      await Ae(O, a, i, { scroll: c, keepfocus: p, details: l }, E, () => {
        d.after_navigate.forEach((R) => R(I)), z.navigating.set(null);
      });
  }
  async function De(a, c, p, i) {
    return a.origin === location.origin &&
      a.pathname === location.pathname &&
      !f
      ? await oe({ status: i, error: p, url: a, routeId: c })
      : await ie(a);
  }
  function ie(a) {
    return (location.href = a.href), new Promise(() => {});
  }
  return {
    after_navigate: (a) => {
      Re(
        () => (
          d.after_navigate.push(a),
          () => {
            const c = d.after_navigate.indexOf(a);
            d.after_navigate.splice(c, 1);
          }
        )
      );
    },
    before_navigate: (a) => {
      Re(
        () => (
          d.before_navigate.push(a),
          () => {
            const c = d.before_navigate.indexOf(a);
            d.before_navigate.splice(c, 1);
          }
        )
      );
    },
    disable_scroll_handling: () => {
      (m || !_) && (u = !1);
    },
    goto: (a, c = {}) => x(a, c, []),
    invalidate: (a) => {
      if (a === void 0)
        throw new Error(
          "`invalidate()` (with no arguments) has been replaced by `invalidateAll()`"
        );
      if (typeof a == "function") o.push(a);
      else {
        const { href: c } = new URL(a, location.href);
        o.push((p) => p.href === c);
      }
      return ae();
    },
    invalidateAll: () => ((y = !0), ae()),
    prefetch: async (a) => {
      const c = new URL(a, Fe(document));
      await se(c);
    },
    prefetch_routes: async (a) => {
      const p = (a ? le.filter((i) => a.some((l) => i.exec(l))) : le).map((i) =>
        Promise.all(
          [...i.layouts, i.leaf].map((l) => (l == null ? void 0 : l[1]()))
        )
      );
      await Promise.all(p);
    },
    apply_action: async (a) => {
      if (a.type === "error") {
        const c = new URL(location.href),
          { branch: p, route: i } = n;
        if (!i) return;
        const l = await Ue(n.branch.length, p, i.errors);
        if (l) {
          const h = await ee({
            url: c,
            params: n.params,
            branch: p.slice(0, l.idx).concat(l.node),
            status: 500,
            error: a.error,
            route: i
          });
          n = h.state;
          const g = fe();
          S.$set(h.props), g();
        }
      } else if (a.type === "redirect")
        x(a.location, { invalidateAll: !0 }, []);
      else {
        const c = {
            form: a.data,
            page: { ...D, form: a.data, status: a.status }
          },
          p = fe();
        S.$set(c), p();
      }
    },
    _start_router: () => {
      (history.scrollRestoration = "manual"),
        addEventListener("beforeunload", (i) => {
          var g, E;
          let l = !1;
          const h = {
            from: ce("from", {
              params: n.params,
              routeId:
                (E = (g = n.route) == null ? void 0 : g.id) != null ? E : null,
              url: n.url
            }),
            to: null,
            type: "unload",
            cancel: () => (l = !0)
          };
          d.before_navigate.forEach((k) => k(h)),
            l
              ? (i.preventDefault(), (i.returnValue = ""))
              : (history.scrollRestoration = "auto");
        }),
        addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            ke(U);
            try {
              sessionStorage[We] = JSON.stringify(re);
            } catch {}
          }
        });
      const a = (i) => {
        const { url: l, options: h } = Je(i);
        if (l && h.prefetch) {
          if (Te(l)) return;
          se(l);
        }
      };
      let c;
      const p = (i) => {
        clearTimeout(c),
          (c = setTimeout(() => {
            var l;
            (l = i.target) == null ||
              l.dispatchEvent(
                new CustomEvent("sveltekit:trigger_prefetch", { bubbles: !0 })
              );
          }, 20));
      };
      addEventListener("touchstart", a),
        addEventListener("mousemove", p),
        addEventListener("sveltekit:trigger_prefetch", a),
        addEventListener("click", (i) => {
          if (
            i.button ||
            i.which !== 1 ||
            i.metaKey ||
            i.ctrlKey ||
            i.shiftKey ||
            i.altKey ||
            i.defaultPrevented
          )
            return;
          const { a: l, url: h, options: g } = Je(i);
          if (!l || !h) return;
          const E = l instanceof SVGAElement;
          if (
            !E &&
            h.protocol !== location.protocol &&
            !(h.protocol === "https:" || h.protocol === "http:")
          )
            return;
          const k = (l.getAttribute("rel") || "").split(/\s+/);
          if (
            l.hasAttribute("download") ||
            k.includes("external") ||
            g.reload ||
            (E ? l.target.baseVal : l.target)
          )
            return;
          const [b, v] = h.href.split("#");
          if (v !== void 0 && b === location.href.split("#")[0]) {
            (T = !0),
              ke(U),
              (n.url = h),
              z.page.set({ ...D, url: h }),
              z.page.notify();
            return;
          }
          we({
            url: h,
            scroll: g.noscroll ? Se() : null,
            keepfocus: !1,
            redirect_chain: [],
            details: { state: {}, replaceState: h.href === location.href },
            accepted: () => i.preventDefault(),
            blocked: () => i.preventDefault(),
            type: "link"
          });
        }),
        addEventListener("popstate", (i) => {
          if (i.state) {
            if (i.state[C] === U) return;
            const l = i.state[C] - U;
            we({
              url: new URL(location.href),
              scroll: re[i.state[C]],
              keepfocus: !1,
              redirect_chain: [],
              details: null,
              accepted: () => {
                U = i.state[C];
              },
              blocked: () => {
                history.go(-l);
              },
              type: "popstate",
              delta: l
            });
          }
        }),
        addEventListener("hashchange", () => {
          T &&
            ((T = !1),
            history.replaceState(
              { ...history.state, [C]: ++U },
              "",
              location.href
            ));
        });
      for (const i of document.querySelectorAll("link"))
        i.rel === "icon" && (i.href = i.href);
      addEventListener("pageshow", (i) => {
        i.persisted && z.navigating.set(null);
      });
    },
    _hydrate: async ({
      status: a,
      error: c,
      node_ids: p,
      params: i,
      routeId: l,
      data: h,
      form: g
    }) => {
      var b;
      f = !0;
      const E = new URL(location.href);
      let k;
      try {
        const v = p.map(async (O, I) => {
          const L = h[I];
          return ge({
            loader: me[O],
            url: E,
            params: i,
            routeId: l,
            parent: async () => {
              const N = {};
              for (let P = 0; P < I; P += 1)
                Object.assign(N, (await v[P]).data);
              return N;
            },
            server_data_node: _e(L)
          });
        });
        k = await ee({
          url: E,
          params: i,
          branch: await Promise.all(v),
          status: a,
          error: c,
          form: g,
          route: (b = le.find((O) => O.id === l)) != null ? b : null
        });
      } catch (v) {
        if (v instanceof Me) {
          await ie(new URL(v.location, location.href));
          return;
        }
        k = await oe({
          status: v instanceof Oe ? v.status : 500,
          error: ne(v, { url: E, params: i, routeId: l }),
          url: E,
          routeId: l
        });
      }
      je(k);
    }
  };
}
async function He(r, e) {
  const t = new URL(r);
  t.pathname = mt(r.pathname);
  const o = await he(t.href, {
      headers: {
        "x-sveltekit-invalidated": e.map((d) => (d ? "1" : "")).join(",")
      }
    }),
    s = await o.text();
  if (!o.ok) throw new Error(JSON.parse(s));
  return Kt(s);
}
function ne(r, e) {
  var t;
  return r instanceof Oe
    ? r.body
    : (t = Dt.handleError({ error: r, event: e })) != null
    ? t
    : { message: e.routeId != null ? "Internal Error" : "Not Found" };
}
const Ht = [
  "hash",
  "href",
  "host",
  "hostname",
  "origin",
  "pathname",
  "port",
  "protocol",
  "search",
  "searchParams",
  "toString",
  "toJSON"
];
function ce(r, e) {
  for (const t of Ht)
    Object.defineProperty(e, t, {
      get() {
        throw new Error(
          `The navigation shape changed - ${r}.${t} should now be ${r}.url.${t}`
        );
      },
      enumerable: !1
    });
  return e;
}
function fe() {
  return () => {};
}
async function Xt({
  env: r,
  hydrate: e,
  paths: t,
  target: o,
  trailing_slash: s
}) {
  it(t);
  const d = Mt({ target: o, base: t.base, trailing_slash: s });
  lt({ client: d }),
    e ? await d._hydrate(e) : d.goto(location.href, { replaceState: !0 }),
    d._start_router();
}
export { Xt as start };
