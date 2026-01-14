import { html, renderer } from "../utility/library.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { dataService } from "../service/dataService.js";

const temp = (handler, post) => html`
    <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${handler}>
              <input
                type="text"
                name="name"
                .value=${post.name}
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${post.imageUrl}
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                .value=${post.description}
                placeholder="Description"
                rows="10"
                cols="50"
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                .value=${post.nutrition}
                placeholder="Nutrition"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `

let context = null;
export async function showEditView(ctx) {
    context = ctx;
    const id = ctx.params.id;

    try {
      const data = await dataService.getPostById(id);
      renderer(temp(createSubmitHandler(onSubmit), data));
    } catch (error) {
      window.alert(error.message);
    }
}

async function onSubmit(data, e) {
    e.preventDefault();
    const id = context.params.id;

    const { name, imageUrl, description, nutrition } = data;

    try {
        if (!name || !imageUrl || !description || !nutrition) {
            throw new Error('All fields are required!');
        }

        await dataService.updatePost(id, data);

        e.target.reset();
        context.updateNav();
        context.goTo(`/details/${id}`);
    } catch (error) {
        window.alert(error.message);
    }
}