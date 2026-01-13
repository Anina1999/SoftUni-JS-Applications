import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (record, handler, matches) => html`
<section id="search">
    <div class="form">
        <h4>Search</h4>
        <form class="search-form" @submit=${handler}>
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
    </div>

    <h4 id="result-heading">Results:</h4>

    <div class="search-result">
        ${matches === false 
            ? html`<h2 class="no-avaliable">No result.</h2>` 
            : record.map(r => recordTemp(r))
        }
    </div>
</section>
`;

const recordTemp = (rec) => html`
        <div class="motorcycle">
            <img src=${rec.imageUrl} alt=${rec.model} />
            <h3 class="model">${rec.model}</h3>
            <a class="details-btn" href="/details/${rec._id}">More Info</a>
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

        const result = await dataService.searchRecord(query);
        renderer(temp(result, createSubmitHandler(onSubmit), result.length > 0));
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
}