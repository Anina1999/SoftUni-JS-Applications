import { html, nothing, renderer } from '../utility/library.js';
import { dataService } from '../service/dataService.js';
import { createSubmitHandler } from '../utility/createSubmitHandler.js';

const temp = (show, handler) => html`
    <section id="edit">
      <div class="form">
        <h2>Edit Show</h2>
          <form class="edit-form" @submit=${handler} data-id=${show._id}>
            <input type="text" name="title" id="title" placeholder="TV Show title" .value=${show.title}/>
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${show.imageUrl}/>
            <input type="text" name="genre" id="genre" placeholder="Genre" .value=${show.genre}/>
            <input type="text" name="country" id="country" placeholder="Country" .value=${show.country}/>
            <textarea id="details" name="details" placeholder="Details" rows="2" cols="10" .value=${show.details}></textarea>
            <button type="submit">Edit Show</button>
            </form>
          </div>
        </section>
`;

let context = null;

export async function showEditView(ctx) {
  context = ctx;
  const id = ctx.params.id;

  try {
    const currentShow = await dataService.getShowById(id);

    renderer(temp(currentShow, createSubmitHandler(onEditSubmit)));
  } catch (err) {
    alert('This show does not exist.');
    return ctx.goTo('/dashboard');
  }
}

async function onEditSubmit(data, e) {
  e.preventDefault();
  const form = e.target;
  const id = form.dataset.id;

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const imageUrl = formData.get('image-url').trim(); 
  const genre = formData.get('genre').trim();
  const country = formData.get('country').trim();
  const details = formData.get('details').trim();

  if (!title || !imageUrl || !genre || !country || !details) {
    alert('All fields are required!');
    return;
  }

  try {
    await dataService.editShow(id, { title, imageUrl, genre, country, details });
    context.goTo(`/details/${id}`);
  } catch (err) {
    alert(err.message);
  }
}