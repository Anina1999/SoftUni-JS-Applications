import { dataService } from "../service/dataService.js";
import { html, renderer } from "../utility/library.js";

const temp = (posts) => html`
 <h2>Fruits</h2>
        <section id="dashboard">
        ${posts?.length > 0 ? html`${posts.map(p => postTemp(p))}`
        : html`<h2>No fruit info yet.</h2>`}
        </section> 
        `
const postTemp = (post) => html`
    <div class="fruit">
        <img src=${post.imageUrl} alt=${post.name} />
        <h3 class="title">${post.name}</h3>
        <p class="description">${post.description}</p>
        <a class="details-btn" href="/details/${post._id}">More Info</a>
    </div>
`
let context = null;
export async function showDashboardView(ctx) {
    context = ctx;

    try {
        const data = await dataService.getAllPosts();

        renderer(temp(data));
    } catch (error) {
     window.alert(error.message);   
    }
}