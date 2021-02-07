import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import { ContactForm } from "./ContactForm.js";

export async function Router() {
  /* se volvio asincrono tanto el componente Router como nuestra funcion ajax, recuerda que una spa es por naturaleza asincrona por lo tanto es logico que tanto nuestro Router que es el que manejara el contenido como nuestra funcion que hace la peticion al servidor sean asincronos para tener un mejor control */
  const d = document,
    w = window,
    $main = d.getElementById("main");

  let {
    hash,
  } = location; /* el hash se coloco en la propiedad del href de nuestros enlaces, destructuramos el atributo has de location y lo comparamos, usando el evento hashchange este detectara cada que haya un cambio en la url y cada que haya cambio hash tendra diferentes valores, cuando estos coincidan con los que tenemos en los href entonces nos mostrara el contenido de cada seccion  */
  // console.log(hash);

  $main.innerHTML = null; /* esto se hace por buenas practicas para que antes de comenzar a cargar empiece desde 0 */

  if (!hash || hash === "#/") {
    await ajax({
      /* le indicamos que este tiene que esperar hasta recibir la respuesta para que posteriormente salte a lo que sigue de otro modo ocultara de inmediato el loader y no aparecera ya que no espera la respuesta para continuar con el codigo, recuerda que js por defecto es asincrono */
      url: api.POSTS,
      cbSuccess: (posts) => {
        // console.log(posts);
        let html = "";
        posts.forEach((post) => (html += PostCard(post)));
        $main.innerHTML = html;

        // console.log(posts);
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");

    if (!query) {
      d.querySelector(".loader").style.display = "none";
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        // console.log(search);
        let html = "";
        if (search.length === 0) {
          html = `
            <p class="error">
            No existen resultados de búsqueda para el termino <mark>${query}</mark>
            </p>
          `;
        } else {
          search.forEach((post) => (html += SearchCard(post)));
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contacto") {
    $main.appendChild(ContactForm());
  } else {
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      /* para entrar en un post solo la url nos pide que este tiene que llevar el id del post, nosotros ya lo habiamos guardado en una variable del LocalStorage localStorage.getItem("nombre de la variable"), de este modo obtenemos el valor de la variable que se guardo */
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }

  d.querySelector(".loader").style.display = "none";
}
