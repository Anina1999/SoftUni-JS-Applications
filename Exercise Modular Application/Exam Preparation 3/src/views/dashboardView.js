import { html, renderer } from '../utility/library.js';
import { dataService } from '../service/dataService.js';

const temp = (data) => html`
<h2>Users Recommendations</h2>
<section id="shows">
        ${data.length > 0 
        ? data.map(show => showTemp(show))
        : html`<h2 id="no-show">No shows Added.</h2>`}
</section>
`;

const showTemp = (show) => html`
<div class="show">
    <img src=${show.imageUrl} alt=${show.title} />
    <div class="show-info">
        <h3 class="title">${show.title}</h3>
        <p class="genre">${show.genre}</p>
        <p class="country-of-origin">${show.country}</p>
        <a class="details-btn" href="/details/${show._id}">Details</a>
    </div>
</div>
`;

export async function showDashboardView(ctx) {
    const data = await dataService.getAllShows();
    renderer(temp(data));
}