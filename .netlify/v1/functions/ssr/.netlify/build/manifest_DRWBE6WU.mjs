import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'devalue';
import { j as decodeKey } from './chunks/astro/server_D2uEBN04.mjs';
import 'clsx';
import 'html-escaper';
import { compile } from 'path-to-regexp';

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/archer/WithoutWorking/happy-studio/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Dj--_N-o.css"}],"routeData":{"route":"/phong/[slug]","isIndex":false,"type":"page","pattern":"^\\/phong\\/([^/]+?)\\/?$","segments":[[{"content":"phong","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/phong/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Dj--_N-o.css"}],"routeData":{"route":"/phong","isIndex":true,"type":"page","pattern":"^\\/phong\\/?$","segments":[[{"content":"phong","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/phong/index.astro","pathname":"/phong","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Dj--_N-o.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/archer/WithoutWorking/happy-studio/src/pages/phong/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/phong/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/archer/WithoutWorking/happy-studio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/archer/WithoutWorking/happy-studio/src/pages/phong/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/phong/[slug]@_@astro":"pages/phong/_slug_.astro.mjs","\u0000@astro-page:src/pages/phong/index@_@astro":"pages/phong.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DRWBE6WU.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/dbt-402.md?astroContentCollectionEntry=true":"chunks/dbt-402_BiDMpfZB.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/dbt-502.md?astroContentCollectionEntry=true":"chunks/dbt-502_Dof7wYnU.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-101.md?astroContentCollectionEntry=true":"chunks/nqa-101_DgtkYJol.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-102.md?astroContentCollectionEntry=true":"chunks/nqa-102_Dd7C8Kxe.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-201.md?astroContentCollectionEntry=true":"chunks/nqa-201_B5v4E_Mc.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-202.md?astroContentCollectionEntry=true":"chunks/nqa-202_BJSBHW7g.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-01.md?astroContentCollectionEntry=true":"chunks/ntg-01_BeF3lDC-.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-02.md?astroContentCollectionEntry=true":"chunks/ntg-02_BB0iO1Az.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-03.md?astroContentCollectionEntry=true":"chunks/ntg-03_IjmTroOs.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-04.md?astroContentCollectionEntry=true":"chunks/ntg-04_lkU8bOeb.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/dbt-402.md?astroPropagatedAssets":"chunks/dbt-402_Cmn6WVrq.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/dbt-502.md?astroPropagatedAssets":"chunks/dbt-502_DeHJpb-m.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-101.md?astroPropagatedAssets":"chunks/nqa-101_UJ0uVRC5.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-102.md?astroPropagatedAssets":"chunks/nqa-102_Do9ZFtBy.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-201.md?astroPropagatedAssets":"chunks/nqa-201_CDRsTfNf.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-202.md?astroPropagatedAssets":"chunks/nqa-202_DQvvQJWv.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-01.md?astroPropagatedAssets":"chunks/ntg-01_DSFqEPDb.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-02.md?astroPropagatedAssets":"chunks/ntg-02_BTRVpkoP.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-03.md?astroPropagatedAssets":"chunks/ntg-03_Bm5Zon4c.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-04.md?astroPropagatedAssets":"chunks/ntg-04_CLZJzEUd.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/dbt-402.md":"chunks/dbt-402_BcFCgxM2.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/dbt-502.md":"chunks/dbt-502_BvnqW902.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-101.md":"chunks/nqa-101_TGIkDMxb.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-102.md":"chunks/nqa-102_CiyYTW3W.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-201.md":"chunks/nqa-201_BiZuuMVl.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/nqa-202.md":"chunks/nqa-202_DGitluWP.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-01.md":"chunks/ntg-01_skzBQLP4.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-02.md":"chunks/ntg-02_DOVkc1SZ.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-03.md":"chunks/ntg-03_CjeDguTC.mjs","/Users/archer/WithoutWorking/happy-studio/src/content/rooms/ntg-04.md":"chunks/ntg-04_BM-OrmPu.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/nqa-4.B_HtFQnd.jpg","/_astro/nqa-2.CjIBYj4c.jpg","/_astro/nqa-3.BQeck40e.jpg","/_astro/nqa-5.D_nMeA6R.jpg","/_astro/nqa-6.VCIrsWOv.jpg","/_astro/nqa-7.CpN2BLBz.jpg","/_astro/nqa-1.MQ6i_leV.jpg","/_astro/nqa-2.BWloyCzP.jpg","/_astro/nqa-3.Fr91Qe9B.jpg","/_astro/nqa-1.DpGKV44m.jpg","/_astro/nqa-5.C-F9sd9k.jpg","/_astro/nqa-6.DiLNBSsa.jpg","/_astro/nqa-7.DltaVS0M.jpg","/_astro/nqa-8.2wE2mpHb.jpg","/_astro/nqa-9.Ldvr_Slh.jpg","/_astro/nqa-2.DkWegQX_.jpg","/_astro/nqa-3.Dv2XASX4.jpg","/_astro/nqa-6.Oxl9iK31.jpg","/_astro/nqa-4.HhTo75Bl.jpg","/_astro/nqa-8.DpIDtTHT.jpg","/_astro/nqa-5.BZJUQ8t_.jpg","/_astro/nqa-4.X0YdWOZi.jpg","/_astro/nqa-1.Cu2lrOQ7.jpg","/_astro/nqa-12.BbIH5Fn8.jpg","/_astro/nqa-1.CTH8tYUC.jpg","/_astro/nqa-4.BXItuynO.jpg","/_astro/nqa-7.B6GsBJYP.jpg","/_astro/nqa-11.BPyjQEaz.jpg","/_astro/nqa-9.Cj5RKyZf.jpg","/_astro/nqa-6.DRS78H7F.jpg","/_astro/nqa-5.B-TEorSO.jpg","/_astro/nqa-2.DoeLWmsJ.jpg","/_astro/nqa-8.XYpMOAk1.jpg","/_astro/nqa-9.N22X5hmX.jpg","/_astro/nqa-11.CCUGMLtl.jpg","/_astro/nqa-3.DKvMalyN.jpg","/_astro/nqa-10.Mqc7xD42.jpg","/_astro/ntg-1.2tyxpNsd.jpg","/_astro/nqa-12.BVqm3SIc.jpg","/_astro/ntg-3.Di6Z9FsS.jpg","/_astro/nqa-7.D_tPtYWb.jpg","/_astro/ntg-2.DuA_tbDE.jpg","/_astro/ntg-4.D_IGfvl1.jpg","/_astro/ntg-6.CqgpmldD.jpg","/_astro/ntg-7.BH680gtj.jpg","/_astro/ntg-8.s3F0J3Eb.jpg","/_astro/nqa-10.5Kpkb_-5.jpg","/_astro/ntg-12.Dpi-zea_.jpg","/_astro/ntg-9.hqXSiFCC.jpg","/_astro/ntg-11.DUx8uMR_.jpg","/_astro/ntg-12.BQk_1-_-.jpg","/_astro/ntg-10.7HnFJSHa.jpg","/_astro/ntg-1.DkmS_8uq.jpg","/_astro/ntg-2.CBwa6LbX.jpg","/_astro/ntg-6.GCiCoXCW.jpg","/_astro/ntg-5.Dd_3lvVV.jpg","/_astro/ntg-7.CdoFGOkD.jpg","/_astro/ntg-3.ChizGP1u.jpg","/_astro/ntg-8.C2NH_XzZ.jpg","/_astro/ntg-13.CTxcX-ny.jpg","/_astro/ntg-11.DkBkZ69J.jpg","/_astro/ntg-4.DrvR_mSF.jpg","/_astro/ntg-12.CMjPzEEw.jpg","/_astro/ntg-5.Bo329h-T.jpg","/_astro/ntg-13.mUN1BqO8.jpg","/_astro/ntg-10.CBhaSPFu.jpg","/_astro/ntg-9.Cif1UtNN.jpg","/_astro/ntg-3.DOKHX6hw.jpg","/_astro/ntg-10.5V0MAlw0.jpg","/_astro/ntg-4.DiSmAR9a.jpg","/_astro/ntg-5.CgXVVlsq.jpg","/_astro/ntg-7.CCr8Rk8V.jpg","/_astro/ntg-2.BoVWn46g.jpg","/_astro/ntg-8.Bx8Qjwf6.jpg","/_astro/ntg-9.CF63V6Xe.jpg","/_astro/ntg-2.BS8JnT1z.jpg","/_astro/ntg-6.BQvhAb1N.jpg","/_astro/ntg-1.CpHhVs-t.jpg","/_astro/ntg-1.DoPkecoq.jpg","/_astro/ntg-3.EaXiHrsZ.jpg","/_astro/ntg-4.uZeyfm76.jpg","/_astro/ntg-7.DXA4q0ha.jpg","/_astro/ntg-11.BTznNBWt.jpg","/_astro/ntg-6.CVtlTuNC.jpg","/_astro/ntg-9.uOqOhxRF.jpg","/_astro/ntg-12.6jZdJY1n.jpg","/_astro/ntg-10.DfERD-XC.jpg","/_astro/ntg-11.DRnxkSH9.jpg","/_astro/ntg-8.DTLyNCMX.jpg","/_astro/ntg-5.Bt-AQ5vu.jpg","/_astro/nqa-8.DBoHNMKn.jpg","/_astro/nqa-9.nxQhgtj5.jpg","/_astro/dbt-1.IzPLLu0y.jpg","/_astro/dbt-6.HCvtyYI7.jpg","/_astro/dbt-7.DrAniu4S.jpg","/_astro/dbt-3.B8Hv6LWF.jpg","/_astro/dbt-4.Dqd5Ny0P.jpg","/_astro/dbt-8.DXGepZfT.jpg","/_astro/dbt-4.BZvmhdof.jpg","/_astro/dbt-3.B7hdFwZd.jpg","/_astro/dbt-8.DZVHFaN_.jpg","/_astro/dbt-1.CCOEycCj.jpg","/_astro/dbt-2.D6T6ACfL.jpg","/_astro/dbt-5.B7QkW5rX.jpg","/_astro/dbt-10.COKjcH0N.jpg","/_astro/dbt-9.S9kIXqAN.jpg","/_astro/dbt-6.CNcPai8Q.jpg","/_astro/dbt-5.C2ITcm9Z.jpg","/_astro/dbt-7.BJj4kKf_.jpg","/_astro/dbt-2.Bh6yz9tv.jpg","/_astro/index.Dj--_N-o.css","/images/bars-solid.svg","/images/favicon.svg","/fonts/Dream-Avenue.woff","/fonts/Dream-Avenue.woff2","/images/room/nqa-102.jpg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"W4+G5huSVAU50ITincrf+WpdEgLYcvy3/ejqoE28DC4=","experimentalEnvGetSecretEnabled":false});

export { manifest };
