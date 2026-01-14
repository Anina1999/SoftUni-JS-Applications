import { dataService } from "../service/dataService.js";
import { html, renderer } from "../utility/library.js";

const temp = (posts) => html`
        <h3 class="heading">Our Cars</h3>
        <section id="dashboard">
          ${posts?.length > 0 ? html`
          ${posts.map(p => postTemp(p))}`
          : html`<h3 class="nothing">Nothing to see yet</h3>`}
        </section>       
        `

const postTemp = (post) => html`
    <div class="car">
        <img src=${post.imageUrl} alt=${post.model}/>
        <h3 class="model">${post.model}</h3>
        <div class="specs">
          <p class="price">Price: €${post.price}</p>
          <p class="weight">Weight: ${post.weight} kg</p>
          <p class="top-speed">Top Speed: ${post.speed} kph</p>
        </div>
        <a class="details-btn" href="/details/${post._id}">More Info</a>
      </div>
    `

export async function showDashboardView(ctx) {
    const data = await dataService.getAllPosts();
    renderer(temp(data));
}