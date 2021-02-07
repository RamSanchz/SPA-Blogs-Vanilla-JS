export function Main() {
  const $main = document.createElement("main");
  $main.id = "main";

  /* cuando no exista "#/search en el hash coloca la clase " */
  if (!location.hash.includes("#/search")) $main.classList.add("grid-fluid");

  return $main;
}
