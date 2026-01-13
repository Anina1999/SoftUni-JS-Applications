import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
        <section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form" @submit=${handler}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
    `

    let context = null;

export async function showCreateView(ctx) {
    context = ctx;
    renderer(temp(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, e) {
    const { name, imageUrl, category, description, date } = data;

    try {
        if (!name || !imageUrl || !category || !description || !date) {
            throw new Error('All fields are required!');
        }

        await dataService.createEvent(data);

        e.target.reset();
        context.updateNav();
        context.goTo('/dashboard');
    } catch (error) {
        window.alert(error.message);
    }
}