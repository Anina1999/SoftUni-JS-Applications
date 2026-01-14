import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (product, handler) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${handler}>
              <input
                type="text"
                name="name"
                .value=${product.name}
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${product.imageUrl}
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                .value=${product.category}
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                .value=${product.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>

              <input
                type="text"
                name="price"
                .value=${product.price}
                id="product-price"
                placeholder="Price"
              />
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
        const data = await dataService.getProductById(id);
        renderer(temp(data, createSubmitHandler(onSubmit)));  
    } catch (error) {
        window.alert(error.message);
    }
}

async function onSubmit(data, e) {
    e.preventDefault();

    const id = context.params.id;
    const { name, imageUrl, category, description, price } = data;

    if (!name || !imageUrl || !category || !description || !price) {
        return alert('All fields are required');
    }

    await dataService.updateProduct(id, data);
    context.updateNav();
    context.goTo(`/details/${id}`);
}
