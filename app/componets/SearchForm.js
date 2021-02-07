export function SearchForm() {
  const d = document,
    $form = d.createElement("form"),
    $input = d.createElement("input");

  $form.classList.add("search-form");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Buscar...";
  $input.autocomplete = "off";

  $form.appendChild($input);

  if (location.hash.includes("#/search")) {
    $input.value = localStorage.getItem("wpSearch");
  }

  /* el evento search es el que se desencadena cuando se borra la info del input type search */
  d.addEventListener("search", (e) => {
    /* si el evento que no se desata en el input no hagas nada */
    if (!e.target.matches("input[type='search']")) return false;

    /* si el evento no tiene valor (osea cuando se borra el contenido ) entonces elimita la variable que almacena el valor que el input en el local storage  */
    if (!e.target.value) localStorage.removeItem("wpSearch");
  });

  d.addEventListener("submit", (e) => {
    if (!e.target.matches(".search-form")) return false;

    e.preventDefault();
    /* creamos una variable de ambito localstorage que nos guardara e valor que se escriba ane el input */
    localStorage.setItem("wpSearch", e.target.search.value);
    /* del mismo modo cambiaremos la url colocando la variable search = a lo que se escribio en el input */
    location.hash = `#/search?search=${e.target.search.value}`;
  });

  return $form;
}
