import { dataService } from "../api/dataService.js";

const section = document.querySelector('div[data-section="create"]');
const main = document.querySelector('main');

let context = null;

export function showCreateView(ctx) {
    context = ctx;
    main.replaceChildren(section);
    document.querySelector('form').addEventListener('submit', onSubmit);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { title, description, imageURL } = Object.fromEntries(formData);

    if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
        return;
    }

   await  dataService.create({ title, description, img: imageURL});
   //to clear formdata
   context.goTo('/dashboard');
}