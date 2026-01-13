import { dataService } from "../service/dataService.js";
import { html, renderer } from "../utility/library.js";

const temp = (posts) => html`
        <h2>Current Events</h2>
        <section id="dashboard">
          ${posts?.length > 0 ? html`
          ${posts.map(p => postTemp(p))}`
          : html`<h4>No Events yet.</h4>`}
        </section>
`

const postTemp = (post) => html`
        <div class="event">
            <img src=${post.imageUrl} alt=${post.name} />
            <p class="title">
              ${post.name}
            </p>
            <p class="date">${post.date}</p>
            <a class="details-btn" href="/details/${post._id}">Details</a>
          </div>
        `

export async function showDashboardView(ctx) {
    const data = await dataService.getAllEvents();
    renderer(temp(data));
}