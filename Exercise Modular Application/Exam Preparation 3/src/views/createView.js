import { dataService } from '../service/dataService.js';
import { createSubmitHandler } from '../utility/createSubmitHandler.js';
import { html, renderer } from '../utility/library.js';

let context = null;

const temp = (handler) => html`
<section id="create">
  <div class="form">
    <h2>Add Show</h2>
    <form @submit=${handler} class="create-form">
      <input type="text" name="title" id="title" placeholder="TV Show title" />
      <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
      <input type="text" name="genre" id="genre" placeholder="Genre" />
      <input type="text" name="country" id="country" placeholder="Country" />
      <textarea id="details" name="details" placeholder="Details" rows="2" cols="10"></textarea>
      <button type="submit">Add Show</button>
    </form>
  </div>
</section>
`;

export function showCreateView(ctx) {
    context = ctx;
    renderer(temp(createSubmitHandler(addShow)));
}

async function addShow(data, e) {
    const { title, ["image-url"]: imageUrl, genre, country, details } = data;

    if (!title || !imageUrl || !genre || !country || !details) {
        window.alert('All fields are required!');
        return;
    }

    try {
        const show = await dataService.createShow({ title, imageUrl, genre, country, details });
        context.updateNav();
        context.goTo('/dashboard');
        e.target.reset();
    } catch (error) {
        window.alert(error.message);
    }
}