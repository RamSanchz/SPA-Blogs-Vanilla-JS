export async function ajax(props) {
  let { url, cbSuccess } = props;
  /* si tuieras que usar mas metodos puedes poder dentro del objeto las configuraciones, en este caso solo seran requeridas la url, la callback en caso de exito y la de error la manejaremos como un codigo generico, ya que solo haremos peticiones get */

  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((err) => {
      let message = err.statusText || "Ocurrió un Error al Conectar con la API";

      document.getElementById("main").innerHTML = `
    <div class="error">
    <p>Error ${err.status}: ${message}</p>
    </div>
    `;
      document.querySelector(".loader").style.display = "none";
      console.log(err);
    });
}
