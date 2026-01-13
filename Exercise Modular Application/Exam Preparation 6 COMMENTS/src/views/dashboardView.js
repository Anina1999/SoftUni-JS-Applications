import { dataService } from "../service/dataService.js";
import { html, renderer } from "../utility/library.js";

const temp = (games) => html`
        <section id="catalog-page">
            <h1>All Games</h1>
            ${games?.length > 0 ? html`
            ${games.map(g => gameTemp(g))}`
            : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
    `

const gameTemp = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
`
export async function showDashboardView() {
    const data = await dataService.getAllGames();
    renderer(temp(data));
}