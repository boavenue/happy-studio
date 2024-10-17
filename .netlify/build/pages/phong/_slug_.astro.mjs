import { c as createComponent, r as renderUniqueStylesheet, a as renderScriptElement, b as createHeadAndContent, d as renderTemplate, e as renderComponent, u as unescapeHTML, m as maybeRenderHead, f as addAttribute, g as createAstro } from '../../chunks/astro/server_D2uEBN04.mjs';
import 'kleur/colors';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { removeBase, isRemotePath, prependForwardSlash } from '@astrojs/internal-helpers/path';
import { V as VALID_INPUT_FORMATS, A as AstroError, U as UnknownContentCollectionError } from '../../chunks/astro/assets-service_CfZWJFTM.mjs';
import * as devalue from 'devalue';
import { $ as $$Header, a as $$CardRoom, b as $$Footer, c as $$Layout } from '../../chunks/CardRoom_mHXpYssL.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_VRn61y4l.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc) || imageSrc.startsWith("/")) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('../../chunks/_astro_data-layer-content_BcEe_9wP.mjs');
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true};
var define_process_env_default = { VITE_GOOGLE_CALENDAR_API_KEY: "AIzaSyD5gdkz1cmkFvapshmoGZml3qg3fl78vrQ" };
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('../../chunks/_astro_asset-imports_D9aVaOQr.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: define_process_env_default._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/rooms/dbt-402.md": () => import('../../chunks/dbt-402_BiDMpfZB.mjs'),"/src/content/rooms/dbt-502.md": () => import('../../chunks/dbt-502_Dof7wYnU.mjs'),"/src/content/rooms/nqa-101.md": () => import('../../chunks/nqa-101_DgtkYJol.mjs'),"/src/content/rooms/nqa-102.md": () => import('../../chunks/nqa-102_Dd7C8Kxe.mjs'),"/src/content/rooms/nqa-201.md": () => import('../../chunks/nqa-201_B5v4E_Mc.mjs'),"/src/content/rooms/nqa-202.md": () => import('../../chunks/nqa-202_BJSBHW7g.mjs'),"/src/content/rooms/ntg-01.md": () => import('../../chunks/ntg-01_BeF3lDC-.mjs'),"/src/content/rooms/ntg-02.md": () => import('../../chunks/ntg-02_BB0iO1Az.mjs'),"/src/content/rooms/ntg-03.md": () => import('../../chunks/ntg-03_IjmTroOs.mjs'),"/src/content/rooms/ntg-04.md": () => import('../../chunks/ntg-04_lkU8bOeb.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"rooms":{"type":"content","entries":{"dbt-402":"/src/content/rooms/dbt-402.md","dbt-502":"/src/content/rooms/dbt-502.md","nqa-101":"/src/content/rooms/nqa-101.md","nqa-202":"/src/content/rooms/nqa-202.md","nqa-201":"/src/content/rooms/nqa-201.md","ntg-01":"/src/content/rooms/ntg-01.md","ntg-03":"/src/content/rooms/ntg-03.md","ntg-02":"/src/content/rooms/ntg-02.md","ntg-04":"/src/content/rooms/ntg-04.md","nqa-102":"/src/content/rooms/nqa-102.md"}}};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/rooms/dbt-402.md": () => import('../../chunks/dbt-402_Cmn6WVrq.mjs'),"/src/content/rooms/dbt-502.md": () => import('../../chunks/dbt-502_DeHJpb-m.mjs'),"/src/content/rooms/nqa-101.md": () => import('../../chunks/nqa-101_UJ0uVRC5.mjs'),"/src/content/rooms/nqa-102.md": () => import('../../chunks/nqa-102_Do9ZFtBy.mjs'),"/src/content/rooms/nqa-201.md": () => import('../../chunks/nqa-201_CDRsTfNf.mjs'),"/src/content/rooms/nqa-202.md": () => import('../../chunks/nqa-202_DQvvQJWv.mjs'),"/src/content/rooms/ntg-01.md": () => import('../../chunks/ntg-01_DSFqEPDb.mjs'),"/src/content/rooms/ntg-02.md": () => import('../../chunks/ntg-02_BTRVpkoP.mjs'),"/src/content/rooms/ntg-03.md": () => import('../../chunks/ntg-03_Bm5Zon4c.mjs'),"/src/content/rooms/ntg-04.md": () => import('../../chunks/ntg-04_CLZJzEUd.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro$2 = createAstro();
const $$ShareSocialItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ShareSocialItem;
  const { sharer, title, url, iconHtml, iconName } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="col-6"> <div${addAttribute(sharer, "data-sharer")}${addAttribute(title, "data-title")}${addAttribute(url, "data-url")} class="room-detail-list__share-social-item d-flex align-items-center cs-px-10 cs-py-6 radius-8"> <div class="room-detail-list__share-social-item__icon cs-pe-10"> <div>${unescapeHTML(iconHtml)}</div> </div> <div class="room-detail-list__share-social-item__title"> <p class="cs-fs-14 fw-700 lh-12 cs-mb-0">${iconName}</p> </div> </div> </div>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/ShareSocialItem.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
