import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (event, handler) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form" @submit=${handler}>
              <input
                type="text"
                name="name"
                .value=${event.name}
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${event.imageUrl}
                id="event-image"
                placeholder="Event Image"
              />
              <input
                type="text"
                name="category"
                .value=${event.category}
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                .value=${event.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              .value=${event.date}
              id="date"
              placeholder="When?"
            />

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
        const data = await dataService.getEventById(id);
        renderer(temp(data, createSubmitHandler(onSubmit)));  
    } catch (error) {
        window.alert(error.message);
    }
}

async function onSubmit(data, e) {
    e.preventDefault();

    const id = context.params.id;
    const { name, imageUrl, category, description, date } = data;

    if (!name || !imageUrl || !category || !description || !date) {
        return alert('All fields are required');
    }

    await dataService.updateEvent(id, data);
    context.updateNav();
    context.goTo(`/details/${id}`);
}
