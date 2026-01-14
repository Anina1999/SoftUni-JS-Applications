import { dataService } from "../service/dataService.js";
import { html, nothing, renderer } from "../utility/library.js";
import { userUtils } from "../utility/userUtils.js";

const temp = (post, hasOwner) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${post.imageUrl} alt=${post.name} />
            <p id="details-title">${post.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${post.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${post.nutrition}</p>
              </div>
            ${hasOwner ? html`
                <div id="action-buttons">
                    <a href="/edit/${post._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${post._id}" id="delete-btn">Delete</a>
                </div>` : nothing}
            </div>
        </div>
      </section>
    `
let context = null;
export async function showDetailsView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    try {
        const post = await dataService.getPostById(id);
        const userId = userUtils.getUserId();
        const hasOwner = userId === post._ownerId;
        if (!post) {
            throw new Error('No such post');
        }
        renderer(temp(post, hasOwner));
    } catch (error) {
        window.alert(error.message);
    }
}