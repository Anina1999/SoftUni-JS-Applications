import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
        <section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${handler}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="number"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
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

  const { model, imageUrl, year, mileage, contact, about } = data;

  try {
    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
      throw new Error('All fields are required!');
    }

    await dataService.createRecord(data);

    e.target.reset();
    context.updateNav();
    context.goTo('/dashboard');
  } catch (error) {
    window.alert(error.message);
  }

  
}