import { c as createComponent, d as renderTemplate, m as maybeRenderHead, e as renderComponent, g as createAstro, f as addAttribute, u as unescapeHTML } from '../chunks/astro/server_D2uEBN04.mjs';
import 'kleur/colors';
import { a as $$CardRoom, $ as $$Header, b as $$Footer, c as $$Layout } from '../chunks/CardRoom_mHXpYssL.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from '../chunks/_astro_assets_VRn61y4l.mjs';
import { a as $$CardTitle, b as $$ThreeLine, $ as $$RoomThanks } from '../chunks/RoomThanks_DHkO0bn1.mjs';
export { renderers } from '../renderers.mjs';

const $$Banner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="home-banner"> <div class="home-banner__wrapper d-lg-flex align-items-center justify-content-center"> <div class="home-banner__left"> <div class="home-banner__info d-flex flex-column cs-lg-px-70"> <h2 class="title fw-900 cs-fs-70"> ${renderComponent($$result, "Image", $$Image, { "src": "/src/assets/happy-time-logo-yellow-ver2.svg", "alt": "Happy Studio, NetFlix & Chill", "width": 331, "height": 220, "class": "img-width", "style": "width: 65%" })} </h2> <p class="description lh-18">
Với không gian nhỏ xinh, phong cách ấm cúng, home tin rằng bạn sẽ cảm
          nhận được sự gần gũi và thoải mái như chính ngôi nhà của mình.
</p> <div class="cus-button"> <a href="#room-introduce" class="button button-default sd-lg">Khám Phá</a> </div> </div> </div> <div class="home-banner__right"> ${renderComponent($$result, "Image", $$Image, { "src": "/src/assets/banner.webp", "alt": "Home Banner", "class": "img-width sd-big", "width": 2048, "height": 1366 })} </div> </div> </section>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/Banner.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$ListRoomSlide = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ListRoomSlide;
  const { rooms } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<div class="list-room-slider"> <div class="swiper cs-ps-40"> <div class="swiper-wrapper"> ', ' </div> </div> </div> <script>\n  new Swiper(".swiper", {\n    direction: "horizontal",\n    loop: true,\n    speed: 1400,\n    pauseOnMouseEnter: true,\n    autoplay: {\n      delay: 6000,\n    },\n    breakpoints: {\n      0: {\n        slidesPerView: 2,\n        centeredSlides: false,\n      },\n      992: {\n        slidesPerView: 3,\n        centeredSlides: false,\n      },\n      1200: {\n        slidesPerView: 5,\n        centeredSlides: false,\n      },\n    },\n  });\n<\/script>'])), maybeRenderHead(), rooms.map((room) => renderTemplate`<div class="swiper-slide cs-me-15 cs-md-px-10 cs-md-me-20"> ${renderComponent($$result, "CardRoom", $$CardRoom, { "imageUrl": room.imageUrl, "link": room.link, "title": room.title, "price": room.price })} </div>`));
}, "/Users/archer/WithoutWorking/happy-studio/src/components/ListRoomSlide.astro", void 0);

