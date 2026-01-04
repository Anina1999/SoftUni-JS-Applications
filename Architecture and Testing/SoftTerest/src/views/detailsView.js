import { dataService } from "../api/dataService.js";
import { userUtils } from "../utils/userUtils.js";

const section = document.querySelector('div[data-section="details"]');
const main = document.querySelector('main');

let context = null;
 
export async function showDetailsView(ctx, params) {
    context = ctx;
    const id = params[0];
    main.replaceChildren(section);
    const idea = await dataService.getIdeaById(id);

    const hasOwner = userUtils.hasOwner(idea._ownerId);
    section.innerHTML = createTemplate(idea, hasOwner);
    hasOwner && section.querySelector('a').addEventListener('click', onDelete);
}

function createTemplate(idea, hasOwner) {
    return `
    <img class="det-img" src=${idea.img} />
        <div class="desc">
            <h2 class="display-5">${idea.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${idea.description}</p>
        </div>
        <div class="text-center">
            ${hasOwner ? `<a class="btn detb" data-id="${idea._id}" href="">Delete</a>` : ''}
            
        </div>
    `
}

async function onDelete(e) {
    const id = e.target.dataset.id;
    e.preventDefault();
    dataService.deleteIdea(id);

    context.goTo('/dashboard');
}