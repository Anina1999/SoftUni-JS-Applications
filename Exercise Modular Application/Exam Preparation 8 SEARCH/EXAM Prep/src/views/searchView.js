import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (post, handler, matches) => html`
    <section id="search">
      <div class="form" @submit=${handler}>
        <h4>Search</h4>
        <form class="search-form">
          <input type="text" name="search" id="search-input" />
          <button class="button-list">Search</button>
        </form>
      </div>
      <div class="search-result">
        ${matches === false 
            ? html`<h2 class="no-avaliable">No result.</h2>` 
            : post.map(p => postTemp(p))
        }
      </div>
    </section>
    `;

const postTemp = (post) => html`
        <div class="car">
          <img src=${post.imageUrl} alt=${post.model}/>
          <h3 class="model">${post.model}</h3>
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

        const result = await dataService.searchPosts(query);
        renderer(temp(result, createSubmitHandler(onSubmit), result.length > 0));
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
}