import { html, renderer } from "../utility/library.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { dataService } from "../service/dataService.js";

const temp = (handler, post) => html`
        <section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form class="edit-form" @submit=${handler}>
              <input type="text" name="model" .value=${post.model} id="model" placeholder="Model" />
              <input
                type="text"
                name="imageUrl"
                .value=${post.imageUrl}
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                .value=${post.price}
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                .value=${post.weight}
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                .value=${post.speed}
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                .value=${post.about}
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Edit</button>
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

    const { model, imageUrl, price, weight, speed, about } = data;

    try {
        if (!model || !imageUrl || !price || !weight || !speed || !about) {
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