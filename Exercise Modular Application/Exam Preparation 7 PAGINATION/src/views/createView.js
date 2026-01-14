import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
        <section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${handler}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>

              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

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

    const { name, imageUrl, category, description, price } = data;

    try {
        if (!name || !imageUrl || !category || !description || !price) {
            throw new Error('All fields are required!');
        }

        await dataService.createProduct(data);
        e.target.reset();
        context.updateNav();
        context.goTo('/dashboard');
    } catch (error) {
        window.alert(error.message)
    }
}