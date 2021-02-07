export function Post(props) {
  // console.log(props);
  let { content, date, title } = props;
  let dateForm = new Date(date).toLocaleString();
  return `
  <section class="post-page">
  <aside>
  <h2>${title.rendered}</h2>
  <time datetime="${date}">${dateForm}</time>
  </aside>
  <hr>
  <article>${content.rendered}</article>
  </section>
  `;
}
