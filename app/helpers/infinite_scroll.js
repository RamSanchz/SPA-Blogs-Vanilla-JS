import api from "./wp_api.js";
import { ajax } from "./ajax.js";
import { SearchCard } from "../componets/SearchCard.js";
import { PostCard } from "../componets/PostCard.js";

export async function InfiniteScroll() {
  const d = document,
    w = window;

  let query = localStorage.getItem("wpSearch"),
    apiURL,
    Component; //esta guardara un componente por eso se declara con mayuscula al principio

  w.addEventListener("scroll", async (e) => {
    let { scrollTop, clientHeight, scrollHeight } = d.documentElement,
      /* la etiqueta HTML tiene 3 atributos que nos sirven, secrolltop- lo que me voy separando en el scroll del top, clientHeight- lo que mide mi ventana del viweport y scrollHeight- lo que mide en total de alto mi scroll */

      { hash } = w.location;
    /* el has es necesario para saber a donde se hara la peticion, si a postcard o searchcard */

    // console.log(scrollTop, clientHeight, scrollHeight, hash);

    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      api.page++;
      if (!hash || hash === "#/") {
        // console.log(api.page);
        apiURL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search")) {
        // console.log(api.page);
        apiURL = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }

      d.querySelector(".loader").style.display = "block";

      await ajax({
        url: apiURL,
        cbSuccess: (posts) => {
          // console.log(posts);
          let html = "";

          posts.forEach((post) => (html += Component(post)));
          d.getElementById("main").insertAdjacentHTML("beforeend", html);
          d.querySelector(".loader").style.display = "none";
        },
      });
    }
  });
}
