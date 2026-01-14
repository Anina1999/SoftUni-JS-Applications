import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
<section id="create">
          <div class="form" @submit=${handler}>
            <h2>Add Fruit</h2>
            <form class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
    `
let context = null;
export async function showCreateView(ctx) {
  context = ctx;
    renderer(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, e) {
  e.preventDefault();
  
  try {
        const { name, imageUrl, description, nutrition } = data;

        if (!name || !imageUrl || !description || !nutrition) {
            throw new Error('All fields are required!');
        }

        await dataService.createPost(data);
        e.target.reset();
        context.updateNav();
        context.goTo('/dashboard');
    } catch (error) {
        window.alert(error.message);
    }
}