import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (record, handler) => html`
        <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${handler}>
                <input
                  type="text"
                  name="model"
                  .value=${record.model}
                  id="model"
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  .value=${record.imageUrl}
                  id="moto-image"
                  placeholder="Moto Image"
                />
                <input
                type="number"
                name="year"
                .value=${record.year}
                id="year"
                placeholder="Year"
              />
              <input
              type="number"
              name="mileage"
              .value=${record.mileage}
              id="mileage"
              placeholder="mileage"
            />
            <input
              type="number"
              name="contact"
              .value=${record.contact}
              id="contact"
              placeholder="contact"
            />
              <textarea
                id="about"
                name="about"
                .value=${record.about}
                placeholder="about"
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
    `

let context = null;
export async function showEditView(ctx) {
    context = ctx;
    const id = ctx.params.id;

    try {
      const data = await dataService.getRecordById(id);
      renderer(temp(data, createSubmitHandler(onSubmit)));
    } catch (error) {
      window.alert(error.message);
    }
}

async function onSubmit(data, e) {
    e.preventDefault();
    const id = context.params.id;

    const { model, imageUrl, year, mileage, contact, about } = data;

    try {
        if (!model || !imageUrl || !year || !mileage || !contact || !about) {
            throw new Error('All fields are required!');
        } 

        await dataService.updateRecord(id, data);

        e.target.reset();
        context.updateNav();
        context.goTo(`/details/${id}`);
    } catch (error) {
        window.alert(error.message);
    }
}