import { dataService } from "../service/dataService.js";
import { html, nothing, renderer } from "../utility/library.js";

const temp = (isSearch, items) => html`
<section id="search">
  <div class="form">
    <h2>Search</h2>
    <form class="search-form" @submit=${onSearch}>
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
    <h4>Results:</h4>
      <div class="search-result">
        ${isSearch ? searchResultTemp(items) : nothing}
      </div>
</section>
`

const searchResultTemp = (items) => html`
    ${(Array.isArray(items) && items.length > 0)
        ? items.map(item => showTemp(item)) :
        html`<p class="no-result">There is no TV show with this title</p>`
      }`

const showTemp = (item) => html`
      <div class="show">
              <img src=${item.imageUrl} alt="example1"/>
              <div class="show">
                <h3 class="title">${item.title}</h3>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="country-of-origin">Country of Origin: ${item.country}</p>
                <a class="details-btn" href="/details/${item._id}">Details</a>
              </div>
            </div>`

let context = null;
export function showSearchView(ctx) {
  context = ctx;
  renderer(temp(false, []));
}

async function onSearch(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const query = formData.get("search").trim();

  if (!query) return;

  const result = (await dataService.searchShows(query)) || [];
  renderer(temp(true, result));
}