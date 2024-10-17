import { c as createComponent, d as renderTemplate, m as maybeRenderHead, f as addAttribute, u as unescapeHTML, g as createAstro, e as renderComponent } from './astro/server_D2uEBN04.mjs';
import 'kleur/colors';
import 'clsx';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_VRn61y4l.mjs';

const $$Astro$2 = createAstro();
const $$CardTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CardTitle;
  const {
    title,
    colorTitle = "cl-black",
    description,
    buttonText,
    buttonLink
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card-block-title"> <div class="card-block-title__inner d-flex flex-column"> ${title && renderTemplate`<h2${addAttribute(`title lt-05 fw-700 ${colorTitle} cs-fs-50 cs-mb-0`, "class")}>${unescapeHTML(title)}</h2>`} ${description && renderTemplate`<p class="description lh-18 cs-mb-0">${unescapeHTML(description)}</p>`} ${buttonText && buttonLink && renderTemplate`<div class="cus-button cs-mt-10 cs-mt-lg-20"> <a${addAttribute(buttonLink, "href")} class="button button-default sd-lg"> ${buttonText} </a> </div>`} </div> </div>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/CardTitle.astro", void 0);

const $$Astro$1 = createAstro();
const $$ThreeLine = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ThreeLine;
  const { position = "left" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`three-line d-flex flex-column ${position}`, "class")}> <div class="three-line__line"></div> <div class="three-line__line"></div> <div class="three-line__line"></div> </section>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/ThreeLine.astro", void 0);

const $$Astro = createAstro();
const $$RoomThanks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RoomThanks;
  const { description, imageUrl, logoColor = "white", textColor = "white", bgSectionColor = "#ffa62b" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="cs-pt-40 cs-lg-pt-70"> <div class="container position-relative"> <div class="cus-three-line d-none d-md-block"> ${renderComponent($$result, "ThreeLine", $$ThreeLine, { "position": "right" })} </div> <div class="room-thanks position-relative cs-py-40 cs-px-40 cs-lg-px-80"${addAttribute(`background: ${bgSectionColor}`, "style")}> <div class="row align-items-center"> <div class="col-lg-7 text-center text-lg-start"> <div class="cs-lg-pe-60"> <div class="cs-mb-30"> ${renderComponent($$result, "Image", $$Image, { "src": `/src/assets/happy-time-logo-${logoColor}-ver2.svg`, "alt": "Happy Studio, NetFlix & Chill", "width": 250, "height": 167, "class": "room-thanks__logo img-width" })} </div> <div${addAttribute(`cs-fs-16 cs-mb-0 lh-18 cl-${textColor}`, "class")}>${unescapeHTML(description || "")}</div> <!-- <div class="cus-button">
              <a href="#" class="button button-white cs-mt-20">Tìm Hiểu Thêm</a>
            </div> --> </div> </div> <div class="col-lg-5 d-none d-lg-block"> ${renderComponent($$result, "Image", $$Image, { "src": imageUrl || "", "alt": description || "Room Thanks Image", "width": 448, "height": 365, "quality": 30, "class": "room-thanks__img img-width" })} </div> </div> </div> </div> </section>`;
}, "/Users/archer/WithoutWorking/happy-studio/src/components/home/RoomThanks.astro", void 0);

export { $$RoomThanks as $, $$CardTitle as a, $$ThreeLine as b };
