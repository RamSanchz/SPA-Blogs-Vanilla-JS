import { Loader } from "./componets/Loader.js";
import { Header } from "./componets/Header.js";
import { Main } from "./componets/Main.js";
import { Router } from "./componets/Router.js";
import { InfiniteScroll } from "./helpers/infinite_scroll.js";

export function App() {
  const $root = document.getElementById("root");

  $root.innerHTML = null; /* este limpia el contenido de root cada que se carga de nuevo debido a algun cambio en el hash, esto evita que se duplique contenido */
  $root.appendChild(Header());
  $root.appendChild(Main());
  $root.appendChild(Loader());
  Router();
  InfiniteScroll();
}