const $$Calendar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Calendar;
  const { calendarId } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div class="custom-calendar cs-mt-20"> <div id="calendar"', `></div> </div> <script>
  document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendarId = calendarEl.getAttribute('data-id');

    const calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'listDay,listWeek,listMonth,listYear'
      },
      initialView: 'listDay',
      displayEventTime: false,
      googleCalendarApiKey: 'AIzaSyD5gdkz1cmkFvapshmoGZml3qg3fl78vrQ',
      // events: 'boavenuefew@gmail.com',
      // events: '9b50307e2fc02e23a50b832656e18109db18e4fff46b8c3fb2f633f4e57a0e27@group.calendar.google.com',
      events: calendarId ? calendarId : '',
      buttonText: {
        today: 'H\xF4m nay',
        month: 'Th\xE1ng',
        week: 'Tu\u1EA7n',
        day: 'Ng\xE0y',
        listYear: 'N\u0103m'
      },
      displayBlock: true,
      allDayText: 'C\u1EA3 ng\xE0y',
      noEventsText: 'Kh\xF4ng c\xF3 s\u1EF1 ki\u1EC7n n\xE0o \u0111\u1EC3 hi\u1EC3n th\u1ECB',
      locale: 'vi',
      aspectRatio: 'auto', // Set auto height
      windowResize: function() {
          calendar.setOption('aspectRatio', 'auto');
      },
      eventContent: (arg) => { // T\xF9y ch\u1EC9nh n\u1ED9i dung c\u1EE7a s\u1EF1 ki\u1EC7n
          console.log(arg.event);
          const { title, start, end } = arg.event;
          const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false});
          const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          return { 
            html: 
              \`<div class="cs-p-12 calendar-time-item sd-md radius-8">
                <div class="d-flex align-items-center">
                  <div class="icon cs-me-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z"></path></svg>
                  </div>
                  <div class="cs-ps-10 info">
                    <div class="d-flex align-items-center cs-fs-16 lh-12 fw-700 cl-yellow cs-mb-2"><span class="cs-pe-10">\${title}</span> <span class="status-done cl-white cs-fs-10 cs-py-3 cs-px-10 radius-8 bg-medium-green">\u0110\xE3 \u0111\u1EB7t</span></div>
                    <span class="cs-fs-14 lh-12 cl-black cs-mt-5"><span class="cl-dark-black fw-700 cs-pe-2">Nh\u1EADn ph\xF2ng:</span>  \${startTime} / <span class="cl-dark-black fw-700 cs-pe-2">Tr\u1EA3 ph\xF2ng:</span> \${endTime}</span>
                  </div>
                </div>
              </div>\` 
          }; 
        },
      eventClick: function(info) {
        info.jsEvent.preventDefault();
      }
    });
    calendar.render();
  });
<\/script>`], ["", '<div class="custom-calendar cs-mt-20"> <div id="calendar"', `></div> </div> <script>
  document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendarId = calendarEl.getAttribute('data-id');

    const calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'listDay,listWeek,listMonth,listYear'
      },
      initialView: 'listDay',
      displayEventTime: false,
      googleCalendarApiKey: 'AIzaSyD5gdkz1cmkFvapshmoGZml3qg3fl78vrQ',
      // events: 'boavenuefew@gmail.com',
      // events: '9b50307e2fc02e23a50b832656e18109db18e4fff46b8c3fb2f633f4e57a0e27@group.calendar.google.com',
      events: calendarId ? calendarId : '',
      buttonText: {
        today: 'H\xF4m nay',
        month: 'Th\xE1ng',
        week: 'Tu\u1EA7n',
        day: 'Ng\xE0y',
        listYear: 'N\u0103m'
      },
      displayBlock: true,
      allDayText: 'C\u1EA3 ng\xE0y',
      noEventsText: 'Kh\xF4ng c\xF3 s\u1EF1 ki\u1EC7n n\xE0o \u0111\u1EC3 hi\u1EC3n th\u1ECB',
      locale: 'vi',
      aspectRatio: 'auto', // Set auto height
      windowResize: function() {
          calendar.setOption('aspectRatio', 'auto');
      },
      eventContent: (arg) => { // T\xF9y ch\u1EC9nh n\u1ED9i dung c\u1EE7a s\u1EF1 ki\u1EC7n
          console.log(arg.event);
          const { title, start, end } = arg.event;
          const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false});
          const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          return { 
            html: 
              \\\`<div class="cs-p-12 calendar-time-item sd-md radius-8">
                <div class="d-flex align-items-center">
                  <div class="icon cs-me-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z"></path></svg>
                  </div>
                  <div class="cs-ps-10 info">
                    <div class="d-flex align-items-center cs-fs-16 lh-12 fw-700 cl-yellow cs-mb-2"><span class="cs-pe-10">\\\${title}</span> <span class="status-done cl-white cs-fs-10 cs-py-3 cs-px-10 radius-8 bg-medium-green">\u0110\xE3 \u0111\u1EB7t</span></div>
                    <span class="cs-fs-14 lh-12 cl-black cs-mt-5"><span class="cl-dark-black fw-700 cs-pe-2">Nh\u1EADn ph\xF2ng:</span>  \\\${startTime} / <span class="cl-dark-black fw-700 cs-pe-2">Tr\u1EA3 ph\xF2ng:</span> \\\${endTime}</span>
                  </div>
                </div>
              </div>\\\` 
          }; 
        },
      eventClick: function(info) {
        info.jsEvent.preventDefault();
      }
    });
    calendar.render();
  });
<\/script>`])), maybeRenderHead(), addAttribute(calendarId, "data-id"));
}, "/Users/archer/WithoutWorking/happy-studio/src/components/Calendar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const getStaticPaths = async () => {
  const rooms = await getCollection("rooms");
  const paths = rooms.map((room) => ({
    params: { slug: room.slug },
    props: {
      room
    }
  }));
  return paths;
};
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const SHOW_ALL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 16px; width: 16px; fill: currentcolor;"><path fill-rule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path></svg>`;
  const SHARE_ICON = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2; overflow: visible;"><path d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289" fill="none"></path></svg>`;
  const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 20px; width: 20px; stroke: currentcolor; stroke-width: 3; overflow: visible;"><path d="m6 6 20 20M26 6 6 26"></path></svg>`;
  const FACEBOOK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/></svg>`;
  const WHATSAPP_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`;
  const TWITTER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>`;
  const THREAD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z"/></svg>`;
  const { room } = Astro2.props;
  const { id, title, description, images, amenities, price, allDayPrice, plusPrice, relatedRooms, googleAdress, googleMapsLink, calendarId } = room.data;
  const currentUrl = Astro2.request.url;
  return renderTemplate(_a || (_a = __template(["", ` <script>
  
  $('[data-show-all="on-all"]').on('click', function() {
    $('.room-detail-list__modal').addClass('show');
  });
  $('[data-show-all="off-all"]').on('click', function() {
    $('.room-detail-list__modal').removeClass('show');
  });
  $('[data-show-share="on"]').on('click', function() {
    $('.room-detail-list__share-social').addClass('show');
  })
  $('[data-show-share="off"]').on('click', function() {
    $('.room-detail-list__share-social').removeClass('show');
  })

<\/script>`])), renderComponent($$result, "Layout", $$Layout, { "title": "Happy Studio - Netflix & Chill" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="main-section"> <div class="back-page cus-button d-flex justify-content-center"> <a href="/phong" class="button button-default sd-big"> ${renderComponent($$result2, "Image", $$Image, { "src": "/src/assets/happy-time-logo-white-ver2.svg", "alt": "Home", "width": 60, "height": 30, "quality": 30, "class": "img-width" })} </a> </div> <div class="room-detail-banner sd-md position-relative overflow-hidden"> <div class="room-detail-banner__heading cs-px-15 cs-lg-px-30"> <p class="text-center cs-fs-14 cl-white fw-500 cs-mt-0 cs-mb-10 text-uppercase">${id}</p> <h1 class="text-uppercase text-center lt-05 fw-700 cl-yellow cs-fs-50 cs-mb-0">${title}</h1> <p class="text-center cs-fs-18 cl-white cs-mb-0 cs-mt-20">${description}</p> </div> ${renderComponent($$result2, "Image", $$Image, { "src": images[0].imageUrl, "alt": "Room Detail Banner", "class": "img-width", "width": 1920, "height": 1080, "quality": 80 })} </div> <div class="room-detail-list cs-pb-80"> <div class="container"> <div class="cs-lg-px-40"> <!-- Room detail thumbnail --> <div class="cs-mb-30"> <div class="row cs-gx-8 room-detail-list-wrap position-relative"> <div class="col-md-6 cs-px-4"> <div class="room-detail-list__ratio sd-md primary ratio-1-1 position-relative overflow-hidden" data-show-all="on-all"> ${renderComponent($$result2, "Image", $$Image, { "src": images[1].imageUrl, "alt": "Room Detail Banner", "class": "img-width", "width": 1920, "height": 1080, "quality": 80 })} </div> </div> <div class="col-md-6 cs-px-4 cs-mt-8 cs-md-mt-0"> <div class="row cs-gy-8 cs-gx-8"> ${images && images.length ? [2, 4, 5, 6].map((index) => renderTemplate`<div class="col-6 cs-px-4 room-detail-list__ratio-right"> <div class="room-detail-list__ratio second ratio-1-1 position-relative overflow-hidden" data-show-all="on-all"> ${renderComponent($$result2, "Image", $$Image, { "src": images[index].imageUrl, "alt": "Room Detail Banner", "class": "img-width", "width": 1920, "height": 1080, "quality": 80 })} </div> </div>`) : renderTemplate`<div class="col-12"> <p>Images are not available or insufficient.</p> </div>`} </div> </div> <div class="room-detail-list__show-all cs-mt-24 cs-md-my-0" data-show-all="on-all"> <div class="d-flex align-items-center justify-content-center"> <span class="cs-pe-5">${unescapeHTML(SHOW_ALL_ICON)}</span> <span class="cs-fs-18 cs-lg-fs-14 fw-700">Hiển thị tất cả</span> </div> </div> </div> </div> <!-- Room detail booking --> <hr class="cs-my-40"> <div class="cs-mb-30"> <div class="row"> <div class="col-lg-7 order-2 order-lg-1"> <div class="room-detail-services"> <div class="cs-mb-30"> <h2 class="fw-700 cl-black cs-fs-24">Nơi này có những gì cho bạn</h2> <p class="cs-fs-16 cs-md-fs-14">Home không chỉ mang đến chỗ nghỉ ngơi, mà còn tạo ra trải nghiệm thoải mái và đáng nhớ</p> </div> <div class="room-detail-services__list"> <div class="row cs-gy-25"> ${amenities && amenities.map((amenity) => renderTemplate`<div class="col-6"> <div class="room-detail-services__item d-flex"> <div class="room-detail-services__icon"> <div>${unescapeHTML(amenity.icon || "")}</div> </div> <div class="room-detail-services__title"> <p class="cs-fs-16 fw-700 lh-12 cs-mb-0">${amenity.title}</p> <p class="cs-fs-14 fw-400 lh-13 cs-mt-3 cs-mb-0">${amenity.description}</p> </div> </div> </div>`)} </div> </div> </div> </div> <div class="col-lg-5 cs-mb-40 cs-mb-lg-0 order-1 order-lg-2"> <div class="room-detail-services__price cs-p-24 radius-12"> <div class="room-detail-services__price-primary d-flex justify-content-between"> <div class="cs-pe-10"> <h4 class="cs-fs-20 fw-600 cl-black lh-12 cs-mb-2">Chỉ từ</h4> <div class="cs-fs-30 cl-yellow fw-600 lh-12">
₫${price}<span class="cs-fs-16 cl-black fw-600"> / 4h</span> </div> </div> <div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 50px; width: 50px; fill: currentcolor;"><path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path></svg> </div> </div> <div class="room-detail-services__price-default cs-mt-20"> <div class="d-flex"> <div class="room-detail-services__price-default__item cs-p-12"> <p class="cs-fs-14 cl-black fw-600 lh-12 cs-mb-2">Check-In từ 20h - 9h</p> <p class="cs-fs-20 cl-yellow fw-600 lh-12 cs-mb-0">₫${allDayPrice}</p> </div> <div class="room-detail-services__price-default__item cs-p-12"> <p class="cs-fs-14 cl-black fw-600 lh-12 cs-mb-2">Thêm giờ chỉ với</p> <p class="cs-fs-20 cl-yellow fw-600 lh-12 cs-mb-0">₫${plusPrice}</p> </div> </div> </div> <p class="cs-mt-20 text-left cs-mb-0 cs-fs-14 text-center"> <span class="cs-fs-16 cs-md-fs-14">
Liên hệ với Happy Time Studio - <a href="tel:+84326245744">032 624 5744</a> </span> </p> <div class="cus-button cs-mt-20 text-center"> <a href="https://www.facebook.com/messages/t/303687992825443" target="_blank" class="button button-default">Đặt Phòng</a> </div> </div> </div> </div> </div> <!-- Room detail calendar --> <hr class="cs-my-40"> <div class="cs-mb-30"> <div class="room-detail-calendar"> <h2 class="fw-700 cl-black cs-fs-24">Lịch đặt phòng</h2> <p class="cs-fs-16 cs-md-fs-14 fw-400">Chào bạn! Trước khi bắt đầu hành trình khám phá, hãy cùng kiểm tra lịch của home nha</p> ${renderComponent($$result2, "Calendar", $$Calendar, { "calendarId": calendarId })} </div> </div> <!-- Room detail location --> <hr class="cs-my-40"> <div class="cs-mb-30"> <div class="room-detail-map"> <h2 class="fw-700 cl-black cs-fs-24">Nơi bạn sẽ đến</h2> <p class="cs-fs-16 cs-md-fs-14 cs-mb-24">${googleAdress}</p> <iframe${addAttribute(googleMapsLink, "src")} width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-100 sd-md"></iframe> </div> </div> <!-- Room detail order --> <hr class="cs-my-40"> <div class="room-detail-order"> <div class="list-room-slider"> <h2 class="fw-700 cl-black cs-fs-24">Bạn đang tìm một không gian nghỉ ngơi tuyệt vời?</h2> <p class="cs-fs-16 cs-md-fs-14 cs-mb-24">Home còn những phòng khác để bạn tham khảo đây</p> <div class="row cs-gy-25 cs-lg-gy-30 cs-gx-8 cs-lg-gx-24"> ${relatedRooms && relatedRooms.map((related) => renderTemplate`<div class="col-6 col-md-4 cs-px-4 cs-lg-px-12"> ${renderComponent($$result2, "CardRoom", $$CardRoom, { "imageUrl": related.imageUrl, "link": related.link, "title": related.title, "price": related.price })} </div>`)} </div> </div> </div> </div> </div> </div> <!-- Room detail modal --> <div class="room-detail-list__modal"> <div class="room-detail-list__modal-tools cs-px-14 cs-py-20 d-flex align-items-center justify-content-between"> <div class="room-detail-list__modal-back d-flex justify-content-center align-items-center" data-show-all="off-all"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;"><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg> </div> <div class="room-detail-list__modal-share cs-px-12 cs-py-6 d-flex align-items-center" data-show-share="on"> <span class="cs-pe-5">${unescapeHTML(SHARE_ICON)}</span> <span class="cs-fs-13 fw-600 cl-white">Chia sẻ</span> </div> </div> <div class="container"> <div class="cs-md-pt-40 cs-pb-60 cs-md-pb-80 cs-md-px-40"> <h2 class="fw-700 cl-black cs-fs-24 cs-mb-24">Không gian phòng</h2> <div class="row cs-gy-8 cs-gx-8 justify-content-center"> ${images && images.length ? images.map((image, index) => renderTemplate`<div${addAttribute(index === 0 ? "col-12 cs-px-4" : "col-6 cs-px-4", "class")}> <div class="room-detail-list__modal-item"> ${renderComponent($$result2, "Image", $$Image, { "src": image.imageUrl, "alt": "Room Detail Banner", "class": "img-width w-100 radius-8 sd-md", "width": 1920, "height": 1080, "quality": 80 })} </div> </div>`) : renderTemplate`<div class="room-detail-list__modal-item"> <p>Images are not available or insufficient.</p> </div>`} </div> </div> </div> </div> <!-- Room detail share social --> <div class="room-detail-list__share-social"> <div class="room-detail-list__share-social-wrapper radius-12 sd-md cs-p-24"> <div class="room-detail-list__share-social__close cs-mb-10 d-flex" data-show-share="off">${unescapeHTML(CLOSE_ICON)}</div> <h2 class="fw-700 cl-black cs-fs-24 cs-mb-24">Chia sẻ phòng này !</h2> <div class="d-flex align-items-center cs-my-20"> <div class="room-detail-list__share-social__thumbnail"> ${renderComponent($$result2, "Image", $$Image, { "src": images[0].imageUrl, "alt": "Room Detail Banner", "class": "img-width w-100 h-100 radius-8 sd-md", "width": 1920, "height": 1080, "quality": 80 })} </div> <div class="cs-ps-15"> <span class="cs-fs-14 fw-600 cl-black">Mã: <span class="cl-dark-black fw-400">${id}</span></span> <p class="cs-fs-14 cs-mb-0 fw-600 cl-black">Phòng: <span class="cl-dark-black fw-400">${title}</span></p> </div> </div> <div class="row cs-gy-8 cs-gx-8"> ${renderComponent($$result2, "ShareSocialItem", $$ShareSocialItem, { "sharer": "threads", "title": title, "url": currentUrl, "iconHtml": THREAD_ICON, "iconName": "Thread" })} ${renderComponent($$result2, "ShareSocialItem", $$ShareSocialItem, { "sharer": "facebook", "title": title, "url": currentUrl, "iconHtml": FACEBOOK_ICON, "iconName": "Facebook" })} ${renderComponent($$result2, "ShareSocialItem", $$ShareSocialItem, { "sharer": "whatsapp", "title": title, "url": currentUrl, "iconHtml": WHATSAPP_ICON, "iconName": "WhatsApp" })} ${renderComponent($$result2, "ShareSocialItem", $$ShareSocialItem, { "sharer": "x", "title": title, "url": currentUrl, "iconHtml": TWITTER_ICON, "iconName": "Twitter" })} </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` }));
}, "/Users/archer/WithoutWorking/happy-studio/src/pages/phong/[slug].astro", void 0);

const $$file = "/Users/archer/WithoutWorking/happy-studio/src/pages/phong/[slug].astro";
const $$url = "/phong/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
