import {
  c as create_ssr_component,
  i as compute_rest_props,
  j as get_current_component,
  q as createEventDispatcher,
  b as subscribe,
  s as setContext,
  v as validate_component,
  r as globals,
  g as getContext,
  n as noop,
  e as escape,
  t as onDestroy,
  d as add_attribute,
  u as each,
  k as spread,
  w as escape_attribute_value,
  o as escape_object
} from "../../chunks/index.js";
import {
  f as forwardEventsBuilder,
  R as Render,
  a as Features,
  C as Container,
  H as Header,
  F as Footer
} from "../../chunks/Footer.js";
import { w as writable } from "../../chunks/index2.js";
import { c as clsx } from "../../chunks/Logo.js";
import { B as Button } from "../../chunks/Button.js";
import { getFirestore, addDoc, collection } from "firebase/firestore";
let id = 0;
function generateId() {
  return ++id;
}
function useId() {
  return generateId();
}
function resolveButtonType(props, ref) {
  if (props.type) return props.type;
  let tag = props.as ?? "button";
  if (typeof tag === "string" && tag.toLowerCase() === "button")
    return "button";
  if (ref && ref instanceof HTMLButtonElement) return "button";
  return void 0;
}
const { Object: Object_1$2 } = globals;
const TABS_CONTEXT_NAME = "headlessui-tabs-context";
function useTabsContext(component) {
  let context = getContext(TABS_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error(
      `<${component} /> is missing a parent <TabGroup /> component.`
    );
  }
  return context;
}
const TabGroup = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let slotProps;
    let $$restProps = compute_rest_props($$props, [
      "as",
      "use",
      "defaultIndex",
      "vertical",
      "manual"
    ]);
    let $listRef, $$unsubscribe_listRef;
    let { as = "div" } = $$props;
    let { use = [] } = $$props;
    let { defaultIndex = 0 } = $$props;
    let { vertical = false } = $$props;
    let { manual = false } = $$props;
    const forwardEvents = forwardEventsBuilder(get_current_component(), [
      "change"
    ]);
    const dispatch = createEventDispatcher();
    let selectedIndex = null;
    let tabs = [];
    let panels = [];
    let listRef = writable(null);
    $$unsubscribe_listRef = subscribe(listRef, (value) => ($listRef = value));
    let api = writable({
      selectedIndex,
      orientation: vertical ? "vertical" : "horizontal",
      activation: manual ? "manual" : "auto",
      tabs,
      panels,
      listRef,
      setSelectedIndex(index) {
        if (selectedIndex === index) return;
        selectedIndex = index;
        dispatch("change", index);
      },
      registerTab(tab) {
        if (tabs.includes(tab)) return;
        if (!$listRef) {
          tabs = [...tabs, tab];
          return;
        }
        let currentSelectedTab =
          selectedIndex !== null ? tabs[selectedIndex] : null;
        let orderMap = Array.from(
          $listRef.querySelectorAll('[id^="headlessui-tabs-tab-"]')
        ).reduce(
          (lookup, element, index) =>
            Object.assign(lookup, { [element.id]: index }),
          {}
        );
        let nextTabs = [...tabs, tab];
        nextTabs.sort((a, z) => orderMap[a.id] - orderMap[z.id]);
        tabs = nextTabs;
        selectedIndex = (() => {
          if (currentSelectedTab === null) return null;
          return tabs.indexOf(currentSelectedTab);
        })();
      },
      unregisterTab(tab) {
        tabs = tabs.filter((t) => t !== tab);
      },
      registerPanel(panel) {
        if (!panels.includes(panel)) panels = [...panels, panel];
      },
      unregisterPanel(panel) {
        panels = panels.filter((p) => p !== panel);
      }
    });
    setContext(TABS_CONTEXT_NAME, api);
    if ($$props.as === void 0 && $$bindings.as && as !== void 0)
      $$bindings.as(as);
    if ($$props.use === void 0 && $$bindings.use && use !== void 0)
      $$bindings.use(use);
    if (
      $$props.defaultIndex === void 0 &&
      $$bindings.defaultIndex &&
      defaultIndex !== void 0
    )
      $$bindings.defaultIndex(defaultIndex);
    if (
      $$props.vertical === void 0 &&
      $$bindings.vertical &&
      vertical !== void 0
    )
      $$bindings.vertical(vertical);
    if ($$props.manual === void 0 && $$bindings.manual && manual !== void 0)
      $$bindings.manual(manual);
    {
      api.update((obj) => {
        return {
          ...obj,
          selectedIndex,
          orientation: vertical ? "vertical" : "horizontal",
          activation: manual ? "manual" : "auto",
          tabs,
          panels
        };
      });
    }
    slotProps = { selectedIndex };
    $$unsubscribe_listRef();
    return `${validate_component(Render, "Render").$$render(
      $$result,
      Object_1$2.assign(
        $$restProps,
        { as },
        { slotProps },
        { use: [...use, forwardEvents] },
        { name: "TabGroup" }
      ),
      {},
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  }
);
const { Object: Object_1$1 } = globals;
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let myIndex;
  let selected;
  let myPanelRef;
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use", "disabled"]);
  let $api, $$unsubscribe_api;
  let $myPanelRef,
    $$unsubscribe_myPanelRef = noop,
    $$subscribe_myPanelRef = () => (
      $$unsubscribe_myPanelRef(),
      ($$unsubscribe_myPanelRef = subscribe(
        myPanelRef,
        ($$value) => ($myPanelRef = $$value)
      )),
      myPanelRef
    );
  let { as = "button" } = $$props;
  let { use = [] } = $$props;
  let { disabled = false } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = useTabsContext("Tab");
  $$unsubscribe_api = subscribe(api, (value) => ($api = value));
  let id2 = `headlessui-tabs-tab-${useId()}`;
  let tabRef = null;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    myIndex = tabRef ? $api.tabs.indexOf(tabRef) : -1;
    selected = myIndex === $api.selectedIndex;
    $$subscribe_myPanelRef((myPanelRef = $api.panels[myIndex]?.ref));
    propsWeControl = {
      id: id2,
      role: "tab",
      type: resolveButtonType({ type: $$props.type, as }, tabRef),
      "aria-controls": $myPanelRef ? $api.panels[myIndex]?.id : void 0,
      "aria-selected": selected,
      tabIndex: selected ? 0 : -1,
      disabled: disabled ? true : void 0
    };
    slotProps = { selected };
    $$rendered = `${validate_component(Render, "Render").$$render(
      $$result,
      Object_1$1.assign(
        { ...$$restProps, ...propsWeControl },
        { as },
        { slotProps },
        { use: [...use, forwardEvents] },
        { name: "Tab" },
        { el: tabRef }
      ),
      {
        el: ($$value) => {
          tabRef = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_myPanelRef();
  return $$rendered;
});
const TabList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use"]);
  let $api, $$unsubscribe_api;
  let $listRef, $$unsubscribe_listRef;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = useTabsContext("TabList");
  $$unsubscribe_api = subscribe(api, (value) => ($api = value));
  let listRef = $api.listRef;
  $$unsubscribe_listRef = subscribe(listRef, (value) => ($listRef = value));
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    propsWeControl = {
      role: "tablist",
      "aria-orientation": $api.orientation
    };
    slotProps = { selectedIndex: $api.selectedIndex };
    $$rendered = `${validate_component(Render, "Render").$$render(
      $$result,
      Object.assign(
        { ...$$restProps, ...propsWeControl },
        { as },
        { slotProps },
        { use: [...use, forwardEvents] },
        { name: "TabList" },
        { el: $listRef }
      ),
      {
        el: ($$value) => {
          $listRef = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_listRef();
  return $$rendered;
});
const TabPanels = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let slotProps;
    let $$restProps = compute_rest_props($$props, ["as", "use"]);
    let $api, $$unsubscribe_api;
    let { as = "div" } = $$props;
    let { use = [] } = $$props;
    const forwardEvents = forwardEventsBuilder(get_current_component());
    let api = useTabsContext("TabPanels");
    $$unsubscribe_api = subscribe(api, (value) => ($api = value));
    if ($$props.as === void 0 && $$bindings.as && as !== void 0)
      $$bindings.as(as);
    if ($$props.use === void 0 && $$bindings.use && use !== void 0)
      $$bindings.use(use);
    slotProps = { selectedIndex: $api.selectedIndex };
    $$unsubscribe_api();
    return `${validate_component(Render, "Render").$$render(
      $$result,
      Object.assign(
        $$restProps,
        { as },
        { slotProps },
        { use: [...use, forwardEvents] },
        { name: "TabPanels" }
      ),
      {},
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  }
);
const { Object: Object_1 } = globals;
const TabPanel = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let panelData;
    let myIndex;
    let selected;
    let propsWeControl;
    let slotProps;
    let $$restProps = compute_rest_props($$props, ["as", "use"]);
    let $api, $$unsubscribe_api;
    let $elementRef, $$unsubscribe_elementRef;
    let { as = "div" } = $$props;
    let { use = [] } = $$props;
    const forwardEvents = forwardEventsBuilder(get_current_component());
    let elementRef = writable(null);
    $$unsubscribe_elementRef = subscribe(
      elementRef,
      (value) => ($elementRef = value)
    );
    let api = useTabsContext("TabPanel");
    $$unsubscribe_api = subscribe(api, (value) => ($api = value));
    let id2 = `headlessui-tabs-panel-${useId()}`;
    if ($$props.as === void 0 && $$bindings.as && as !== void 0)
      $$bindings.as(as);
    if ($$props.use === void 0 && $$bindings.use && use !== void 0)
      $$bindings.use(use);
    let $$settled;
    let $$rendered;
    do {
      $$settled = true;
      panelData = { id: id2, ref: elementRef };
      myIndex = $api.panels.indexOf(panelData);
      selected = myIndex === $api.selectedIndex;
      propsWeControl = {
        id: id2,
        role: "tabpanel",
        "aria-labelledby": $api.tabs[myIndex]?.id,
        tabIndex: selected ? 0 : -1
      };
      slotProps = { selected };
      $$rendered = `${validate_component(Render, "Render").$$render(
        $$result,
        Object_1.assign(
          { ...$$restProps, ...propsWeControl },
          { as },
          { use: [...use, forwardEvents] },
          { name: "TabPanel" },
          { slotProps },
          { visible: selected },
          {
            features: Features.RenderStrategy | Features.Static
          },
          { el: $elementRef }
        ),
        {
          el: ($$value) => {
            $elementRef = $$value;
            $$settled = false;
          }
        },
        {
          default: () => {
            return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
          }
        }
      )}`;
    } while (!$$settled);
    $$unsubscribe_api();
    $$unsubscribe_elementRef();
    return $$rendered;
  }
);
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Container, "Container").$$render(
    $$result,
    {
      classNames: "pt-20 pb-16 text-center lg:pt-32"
    },
    {},
    {
      default: () => {
        return `<h1 class="${"mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"}">Helping teams &amp; organizations${escape(
          " "
        )}
    <span class="${"relative whitespace-nowrap text-blue-600"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 418 42"}" class="${"absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"}" preserveAspectRatio="${"none"}"><path d="${"M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"}"></path></svg>
      <span class="${"relative"}">perform better!</span></span></h1>
  <p class="${"mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700"}">Our technologies assist from onboarding to day-to-day work.
  </p>`;
      }
    }
  )}`;
});
let backgroundImage$2 = "images/background-features.jpg";
let screenshotExpenses = "images/screenshots/expenses.png";
let screenshotPayroll = "images/screenshots/payroll.png";
let screenshotReporting = "images/screenshots/reporting.png";
let screenshotVatReturns = "images/screenshots/vat-returns.png";
const PrimaryFeatures = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $isVerticalWritableStore, $$unsubscribe_isVerticalWritableStore;
    const features = [
      {
        title: "Digital Handbook",
        description:
          "Employee's central go-to for information. It has everything and if not, they can easily contribute to it.",
        image: screenshotPayroll
      },
      {
        title: "Best Practices",
        description:
          "Pre-populate your handbook with best practices in organization, product management and software development. Modify to meet your needs.",
        image: screenshotExpenses
      },
      {
        title: "Training & Onboarding",
        description:
          "Training material and videos are avaiable for some of the best practices. Use it for onboarding and yearly training.",
        image: screenshotVatReturns
      },
      {
        title: "OKRs Tool",
        description:
          "Our OKR tool integrates with your handbook, so every team and departments OKRs are viewable.",
        image: screenshotReporting
      }
    ];
    let lgMediaQuery;
    const isVerticalWritableStore = writable();
    $$unsubscribe_isVerticalWritableStore = subscribe(
      isVerticalWritableStore,
      (value) => ($isVerticalWritableStore = value)
    );
    function onMediaQueryChange(event) {
      isVerticalWritableStore.set(event.matches ? "vertical" : "horizontal");
    }
    onDestroy(() => {
      lgMediaQuery?.removeEventListener("change", onMediaQueryChange);
    });
    $$unsubscribe_isVerticalWritableStore();
    return `<section id="${"features"}" aria-label="${"Features for running your books"}" class="${"relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"}"><img class="${"absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"}"${add_attribute(
      "src",
      backgroundImage$2,
      0
    )} alt="${""}"${add_attribute("width", 2245, 0)}${add_attribute(
      "height",
      1636,
      0
    )}>
  ${validate_component(Container, "Container").$$render(
    $$result,
    { classNames: "relative" },
    {},
    {
      default: () => {
        return `<div class="${"max-w-2xl md:mx-auto md:text-center xl:max-w-none"}"><h2 class="${"font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl"}">Tools to Drive Better Product Development and More...
      </h2>
      <p class="${"mt-6 text-lg tracking-tight text-blue-100"}">From employee onboarding, training, digital handbook, product &amp;
        development best practices, OKRs tool and much more!
      </p></div>
    ${validate_component(TabGroup, "TabGroup").$$render(
      $$result,
      {
        as: "div",
        class:
          "mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0",
        vertical: $isVerticalWritableStore === "vertical"
      },
      {},
      {
        default: () => {
          return `<div class="${"-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5"}">${validate_component(
            TabList,
            "TabList"
          ).$$render(
            $$result,
            {
              class:
                "relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
            },
            {},
            {
              default: ({ selectedIndex }) => {
                return `${each(features, (feature, featureIndex) => {
                  return `<div${add_attribute(
                    "class",
                    clsx(
                      "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6",
                      selectedIndex === featureIndex
                        ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                        : "hover:bg-white/10 lg:hover:bg-white/5"
                    ),
                    0
                  )}><h3>${validate_component(Tab, "Tab").$$render(
                    $$result,
                    {
                      class: clsx(
                        "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                        selectedIndex === featureIndex
                          ? "text-blue-600 lg:text-white"
                          : "text-blue-100 hover:text-white lg:text-white"
                      )
                    },
                    {},
                    {
                      default: () => {
                        return `<span class="${"absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl"}"></span>
                  ${escape(feature.title)}
                `;
                      }
                    }
                  )}</h3>
              <p${add_attribute(
                "class",
                clsx(
                  "mt-2 hidden text-sm lg:block",
                  selectedIndex === featureIndex
                    ? "text-white"
                    : "text-blue-100 group-hover:text-white"
                ),
                0
              )}>${escape(feature.description)}</p>
            </div>`;
                })}`;
              }
            }
          )}</div>
      ${validate_component(TabPanels, "TabPanels").$$render(
        $$result,
        { class: "lg:col-span-7" },
        {},
        {
          default: () => {
            return `${each(features, (feature) => {
              return `${validate_component(TabPanel, "TabPanel").$$render(
                $$result,
                {},
                {},
                {
                  default: () => {
                    return `<div class="${"relative sm:px-6 lg:hidden"}"><div class="${"absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"}"></div>
              <p class="${"relative mx-auto max-w-2xl text-base text-white sm:text-center"}">${escape(
                      feature.description
                    )}
              </p></div>
            <div class="${"mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]"}"><img class="${"w-full"}"${add_attribute(
                      "src",
                      feature.image,
                      0
                    )} alt="${""}" sizes="${"(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"}"></div>
          `;
                  }
                }
              )}`;
            })}`;
          }
        }
      )}`;
        }
      }
    )}`;
      }
    }
  )}</section>`;
  }
);
const Feature = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { feature } = $$props;
  let { isActive } = $$props;
  let { classNames } = $$props;
  let { props = {} } = $$props;
  if ($$props.feature === void 0 && $$bindings.feature && feature !== void 0)
    $$bindings.feature(feature);
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  if (
    $$props.classNames === void 0 &&
    $$bindings.classNames &&
    classNames !== void 0
  )
    $$bindings.classNames(classNames);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(
          clsx(classNames, !isActive && "opacity-75 hover:opacity-100")
        )
      },
      escape_object(props)
    ],
    {}
  )}><div${add_attribute(
    "class",
    clsx("w-9 rounded-lg", isActive ? "bg-blue-600" : "bg-slate-500"),
    0
  )}><svg aria-hidden="${"true"}" class="${"h-9 w-9"}" fill="${"none"}"><!-- HTML_TAG_START -->${feature.icon()}<!-- HTML_TAG_END --></svg></div>
  <h3${add_attribute(
    "class",
    clsx(
      "mt-6 text-sm font-medium",
      isActive ? "text-blue-600" : "text-slate-600"
    ),
    0
  )}>${slots.default ? slots.default({}) : ``}</h3>
  <p class="${"mt-2 font-display text-xl text-slate-900"}">${escape(
    feature.summary
  )}</p>
  <p class="${"mt-4 text-sm text-slate-600"}">${escape(
    feature.description
  )}</p></div>`;
});
const FeaturesDesktop = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { features } = $$props;
    if (
      $$props.features === void 0 &&
      $$bindings.features &&
      features !== void 0
    )
      $$bindings.features(features);
    return `${validate_component(TabGroup, "TabGroup").$$render(
      $$result,
      {
        as: "div",
        class: "hidden lg:mt-20 lg:block"
      },
      {},
      {
        default: ({ selectedIndex }) => {
          return `${validate_component(TabList, "TabList").$$render(
            $$result,
            { class: "grid grid-cols-3 gap-x-8" },
            {},
            {
              default: () => {
                return `${each(features, (feature, featureIndex) => {
                  return `${validate_component(Feature, "Feature").$$render(
                    $$result,
                    {
                      feature: { ...feature },
                      isActive: featureIndex === selectedIndex,
                      classNames: "relative"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Tab, "Tab").$$render(
                          $$result,
                          {
                            class: "[&:not(:focus-visible)]:focus:outline-none"
                          },
                          {},
                          {
                            default: () => {
                              return `<span class="${"absolute inset-0"}"></span>
          ${escape(feature.name)}
        `;
                            }
                          }
                        )}
      `;
                      }
                    }
                  )}`;
                })}`;
              }
            }
          )}
  ${validate_component(TabPanels, "TabPanels").$$render(
    $$result,
    {
      class:
        "relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16"
    },
    {},
    {
      default: () => {
        return `<div class="${"-mx-5 flex"}">${each(
          features,
          (feature, featureIndex) => {
            return `${validate_component(TabPanel, "TabPanel").$$render(
              $$result,
              {
                class: clsx(
                  "px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none",
                  featureIndex !== selectedIndex && "opacity-60"
                ),
                style: `{ transform: translateX(-${
                  (selectedIndex === null ? 0 : selectedIndex) * 100
                }%) }`,
                "aria-hidden": featureIndex !== selectedIndex
              },
              {},
              {
                default: () => {
                  return `<div class="${"w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"}"><img class="${"w-full"}"${add_attribute(
                    "src",
                    feature.image,
                    0
                  )} alt="${""}" sizes="${"52.75rem"}"></div>
        `;
                }
              }
            )}`;
          }
        )}</div>
    <div class="${"pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10"}"></div>`;
      }
    }
  )}`;
        }
      }
    )}`;
  }
);
const FeaturesMobile = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { features } = $$props;
    if (
      $$props.features === void 0 &&
      $$bindings.features &&
      features !== void 0
    )
      $$bindings.features(features);
    return `<div class="${"-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden"}">${each(
      features,
      (feature) => {
        return `<div>${validate_component(Feature, "Feature").$$render(
          $$result,
          {
            feature,
            classNames: "mx-auto max-w-2xl",
            isActive: true
          },
          {},
          {
            default: () => {
              return `feature.name`;
            }
          }
        )}
      <div class="${"relative mt-10 pb-10"}"><div class="${"absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6"}"></div>
        <div class="${"relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"}"><img class="${"w-full"}"${add_attribute(
          "src",
          feature.image,
          0
        )} alt="${""}" sizes="${"52.75rem"}">
        </div></div>
    </div>`;
      }
    )}</div>`;
  }
);
let screenshotContacts = "images/screenshots/contacts.png";
let screenshotInventory = "images/screenshots/inventory.png";
let screenshotProfitLoss = "images/screenshots/profit-loss.png";
const SecondaryFeatures = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    const features = [
      {
        name: "Reporting",
        summary:
          "Stay on top of things with always up-to-date reporting features.",
        description:
          "We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.",
        image: screenshotProfitLoss,
        icon: function ReportingIcon() {
          let id2 = "testme";
          return `
          <defs>
            <linearGradient id="t123" x1="11.5" y1="18" x2="36" y2="15.5" gradientUnits="userSpaceOnUse">
              <stop offset=".194" stop-color="#fff" />
              <stop offset="1" stop-color="#6692F1" />
            </linearGradient>
          </defs>
          <path d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5" stroke="url(#${id2})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
        }
      },
      {
        name: "Inventory",
        summary:
          "Never lose track of what’s in stock with accurate inventory tracking.",
        description:
          "We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.",
        image: screenshotInventory,
        icon: function InventoryIcon() {
          return `
          <path
            opacity=".5"
            d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="#fff"
          />
          <path
            opacity=".3"
            d="M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="#fff"
          />
          <path
            d="M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="#fff"
          />
      `;
        }
      },
      {
        name: "Contacts",
        summary:
          "Organize all of your contacts, service providers, and invoices in one place.",
        description:
          "This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.",
        image: screenshotContacts,
        icon: function ContactsIcon() {
          return `
          <path
            opacity=".5"
            d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
            fill="#fff"
          />
          <path
            d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z"
            fill="#fff"
          />
      `;
        }
      }
    ];
    return `<section id="${"secondary-features"}" aria-label="${"Features for simplifying everyday business tasks"}" class="${"pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32"}">${validate_component(
      Container,
      "Container"
    ).$$render(
      $$result,
      {},
      {},
      {
        default: () => {
          return `<div class="${"mx-auto max-w-2xl md:text-center"}"><h2 class="${"font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"}">Simplify everyday business tasks.
      </h2>
      <p class="${"mt-4 text-lg tracking-tight text-slate-700"}">Because you’d probably be a little confused if we suggested you
        complicate your everyday business tasks instead.
      </p></div>
    ${validate_component(FeaturesMobile, "FeaturesMobile").$$render(
      $$result,
      { features },
      {},
      {}
    )}
    ${validate_component(FeaturesDesktop, "FeaturesDesktop").$$render(
      $$result,
      { features },
      {},
      {}
    )}`;
        }
      }
    )}</section>`;
  }
);
let backgroundImage$1 = "images/background-call-to-action.jpg";
const CallToAction = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    return `<section id="${"get-started-today"}" class="${"relative overflow-hidden bg-blue-600 py-32"}"><img class="${"absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"}"${add_attribute(
      "src",
      backgroundImage$1,
      0
    )} alt="${""}"${add_attribute("width", 2347, 0)}${add_attribute(
      "height",
      1244,
      0
    )}>
  ${validate_component(Container, "Container").$$render(
    $$result,
    { classNames: "relative" },
    {},
    {
      default: () => {
        return `<div class="${"mx-auto max-w-lg text-center"}"><h2 class="${"font-display text-3xl tracking-tight text-white sm:text-4xl"}">Get started today
      </h2>
      <p class="${"mt-4 text-lg tracking-tight text-white"}">It’s time to take control of your books. Buy our software so you can
        feel like you’re doing something productive.
      </p>
      ${validate_component(Button, "Button").$$render(
        $$result,
        {
          href: "/register",
          color: "white",
          classNames: "mt-10"
        },
        {},
        {
          default: () => {
            return `Get 6 months free
      `;
          }
        }
      )}</div>`;
      }
    }
  )}</section>`;
  }
);
const QuoteIcon = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { props = {} } = $$props;
    if ($$props.props === void 0 && $$bindings.props && props !== void 0)
      $$bindings.props(props);
    return `<svg${spread(
      [
        { "aria-hidden": "true" },
        { width: escape_attribute_value(105) },
        { height: escape_attribute_value(78) },
        escape_object(props)
      ],
      {}
    )}><path d="${"M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"}"></path></svg>`;
  }
);
let avatarImage1 = "images/avatars/avatar-1.png";
let avatarImage2 = "images/avatars/avatar-2.png";
let avatarImage3 = "images/avatars/avatar-3.png";
let avatarImage4 = "images/avatars/avatar-4.png";
let avatarImage5 = "images/avatars/avatar-5.png";
const Testimonials = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    const testimonials = [
      [
        {
          content:
            "TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.",
          author: {
            name: "Sheryl Berge",
            role: "CEO at Lynch LLC",
            image: avatarImage1
          }
        },
        {
          content:
            "I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.",
          author: {
            name: "Amy Hahn",
            role: "Director at Velocity Industries",
            image: avatarImage4
          }
        }
      ],
      [
        {
          content:
            "The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.",
          author: {
            name: "Leland Kiehn",
            role: "Founder of Kiehn and Sons",
            image: avatarImage5
          }
        },
        {
          content:
            "There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it.",
          author: {
            name: "Erin Powlowski",
            role: "COO at Armstrong Inc",
            image: avatarImage2
          }
        }
      ],
      [
        {
          content:
            "I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.",
          author: {
            name: "Peter Renolds",
            role: "Founder of West Inc",
            image: avatarImage3
          }
        },
        {
          content:
            "This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.",
          author: {
            name: "Amy Hahn",
            role: "Director at Velocity Industries",
            image: avatarImage4
          }
        }
      ]
    ];
    return `<section id="${"testimonials"}" aria-label="${"What our customers are saying"}" class="${"bg-slate-50 py-20 sm:py-32"}">${validate_component(
      Container,
      "Container"
    ).$$render(
      $$result,
      {},
      {},
      {
        default: () => {
          return `<div class="${"mx-auto max-w-2xl md:text-center"}"><h2 class="${"font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"}">Loved by businesses worldwide.
      </h2>
      <p class="${"mt-4 text-lg tracking-tight text-slate-700"}">Our software is so simple that people can’t help but fall in love with
        it. Simplicity is easy when you just skip tons of mission-critical
        features.
      </p></div>
    <ul class="${"mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"}">${each(
            testimonials,
            (column, columnIndex) => {
              return `<li><ul class="${"flex flex-col gap-y-6 sm:gap-y-8"}">${each(
                column,
                (testimonial, testimonialIndex) => {
                  return `<li><figure class="${"relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"}">${validate_component(
                    QuoteIcon,
                    "QuoteIcon"
                  ).$$render(
                    $$result,
                    {
                      props: {
                        class: "absolute top-6 left-6 fill-slate-100"
                      }
                    },
                    {},
                    {}
                  )}
                  <blockquote class="${"relative"}"><p class="${"text-lg tracking-tight text-slate-900"}">${escape(
                    testimonial.content
                  )}
                    </p></blockquote>
                  <figcaption class="${"relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"}"><div><div class="${"font-display text-base text-slate-900"}">${escape(
                    testimonial.author.name
                  )}</div>
                      <div class="${"mt-1 text-sm text-slate-500"}">${escape(
                    testimonial.author.role
                  )}
                      </div></div>
                    <div class="${"overflow-hidden rounded-full bg-slate-50"}"><img class="${"h-14 w-14 object-cover"}"${add_attribute(
                    "src",
                    testimonial.author.image,
                    0
                  )} alt="${""}"${add_attribute("width", 56, 0)}${add_attribute(
                    "height",
                    56,
                    0
                  )}></div>
                  </figcaption></figure>
              </li>`;
                }
              )}</ul>
        </li>`;
            }
          )}</ul>`;
        }
      }
    )}</section>`;
  }
);
const SwirlyDoodle = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { classNames } = $$props;
    if (
      $$props.classNames === void 0 &&
      $$bindings.classNames &&
      classNames !== void 0
    )
      $$bindings.classNames(classNames);
    return `<svg aria-hidden="${"true"}" viewBox="${"0 0 281 40"}"${add_attribute(
      "class",
      classNames,
      0
    )} preserveAspectRatio="${"none"}"><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"}"></path></svg>`;
  }
);
const PricingCheckIcon = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { classNames } = $$props;
    if (
      $$props.classNames === void 0 &&
      $$bindings.classNames &&
      classNames !== void 0
    )
      $$bindings.classNames(classNames);
    return `<svg aria-hidden="${"true"}"${add_attribute(
      "class",
      clsx("h-6 w-6 flex-none fill-current stroke-current", classNames),
      0
    )}><path d="${"M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"}"${add_attribute(
      "stroke-width",
      0,
      0
    )}></path><circle${add_attribute("cx", 12, 0)}${add_attribute(
      "cy",
      12,
      0
    )}${add_attribute("r", 8.25, 0)} fill="${"none"}"${add_attribute(
      "stroke-width",
      1.5,
      0
    )} stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></circle></svg>`;
  }
);
const PricingPlan = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { name } = $$props;
    let { price } = $$props;
    let { description } = $$props;
    let { href } = $$props;
    let { features } = $$props;
    let { featured = false } = $$props;
    if ($$props.name === void 0 && $$bindings.name && name !== void 0)
      $$bindings.name(name);
    if ($$props.price === void 0 && $$bindings.price && price !== void 0)
      $$bindings.price(price);
    if (
      $$props.description === void 0 &&
      $$bindings.description &&
      description !== void 0
    )
      $$bindings.description(description);
    if ($$props.href === void 0 && $$bindings.href && href !== void 0)
      $$bindings.href(href);
    if (
      $$props.features === void 0 &&
      $$bindings.features &&
      features !== void 0
    )
      $$bindings.features(features);
    if (
      $$props.featured === void 0 &&
      $$bindings.featured &&
      featured !== void 0
    )
      $$bindings.featured(featured);
    return `<section${add_attribute(
      "class",
      clsx(
        "flex flex-col rounded-3xl px-6 sm:px-8",
        featured ? "order-first bg-blue-600 py-8 lg:order-none" : "lg:py-8"
      ),
      0
    )}><h3 class="${"mt-5 font-display text-lg text-white"}">${escape(
      name
    )}</h3>
  <p${add_attribute(
    "class",
    clsx("mt-2 text-base", featured ? "text-white" : "text-slate-400"),
    0
  )}>${escape(description)}</p>
  <p class="${"order-first font-display text-5xl font-light tracking-tight text-white"}">${escape(
      price
    )}</p>
  <ul${add_attribute(
    "class",
    clsx(
      "order-last mt-10 flex flex-col gap-y-3 text-sm",
      featured ? "text-white" : "text-slate-200"
    ),
    0
  )}>${each(features, (feature) => {
      return `<li class="${"flex"}">${validate_component(
        PricingCheckIcon,
        "PricingCheckIcon"
      ).$$render(
        $$result,
        {
          classNames: featured ? "text-white" : "text-slate-400"
        },
        {},
        {}
      )}
        <span class="${"ml-4"}">${escape(feature)}</span>
      </li>`;
    })}</ul>
  ${validate_component(Button, "Button").$$render(
    $$result,
    {
      href,
      variant: featured ? "solid" : "outline",
      color: "white",
      classNames: "mt-8",
      props: {
        "aria-label": `Get started with the ${name} plan for ${price}`
      }
    },
    {},
    {
      default: () => {
        return `Get started
  `;
      }
    }
  )}</section>`;
  }
);
const Pricing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section id="${"pricing"}" aria-label="${"Pricing"}" class="${"bg-slate-900 py-20 sm:py-32"}">${validate_component(
    Container,
    "Container"
  ).$$render(
    $$result,
    {},
    {},
    {
      default: () => {
        return `<div class="${"md:text-center"}"><h2 class="${"font-display text-3xl tracking-tight text-white sm:text-4xl"}"><span class="${"relative whitespace-nowrap"}">${validate_component(
          SwirlyDoodle,
          "SwirlyDoodle"
        ).$$render(
          $$result,
          {
            classNames: "absolute top-1/2 left-0 h-[1em] w-full fill-blue-400"
          },
          {},
          {}
        )}
          <span class="${"relative"}">Simple pricing,</span>
        </span>${escape(" ")}
        for everyone.
      </h2>
      <p class="${"mt-4 text-lg text-slate-400"}">It doesn’t matter what size your business is, our software won’t work
        well for you.
      </p></div>
    <div class="${"-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8"}">${validate_component(
          PricingPlan,
          "PricingPlan"
        ).$$render(
          $$result,
          {
            name: "Starter",
            price: "$9",
            description:
              "Good for anyone who is self-employed and just getting started.",
            href: "/register",
            features: [
              "Send 10 quotes and invoices",
              "Connect up to 2 bank accounts",
              "Track up to 15 expenses per month",
              "Manual payroll support",
              "Export up to 3 reports"
            ]
          },
          {},
          {}
        )}
      ${validate_component(PricingPlan, "PricingPlan").$$render(
        $$result,
        {
          featured: true,
          name: "Small business",
          price: "$15",
          description: "Perfect for small / medium sized businesses.",
          href: "/register",
          features: [
            "Send 25 quotes and invoices",
            "Connect up to 5 bank accounts",
            "Track up to 50 expenses per month",
            "Automated payroll support",
            "Export up to 12 reports",
            "Bulk reconcile transactions",
            "Track in multiple currencies"
          ]
        },
        {},
        {}
      )}
      ${validate_component(PricingPlan, "PricingPlan").$$render(
        $$result,
        {
          name: "Enterprise",
          price: "$39",
          description: "For even the biggest enterprise companies.",
          href: "/register",
          features: [
            "Send unlimited quotes and invoices",
            "Connect up to 15 bank accounts",
            "Track up to 200 expenses per month",
            "Automated payroll support",
            "Export up to 25 reports, including TPS"
          ]
        },
        {},
        {}
      )}</div>`;
      }
    }
  )}</section>`;
});
let backgroundImage = "images/background-faqs.jpg";
const Faqs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const faqs = [
    [
      {
        question: "Does TaxPal handle VAT?",
        answer:
          "Well no, but if you move your company offshore you can probably ignore it."
      },
      {
        question: "Can I pay for my subscription via purchase order?",
        answer: "Absolutely, we are happy to take your money in all forms."
      },
      {
        question: "How do I apply for a job at TaxPal?",
        answer:
          "We only hire our customers, so subscribe for a minimum of 6 months and then let’s talk."
      }
    ],
    [
      {
        question: "What was that testimonial about tax fraud all about?",
        answer:
          "TaxPal is just a software application, ultimately your books are your responsibility."
      },
      {
        question:
          "TaxPal sounds horrible but why do I still feel compelled to purchase?",
        answer:
          "This is the power of excellent visual design. You just can’t resist it, no matter how poorly it actually functions."
      },
      {
        question:
          "I found other companies called TaxPal, are you sure you can use this name?",
        answer:
          "Honestly not sure at all. We haven’t actually incorporated or anything, we just thought it sounded cool and made this website."
      }
    ],
    [
      {
        question: "How do you generate reports?",
        answer:
          "You just tell us what data you need a report for, and we get our kids to create beautiful charts for you using only the finest crayons."
      },
      {
        question: "Can we expect more inventory features?",
        answer: "In life it’s really better to never expect anything at all."
      },
      {
        question: "I lost my password, how do I get into my account?",
        answer:
          "Send us an email and we will send you a copy of our latest password spreadsheet so you can find your information."
      }
    ]
  ];
  return `<section id="${"faq"}" aria-labelledby="${"faq-title"}" class="${"relative overflow-hidden bg-slate-50 py-20 sm:py-32"}"><img class="${"absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"}"${add_attribute(
    "src",
    backgroundImage,
    0
  )} alt="${""}"${add_attribute("width", 1558, 0)}${add_attribute(
    "height",
    946,
    0
  )}>
  ${validate_component(Container, "Container").$$render(
    $$result,
    { classNames: "relative" },
    {},
    {
      default: () => {
        return `<div class="${"mx-auto max-w-2xl lg:mx-0"}"><h2 id="${"faq-title"}" class="${"font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"}">Frequently asked questions
      </h2>
      <p class="${"mt-4 text-lg tracking-tight text-slate-700"}">If you can’t find what you’re looking for, email our support team and if
        you’re lucky someone will get back to you.
      </p></div>
    <ul class="${"mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"}">${each(
          faqs,
          (column) => {
            return `<li><ul class="${"flex flex-col gap-y-8"}">${each(
              column,
              (faq) => {
                return `<li><h3 class="${"font-display text-lg leading-7 text-slate-900"}">${escape(
                  faq.question
                )}</h3>
                <p class="${"mt-4 text-sm text-slate-700"}">${escape(
                  faq.answer
                )}</p>
              </li>`;
              }
            )}</ul>
        </li>`;
          }
        )}</ul>`;
      }
    }
  )}</section>`;
});
const Mail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 20 20" },
      { fill: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$restProps)
    ],
    {}
  )}>${
    slots.default ? slots.default({}) : ``
  }<path d="${"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}"></path><path d="${"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"}"></path></svg>`;
});
const canSubmitEmail = writable(true);
const EmailRibbon = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $canSubmitEmail, $$unsubscribe_canSubmitEmail;
    $$unsubscribe_canSubmitEmail = subscribe(
      canSubmitEmail,
      (value) => ($canSubmitEmail = value)
    );
    let emailEl;
    let { addEmailFunc } = $$props;
    onDestroy(() => {
      canSubmitEmail.update((n) => true);
    });
    if (
      $$props.addEmailFunc === void 0 &&
      $$bindings.addEmailFunc &&
      addEmailFunc !== void 0
    )
      $$bindings.addEmailFunc(addEmailFunc);
    $$unsubscribe_canSubmitEmail();
    return `${
      $canSubmitEmail
        ? `${validate_component(Container, "Container").$$render(
            $$result,
            { classNames: "pt-16 pb-16 text-center " },
            {},
            {
              default: () => {
                return `<div class="${"mt-10 grow flex-wrap justify-center gap-x-16 text-xl"}">Interested in signing up for notifications?
      <div class="${"flex grow justify-center"}"><form class="${"group mt-5 flex"}"><div class="${"relative mt-1 flex flex-row rounded-md shadow-sm"}"><div class="${"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"}">${validate_component(
                  Mail,
                  "MailIcon"
                ).$$render(
                  $$result,
                  {
                    class: "h-5 w-5 text-gray-400",
                    "aria-hidden": "true"
                  },
                  {},
                  {}
                )}</div>
            <input required type="${"email"}" name="${"emailInput"}" id="${"emailInput"}" class="${"mr-3 flex rounded-md border-gray-300 pl-10 required:border-indigo-500 invalid:text-pink-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"}" placeholder="${"you@example.com"}"${add_attribute(
                  "this",
                  emailEl,
                  0
                )}>
            <button type="${"submit"}" class="${"relative flex w-full shrink justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group-invalid:pointer-events-none group-invalid:bg-gray-300"}">Signup
            </button></div></form></div></div>`;
              }
            }
          )}`
        : `${validate_component(Container, "Container").$$render(
            $$result,
            { classNames: "pt-16 pb-16 text-center " },
            {},
            {
              default: () => {
                return `<div class="${"mt-10 flex flex-col"}"><p class="${"text-xl"}">Thanks for signing up for notifications!</p>
      <p>Want to submit another email?</p>
      <div class="${"mt-6 flex justify-center"}"><button class="${"group relative flex h-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}">Another Email
        </button></div></div>`;
              }
            }
          )}`
    }`;
  }
);
async function addEmail(email) {
  const db = getFirestore();
  await addDoc(collection(db, "notification-emails"), {
    email,
    addedOn: new Date()
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${
    (($$result.head += `<!-- HEAD_svelte-1kem62t_START -->${
      (($$result.title = `<title>Our Ways of Working</title>`), "")
    }<meta name="${"description"}" content="${"We help teams and organizations perform better by tapping into people's potential."}"><!-- HEAD_svelte-1kem62t_END -->`),
    "")
  }

${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
<main>${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
  ${validate_component(EmailRibbon, "EmailRibbon").$$render(
    $$result,
    { addEmailFunc: addEmail },
    {},
    {}
  )}
  ${validate_component(PrimaryFeatures, "PrimaryFeatures").$$render(
    $$result,
    {},
    {},
    {}
  )}
  ${validate_component(EmailRibbon, "EmailRibbon").$$render(
    $$result,
    { addEmailFunc: addEmail },
    {},
    {}
  )}
  ${validate_component(SecondaryFeatures, "SecondaryFeatures").$$render(
    $$result,
    {},
    {},
    {}
  )}
  ${validate_component(EmailRibbon, "EmailRibbon").$$render(
    $$result,
    { addEmailFunc: addEmail },
    {},
    {}
  )}
  ${validate_component(CallToAction, "CallToAction").$$render(
    $$result,
    {},
    {},
    {}
  )}
  ${validate_component(EmailRibbon, "EmailRibbon").$$render(
    $$result,
    { addEmailFunc: addEmail },
    {},
    {}
  )}
  ${validate_component(Testimonials, "Testimonials").$$render(
    $$result,
    {},
    {},
    {}
  )}
  ${validate_component(EmailRibbon, "EmailRibbon").$$render(
    $$result,
    { addEmailFunc: addEmail },
    {},
    {}
  )}
  ${validate_component(Pricing, "Pricing").$$render($$result, {}, {}, {})}
  ${validate_component(EmailRibbon, "EmailRibbon").$$render(
    $$result,
    { addEmailFunc: addEmail },
    {},
    {}
  )}
  ${validate_component(Faqs, "Faqs").$$render($$result, {}, {}, {})}
  ${validate_component(EmailRibbon, "EmailRibbon").$$render(
    $$result,
    { addEmailFunc: addEmail },
    {},
    {}
  )}</main>
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export { Page as default };
