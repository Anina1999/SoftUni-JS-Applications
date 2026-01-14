import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (post, handler, matches) => html`
    <section id="search">
        <div class="form">
          <h2>Search</h2>
          <form class="search-form" @submit=${handler}>
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4>Results:</h4>
          <div class="search-result">
            ${matches === false 
            ? html`<p class="no-result">No result.</p>` 
            : post.map(p => postTemp(p))
            }
        </div>
    </section>
    `;

const postTemp = (post) => html`
        <div class="fruit">
          <img src=${post.imageUrl} alt=${post.name} />
          <h3 class="title">${post.name}</h3>
          <p class="description">${post.description}</p>
          <a class="details-btn" href="/details/${post._id}">More Info</a>
        </div>`


export function showSearchView() {
    renderer(temp([], createSubmitHandler(onSubmit), false));
}

async function onSubmit(data, e) {
    try {
        const query = data.search?.trim();

        if (!query) {
            throw new Error('Please fill the field!');
        }

        const result = await dataService.searchPost(query);
        renderer(temp(result, createSubmitHandler(onSubmit), result.length > 0));
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
}