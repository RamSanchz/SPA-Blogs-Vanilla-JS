import api from "./helpers/wp_api.js";
import { App } from "./App.js";

document.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});
/* este evento colgado del window es el que ayudara a que cada que haya un cambio en la url este cambie de contenido de la app */