const $$RoomSlider = createComponent(($$result, $$props, $$slots) => {
  const rooms = [
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
    },
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
    },
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
  return renderTemplate`${maybeRenderHead()}<div id="room-introduce" class="section section-list-room cs-py-70"> <div class="container"> <div class="row"> <div class="col-lg-6"> ${renderComponent($$result, "CardTitle", $$CardTitle, { "title": "\u1EDE \u0110\xE2y C\xF3 G\xEC?", "colorTitle": "cl-yellow", "description": "D\xF9 b\u1EA1n \u0111\u1EBFn \u0111\xE2y v\xEC c\xF4ng vi\u1EC7c hay th\u01B0 gi\xE3n, ch\u1ED7 ngh\u1EC9 t\u1EA1i Home mang \u0111\u1EBFn s\u1EF1 h\xE0i h\xF2a gi\u1EEFa n\xE9t tinh t\u1EBF hi\u1EC7n \u0111\u1EA1i v\xE0 phong c\xE1ch c\u1ED5 \u0111i\u1EC3n. V\u1EDBi kh\xF4ng gian linh ho\u1EA1t, Home \u0111\xE1p \u1EE9ng m\u1ECDi nhu c\u1EA7u, \u0111\u1EA3m b\u1EA3o s\u1EF1 tho\u1EA3i m\xE1i cho m\u1ED7i v\u1ECB kh\xE1ch." })} </div> </div> </div> <div class="cs-mt-40 cs-lg-mt-60"> ${renderComponent($$result, "ListRoomSlide", $$ListRoomSlide, { "rooms": rooms })} <div class="container"> <div class="cus-button text-center cs-mt-40"> <a href="/phong" class="button button-default sd-lg">Tất Cả</a> </div> </div> </div> </div>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/home/RoomSlider.astro", void 0);

const $$RoomScale = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="room-scale"> <div class="container"> <div class="row align-items-end"> <div class="col-6 text-end"> ${renderComponent($$result, "Image", $$Image, { "src": "/src/assets/scale/room-scale-1.jpg", "alt": "Kh\xF4ng gian s\u1ED1ng", "width": 1356, "height": 900, "quality": 30, "class": "room-scale__img sd-big radius-12" })} </div> <div class="col-6 text-start"> ${renderComponent($$result, "Image", $$Image, { "src": "/src/assets/scale/room-scale-2.jpg", "alt": "Kh\xF4ng gian s\u1ED1ng", "width": 1356, "height": 900, "quality": 30, "class": "room-scale__img-2 sd-big radius-12" })} </div> </div> </div> </section>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/home/RoomScale.astro", void 0);

const $$Astro$1 = createAstro();
const $$CardFull = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CardFull;
  const {
    title,
    position = "left",
    colorTitle = "cl-black",
    description,
    buttonText,
    buttonLink,
    imagePriUrl,
    imageSubUrl
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`card-block-full ${position}`, "class")}> <div class="row align-items-center"> <div class="col-lg-6 position-relative card-block-full__first"> <div class="card-block-full__left"> ${imagePriUrl && renderTemplate`<div class="card-block-full__pri"> ${renderComponent($$result, "Image", $$Image, { "src": imagePriUrl, "alt": title || "Room Image", "class:list": "img-width", "width": 1356, "height": 904, "quality": 30 })} </div>`} ${imageSubUrl && renderTemplate`<div class="card-block-full__sub sd-big radius-12 d-none d-lg-block"> ${renderComponent($$result, "Image", $$Image, { "src": imageSubUrl, "alt": title || "Room Image", "class:list": "img-width radius-12", "width": 1356, "height": 904, "quality": 30 })} </div>`} </div> </div> <div class="col-lg-6 card-block-full__second cs-mt-40 cs-lg-mt-0"> <div class="card-block-full__right cs-px-16 cs-md-px-110 text-center text-lg-start"> ${renderComponent($$result, "CardTitle", $$CardTitle, { "title": title, "colorTitle": colorTitle, "description": description, "buttonText": buttonText, "buttonLink": buttonLink })} </div> </div> </div> </div>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/CardFull.astro", void 0);

const $$RoomIntroduce = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ThreeLine", $$ThreeLine, { "position": "right" })} ${maybeRenderHead()}<section class="container-xxl cs-py-70"> ${renderComponent($$result, "CardFull", $$CardFull, { "title": "B\xECnh Y\xEAn<br /> \u1EDE \u0110\xE2y", "colorTitle": "cl-yellow", "description": "<span>Kh\xF4ng c\u1EA7n \u0111i xa, ch\u1EC9 c\u1EA7n b\u01B0\u1EDBc v\xE0o Home l\xE0 b\u1EA1n c\xF3 ngay m\u1ED9t th\u1EBF gi\u1EDBi kh\xE1c - \xEAm \u0111\u1EC1m, y\xEAn t\u0129nh, v\xE0 \u0111\u1EA7y \u0111\u1EE7 ti\u1EC7n nghi.</span>", "buttonText": "\u0110\u1EB7t Ph\xF2ng", "buttonLink": "/phong", "imagePriUrl": "/src/assets/introduce/ntg-pri-01.jpg", "imageSubUrl": "/src/assets/introduce/ntg-sub-01.jpg" })} </section> <section class="take-care cs-py-60 cs-lg-py-20 text-center"> <div class="container"> <div class="cs-mb-30"> ${renderComponent($$result, "Image", $$Image, { "src": "/src/assets/happy-time-logo-yellow-ver2.svg", "alt": "Happy Studio, NetFlix & Chill", "width": 331, "height": 220, "class": "header__logo" })} </div> ${renderComponent($$result, "CardTitle", $$CardTitle, { "title": "<span class='fw-700'>C\u1EE9 v\xF4 t\u01B0, b\u1EA1n ha !</span>", "colorTitle": "cl-yellow", "description": "<span>\u0110\u1ED9i ng\u0169 Home si\xEAu th\xE2n thi\u1EC7n, <br />lu\xF4n s\u1EB5n s\xE0ng ch\u0103m s\xF3c b\u1EA1n, t\u1EEB vi\u1EC7c lo li\u1EC7u \u0111i l\u1EA1i \u0111\u1EBFn b\u1EADt m\xED nh\u1EEFng g\xF3c nh\u1ECF th\xFA v\u1ECB. <br class='d-none d-lg-block'/> C\u1EA7n g\xEC c\u1EE9 g\u1ECDi, t\u1EE5i m\xECnh lu\xF4n \u1EDF \u0111\xE2y 24/7 nha.</span>" })} </div> </section> <section class="container-xxl cs-py-70"> ${renderComponent($$result, "CardFull", $$CardFull, { "title": "Chill H\u1EBFt M\u1EE9c", "position": "right", "colorTitle": "cl-yellow", "description": "<span>Kh\xF4ng ch\u1EC9 l\xE0 n\u01A1i ngh\u1EC9, b\u1EA1n c\u1EA7n bao nhi\xEAu ri\xEAng t\u01B0. C\u1EE9 vi\u1EC7c tho\u1EA3i m\xE1i th\u01B0 gi\xE3n, b\u1EADt phim l\xEAn, Home lo h\u1EBFt ph\u1EA7n c\xF2n l\u1EA1i. </span>", "buttonText": "\u0110\u1EB7t Ph\xF2ng", "buttonLink": "/phong", "imagePriUrl": "/src/assets/introduce/ntg-pri-02.jpg", "imageSubUrl": "/src/assets/introduce/ntg-sub-02.jpg" })} </section> ${renderComponent($$result, "ThreeLine", $$ThreeLine, { "position": "left" })}`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/home/RoomIntroduce.astro", void 0);

const $$Astro = createAstro();
const $$CardRoomLocation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardRoomLocation;
  const { roomLocations } = Astro2.props;
  return renderTemplate`${roomLocations && roomLocations.map((room) => renderTemplate`${maybeRenderHead()}<div class="card-block-location radius-12 sd-lg position-relative overflow-hidden">${room.imageUrl && renderTemplate`<div class="card-block-location__thumbnail">${renderComponent($$result, "Image", $$Image, { "src": room.imageUrl, "alt": room.title || "Room Image", "class:list": "img-width", "width": 1356, "height": 904, "quality": 30 })}</div>`}<div class="card-block-location__content cs-p-16 cs-md-p-40">${room.title && renderTemplate`<h3 class=" d-flex flex-column flex-md-row align-items-md-center fw-700 cl-white cs-mb-12">${unescapeHTML(room.title)}</h3>`}${room.description && renderTemplate`<div class="d-none d-md-block cl-white fw-400 cs-mb-0">${unescapeHTML(room.description)}</div>`}</div></div>`)}`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/CardRoomLocation.astro", void 0);

const $$RoomLocation = createComponent(($$result, $$props, $$slots) => {
  const rooms = [
    {
      title: '<span>NQA</span><span class="cs-ps-5 d-none d-md-inline-block">|</span><span class="cs-sm-ps-5 cs-fs-16 fw-400 cs-mb-0">56/5 Nguy\u1EC5n Qu\xFD Anh. T\xE2n Ph\xFA</span>',
      description: "<p>Mang \u0111\u1EBFn nh\u1EEFng tr\u1EA3i nghi\u1EC7m \u0111a d\u1EA1ng m\xE0 v\u1EABn gi\u1EEF nguy\xEAn s\u1EF1 y\xEAn b\xECnh ngay t\u1EA1i ch\u1ED1n gh\xE9 \u0111\u1EBFn. C\u1EE9 \u0111\u1EBFn v\xE0 c\u1EA3m nh\u1EADn th\xF4i!</p>",
      imageUrl: "/src/assets/location/nqa.jpg"
    },
    {
      title: '<span>DBT</span><span class="cs-ps-5 d-none d-md-inline-block">|</span><span class="cs-sm-ps-5 cs-fs-16 fw-400 cs-mb-0">63 D\u01B0\u01A1ng B\xE1 Tr\u1EA1c. Qu\u1EADn 8</span>',
      description: "<p>T\u1EEB thi\u1EBFt k\u1EBF tinh t\u1EBF \u0111\u1EBFn \u0111\u1EA7y \u0111\u1EE7 ti\u1EC7n \xEDch. Mang \u0111\u1EBFn tr\u1EA3i nghi\u1EC7m th\u01B0 gi\xE3n tuy\u1EC7t \u0111\u1ED1i cho c\u1EA3 ngh\u1EC9 ng\u01A1i v\xE0 c\xF4ng vi\u1EC7c</p>",
      imageUrl: "/src/assets/location/dbt.jpg"
    },
    {
      title: '<span>NTG</span><span class="cs-ps-5 d-none d-md-inline-block">|</span><span class="cs-sm-ps-5 cs-fs-16 fw-400 cs-mb-0">47/51/19d Nguy\u1EC5n T\u01B0 Gi\u1EA3n. G\xF2 V\u1EA5p</span>',
      description: "<p>Kh\xF4ng gian nh\u1ECF xinh, phong c\xE1ch \u1EA5m c\xFAng, ch\u1EAFc ch\u1EAFn s\u1EBD l\xE0 n\u01A1i l\xFD t\u01B0\u1EDFng cho b\u1EA1n.</p>",
      imageUrl: "/src/assets/location/ntg.jpg"
    }
  ];
  const firstRoom = rooms[0];
  const remainingRoom = rooms.slice(1);
  return renderTemplate`${maybeRenderHead()}<section class="cs-py-80"> <div class="container"> <h2 class="text-center lt-05 fw-700 cl-yellow cs-fs-50 cs-mb-0">
Chi Nhánh Happy Time
</h2> <p class="text-center lh-18 cs-mb-0 cs-mt-20">
3 địa điểm trên nhiều quận cho bạn<br class="d-block d-md-none"> ghé thăm
      tại Thành phố Hồ Chí Minh
</p> <div class="row cs-gx-8 cs-lg-gx-24 cs-mt-40 cs-lg-mt-50"> <div class="col-6 cs-px-4 cs-lg-px-12 card-block-location-first"> ${renderComponent($$result, "CardRoomLocation", $$CardRoomLocation, { "roomLocations": [firstRoom] })} </div> <div class="col-6 cs-px-4 cs-lg-px-12 card-block-location-second"> ${renderComponent($$result, "CardRoomLocation", $$CardRoomLocation, { "roomLocations": remainingRoom })} </div> <div class="cus-button text-center cs-mt-40 cs-lg-mt-50"> <a href="/phong" class="button button-default sd-lg">Xem Chi Nhánh</a> </div> </div> </div> </section>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/home/RoomLocation.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Happy Studio - Netflix & Chill" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="main-section"> ${renderComponent($$result2, "Banner", $$Banner, {})} ${renderComponent($$result2, "RoomScale", $$RoomScale, {})} ${renderComponent($$result2, "RoomSlider", $$RoomSlider, {})} ${renderComponent($$result2, "RoomIntroduce", $$RoomIntroduce, {})} ${renderComponent($$result2, "RoomThanks", $$RoomThanks, { "imageUrl": "/src/assets/room-introduce.svg", "description": "V\u1EDBi mong mu\u1ED1n c\xF3 th\u1EC3 mang \u0111\u1EBFn cho b\u1EA1n nh\u1EEFng gi\xE1 tr\u1ECB t\u1ED1t h\u01A1n m\u1ED7i ng\xE0y, Home \u0111ang c\u1EA3i ti\u1EBFn ch\u01B0\u01A1ng tr\xECnh t\xEDch l\u0169y \u0111i\u1EC3m th\xE0nh vi\xEAn \u0111\u1EC3 b\u1EA1n c\xF3 th\u1EC3 nh\u1EADn nhi\u1EC1u \u01B0u \u0111\xE3i v\xE0 quy\u1EC1n l\u1EE3i \u0111\u1EB7c bi\u1EC7t m\u1ED7i khi s\u1EED d\u1EE5ng d\u1ECBch v\u1EE5." })} ${renderComponent($$result2, "RoomLocation", $$RoomLocation, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/archer/WithoutWorking/happy-studio/src/pages/index.astro", void 0);

const $$file = "/Users/archer/WithoutWorking/happy-studio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
