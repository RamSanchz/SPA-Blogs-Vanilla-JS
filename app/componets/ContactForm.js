export function ContactForm() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");

  $styles.innerHTML = ` 
    html {
      box-sizing: border-box;
      /**** tamaño de la caja*/
      font-family: sans-serif;
      font-size: 16px;
    }

    /*Hacemos que todos los elementos del HTML hereden el box-sizing*/
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    /*quitamos el margen que traen por defecto todos los navegadores*/
    body {
      margin: 0;
      overflow-x: hidden;
      /*para que todo lo que se desborde del horizontal se esconda y no se genere la barra de desplazamiento*/
    }


    /*************** ContactForm Validations  ************/

    .contact-form {
      --form-ok-color: #4caf50;
      --form-error-color: #f44336;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }

    .contact-form>* {
      /* >* significa que todos los hijos directos de .contact-form recibiran este formato*/
      padding: 0.5rem;
      margin: 1rem auto;
      display: block;
      width: 100%;
    }

    .contact-form textarea {
      resize: none;
      /* los text area por defecto se pueden redimencionar desde el viweport  esto es para que ya no se pueda y queden fijos */
    }

    .contact-form legend,
    .contact-form-response {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
    }

    .contact-form input,
    .contact-form textarea {
      font-size: 1rem;
      font-family: sans-serif;
    }

    .contact-form input[type="submit"] {
      /* de este modo hacemos una seleccion por tipo de atributo especifico en css */
      width: 50%;
      font-weight: bold;
      cursor: pointer;
    }

    .contact-form *::placeholder {
      /* a todos los elementos que tengan el atributo placeholder */
      color: #696980;
    }

    .contact-form [required]:valid {
      /* todos lod hijos que tengan el atributo requied y que el contenido sea valido */
      border: thin solid var(--form-ok-color);
    }

    .contact-form [required]:invalid {
      /* valid e invalid son pseudocodigos de css que actuan deacuerdo a contenido escrito dentro de los input este contenido debe de cumplir con el atributo pattern de html */
      border: thin solid var(--form-error-color);
    }

    .contact-form-error {
      margin-top: -1rem;
      font-size: 80%;
      background-color: var(--form-error-color);
      color: #ffffff;
      transition: all 800ms ease;
    }

    .contact-form-error.is-active {
      display: block;
      animation: show-message 1s 1 normal 0s ease-in-out both;
      /* crearemos una animaciond de nombre show-message la cual durara 1s solo se repetira 1 vez a velocidad normal con 0s de retraso efecto ease-in-out y esta cuando finalice conservara los estilos con los que termina both */
    }

    .contac-form-loader {
      text-align: center;
    }

    .none {
      display: none;
    }

    /* creamos la animacion */
    @keyframes show-message {
      0% {
        visibility: hidden;
        opacity: 0;
      }

      100% {
        visibility: visible;
        opacity: 1;
      }
    }`;

  $form.classList.add("contact-form");

  $form.innerHTML = ` 
  <legend>Envianos tus comentarios</legend>
    <input type="text" name="name" placeholder="Escribe tu nombre"
      title="Nombre solo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñáéíóúÁÉÍÓÚ\\s]+$" required>
    <input type="email" name="email" placeholder="Escribe tu Email" title="Email incorrecto"
      pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
    <input type="text" name="subject" placeholder="Asunto a tratar" title="El asunto es requerido" required>
    <textarea name="comemnts" id="" cols="50" rows="5" placeholder="Escribe tus comentarios" data-pattern="^.{1,255}$"
      title="Tu comentario no debe exceder los 255 caracteres" required></textarea>
    <input type="submit" value="Enviar">
    <div class="contac-form-loader none">
      <img src="app/assets/loader.svg" alt="Cargando">
    </div>
    <div class="contact-form-response none">
      <p>Los datos han sido enviados</p>
    </div>`;

  function validationsForm() {
    const $form = d.querySelector(".contact-form"),
      $inputs = d.querySelectorAll(".contact-form [required]"); // traera todos los input dentrod del formulario que tengan el atributo required

    // console.log($inputs);

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contact-form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;
        /* dentro de la variable pattern vamos a guardar el valor del pattern en nuestros input, en caso de que no lo tenga(nuetro text-area ya que no es valido para este tipo de input va a tomar el data atributo , .dataset es para acceder a la lista de data atributos que podria tener y seleccionamos pattern) */

        // console.log($input, pattern);
        if (pattern && $input.value !== "") {
          // console.log("el input tiene patron");
          let regex = new RegExp(pattern); //creamos una nueva exprecion regular con el valor que trae nuestra variable pattern
          return !regex.exec($input.value) //comparamos que la expresion no coincida con lo que se escribe en el input
            ? d.getElementById($input.name).classList.add("is-active") // si se cumple  que no coincide obtenemos el nombre de nuestro input y el id del span y le agregamos la clase del error activo
            : d.getElementById($input.name).classList.remove("is-active"); //cuando  no se cumple y coincide le quitamos el error
        }
        if (!pattern) {
          // console.log("el input NO tiene patron");
          return $input.value === ""
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });

    /* submit es el evento que procesa los formularios */
    d.addEventListener("submit", (e) => {
      e.preventDefault(); //se previene el default por que sino procesa los datos del formulario y de momento no estamos trabajando con apirest
      // alert("Enviando Formulario");

      const $loader = d.querySelector(".contac-form-loader"),
        $response = d.querySelector(".contact-form-response");

      $loader.classList.remove("none");

      //peticion FETCH(URL, {OPCIONES})
      fetch("https://formsubmit.co/ajax/dosek1996@gmail.com", {
        method: "POST",
        body: new FormData(
          e.target
        ) /* el formData internamente parsea todos los elementos que traiga el formulario, para que lo haga todos los inputs tienen que tener su atributo name establecido por que el name es el nombre de la variable cuando se envia el forulario */,
      })
        /* formsubmit devuelve la respuesta en JSON, si nuestra respuesta tiene estatus ok entonces convertira la respuesta de JSON a JS sino rechazara la respuesta directo al catch */
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          //ya se envio el formulario solo ponemos el loader y el mensaje
          $loader.classList.add("none");
          $response.classList.remove("none");
          $response.innerHTML = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let messaje =
            err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
          $response.innerHTML = `<p>Error ${err.status}: ${messaje}</p>`;
        })
        .finally(() => {
          setTimeout(() => $response.classList.add("none"), 3000);
        });
    });
  }

  /* se coloca dentro de un setTimeout la invocacion que hace la validacion del formulario ya que sino marca un error debido a que no puede acceder a los nodos del DOM  que aun no se encuentran cargados esta mini demora le dara tiempo a todos los elementos del DOM que componen el formulario de cargar y posteriormente ya sera invocada */
  setTimeout(() => validationsForm(), 100);

  return $form;
}
