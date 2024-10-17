import { c as createComponent, d as renderTemplate, m as maybeRenderHead, u as unescapeHTML, e as renderComponent, g as createAstro } from '../chunks/astro/server_D2uEBN04.mjs';
import 'kleur/colors';
import { a as $$CardRoom, $ as $$Header, b as $$Footer, c as $$Layout } from '../chunks/CardRoom_mHXpYssL.mjs';
import { $ as $$RoomThanks, a as $$CardTitle } from '../chunks/RoomThanks_DHkO0bn1.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from '../chunks/_astro_assets_VRn61y4l.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$RoomList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RoomList;
  const { rooms, address, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="list-rooms"> <div class="list-rooms__heading cs-mb-30"> <p class="cs-mb-0 cl-black fw-900 d-flex align-items-center"> <span class="icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> <path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"></path></svg> </span> <span> <span class="cs-ps-5"> Chi Nhánh </span> </span> </p><h2 class="cs-fs-40 cl-yellow fw-900 lt-1">${address || ""}</h2> <div class="cs-mb-0">${unescapeHTML(description || "")}</div>  </div> <div class="row cs-gy-25 cs-lg-gy-30 cs-gx-8 cs-lg-gx-24"> ${rooms && rooms.map((room) => renderTemplate`<div class="col-6 col-lg-3 cs-px-4 cs-lg-px-12"> ${renderComponent($$result, "CardRoom", $$CardRoom, { "imageUrl": room.imageUrl, "link": room.link, "title": room.title, "price": room.price })} </div>`)} </div> </div>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/rooms/RoomList.astro", void 0);

const $$AllRooms = createComponent(($$result, $$props, $$slots) => {
  const roomNQA = [
    {
      title: "NQA-101",
      price: "360.000",
      imageUrl: "/src/assets/all/nqa-101.jpg",
      link: "/phong/nqa-101"
    },
    {
      title: "NQA-102",
      price: "360.000",
      imageUrl: "/src/assets/all/nqa-102.jpg",
      link: "/phong/nqa-102"
    },
    {
      title: "NQA-201",
      price: "360.000",
      imageUrl: "/src/assets/all/nqa-201.jpg",
      link: "/phong/nqa-201"
    },
    {
      title: "NQA-202",
      price: "360.000",
      imageUrl: "/src/assets/all/nqa-202.jpg",
      link: "/phong/nqa-202"
    }
  ];
  const roomDBT = [
    {
      title: "DBT-402",
      price: "360.000",
      imageUrl: "/src/assets/all/dbt-402.jpg",
      link: "/phong/dbt-402"
    },
    {
      title: "DBT-502",
      price: "360.000",
      imageUrl: "/src/assets/all/dbt-502.jpg",
      link: "/phong/dbt-502"
    }
  ];
  const roomNTG = [
    {
      title: "NTG-01",
      price: "360.000",
      imageUrl: "/src/assets/all/ntg-01.jpg",
      link: "/phong/ntg-01"
    },
    {
      title: "NTG-02",
      price: "360.000",
      imageUrl: "/src/assets/all/ntg-02.jpg",
      link: "/phong/ntg-02"
    },
    {
      title: "NTG-03",
      price: "360.000",
      imageUrl: "/src/assets/all/ntg-03.jpg",
      link: "/phong/ntg-03"
    },
    {
      title: "NTG-04",
      price: "360.000",
      imageUrl: "/src/assets/all/ntg-04.jpg",
      link: "/phong/ntg-04"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="section-list-rooms cs-pt-60 cs-pb-100"> <div class="back-page cus-button d-flex justify-content-center"> <a href="/" class="button button-default sd-big"> ${renderComponent($$result, "Image", $$Image, { "src": "/src/assets/happy-time-logo-white-ver2.svg", "alt": "Home", "width": 60, "height": 30, "quality": 30, "class": "img-width" })} </a> </div> <div class="text-center cs-mb-60"> ${renderComponent($$result, "RoomThanks", $$RoomThanks, { "imageUrl": "/src/assets/room-thanks.svg", "description": "Gi\u1EEFa ch\u1ED1n th\xE0nh th\u1ECB t\u1EA5p n\u1EADp, kh\xF4ng gian ri\xEAng c\xE0ng tr\u1EDF n\xEAn xa x\u1EC9 h\u01A1n. Home kh\xF4ng ch\u1EC9 l\xE0 ch\u1ED1n y\xEAn b\xECnh d\xE0nh cho nh\u1EEFng gi\u1EDD ph\xFAt ngh\u1EC9 ng\u01A1i, kho\u1EA3ng l\u1EB7ng \u0111\u1EC3 ho\xE0n th\xE0nh c\xF4ng vi\u1EC7c. M\xE0 c\xF2n l\xE0 n\u01A1i th\u1EAFp l\xEAn t\xECnh y\xEAu, t\xECnh b\u1EA1n v\xE0 ghi l\u1EA1i nh\u1EEFng k\u1EF7 ni\u1EC7m \u0111\xE1ng nh\u1EDB.", "textColor": "black", "logoColor": "black", "bgSectionColor": "#f9e7cd" })} </div> <div class="text-center cs-pb-60"> <div class="container"> ${renderComponent($$result, "CardTitle", $$CardTitle, { "title": "Kh\xF4ng Gian <br />Happy Studio", "colorTitle": "cl-yellow", "description": "B\u1EA1n c\u1EA7n bao nhi\xEAu ri\xEAng t\u01B0, Home c\u0169ng c\xF3 nha!" })} </div> </div> <div class="container"> <div class="d-flex flex-column flex-gap-64 position-relative" style="z-index: 2;"> ${renderComponent($$result, "RoomList", $$RoomList, { "address": "Nguy\u1EC5n Qu\xFD Anh", "description": "M\u1ED7i ph\xF2ng \u0111\u01B0\u1EE3c trang ho\xE0ng xinh x\u1EAFn v\u1EDBi \u0111\u1EA7y \u0111\u1EE7 ti\u1EC7n nghi. D\xF9 b\u1EA1n ch\u1ECDn ph\xF2ng ng\u1EADp tr\xE0n \xE1nh s\xE1ng hay ph\xF2ng v\u1EDBi \u0111\xE8n led h\xECnh c\xE2y th\xF4ng l\u1EA5p l\xE1nh, <br />ch\u1EAFc ch\u1EAFn b\u1EA1n s\u1EBD c\xF3 nh\u1EEFng gi\xE2y ph\xFAt th\u01B0 gi\xE3n tuy\u1EC7t v\u1EDDi", "rooms": roomNQA })} ${renderComponent($$result, "RoomList", $$RoomList, { "address": "Nguy\u1EC5n T\u01B0 Gi\u1EA3n", "description": "B\u1EA1n s\u1EBD t\xECm th\u1EA5y n\u01A1i ngh\u1EC9 ng\u01A1i l\xFD t\u01B0\u1EDFng cho d\xF9 b\u1EA1n \u0111ang t\xECm ki\u1EBFm m\u1ED9t kh\xF4ng gian y\xEAn t\u0129nh \u0111\u1EC3 th\u01B0 gi\xE3n hay m\u1ED9t g\xF3c l\xFD t\u01B0\u1EDFng \u0111\u1EC3 xem phim. <br />H\xE3y \u0111\u1EC3 Home tr\u1EDF th\xE0nh n\u01A1i b\u1EA1n g\u1ECDi l\xE0 nh\xE0 khi xa!", "rooms": roomNTG })} ${renderComponent($$result, "RoomList", $$RoomList, { "address": "D\u01B0\u01A1ng B\xE1 Tr\u1EA1c", "description": "M\u1ED7i ph\xF2ng mang m\u1ED9t v\u1EBB \u0111\u1EB9p ri\xEAng, t\u1EEB t\xF4ng m\xE0u \u1EA5m \xE1p \u0111\u1EBFn g\xF3c xanh m\xE1t l\xE0nh, t\u1EA1o n\xEAn kh\xF4ng gian y\xEAn b\xECnh v\xE0 \u0111\xE1ng y\xEAu cho k\u1EF3 ngh\u1EC9 c\u1EE7a b\u1EA1n.", "rooms": roomDBT })} </div> </div> </section>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/rooms/AllRooms.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Happy Studio - Netflix & Chill" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="main-section"> ${renderComponent($$result2, "AllRooms", $$AllRooms, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/archer/WithoutWorking/happy-studio/src/pages/phong/index.astro", void 0);

const $$file = "/Users/archer/WithoutWorking/happy-studio/src/pages/phong/index.astro";
const $$url = "/phong";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
