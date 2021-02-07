/** @format */

export function Menu() {
  const $menu = document.createElement("nav");
  $menu.classList.add("menu");
  $menu.innerHTML = `
  <a href="#/">Home</a>
  <span>-</span>
  <a href="#/search">Búsqueda</a>
  <span>-</span>
  <a href="#/contacto">Contacto</a>
  <span>-</span>
  <a href="#" target="_blank" rel="noopener">Cambia de Blog</a>
  `;
  return $menu;
}
