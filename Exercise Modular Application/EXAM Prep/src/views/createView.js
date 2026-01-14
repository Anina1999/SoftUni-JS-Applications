import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
        <section id="create">
          <div class="form form-auto">
            <h2>Share Your Car</h2>
            <form class="create-form" @submit=${handler}>
              <input type="text" name="model" id="model" placeholder="Model"/>
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
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

  const { model, imageUrl, price, weight, speed, about } = data;

  try {
    if (!model || !imageUrl || !price || !weight || !speed || !about) {
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