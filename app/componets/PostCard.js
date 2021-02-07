export function PostCard(props) {
  let { date, id, title, slug, _embedded } = props;
  let dateFormat = new Date(date).toLocaleString(),
    urlPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "app/assets/favicon.jpg";

  /* a traves del evento click guardaremos en una variable del local storage el valor del id (el id se guardo en un data atribute que se coloco en el linkx) para que despues nos permita ser usado para acceder al contenido de los post a travez del id */
  document.addEventListener("click", (e) => {
    /* cuando no se de click en un enlace dentro de la post-card retornara falso  */
    if (!e.target.matches(".post-card a")) return false;

    localStorage.setItem("wpPostId", e.target.dataset.id);
    /* localStorage.setItem("nombre de la variable", valor); */
  });

  return `
  <article class="post-card">
  <img src="${urlPoster}" alt="${title.rendered}">
  <h2>${title.rendered}</h2>
  <p>
  <time datetime="${date}">${dateFormat}</time>
  <a href="#/${slug}" data-id="${id}">Ver Publicación</a>
  </p>
  </article>
  `;
}
