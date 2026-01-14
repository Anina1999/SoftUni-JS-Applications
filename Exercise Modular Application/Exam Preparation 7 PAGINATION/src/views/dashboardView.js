import { dataService } from "../service/dataService.js";
import { html, renderer } from "../utility/library.js";

const temp = (products) => html`
        <h2>Products</h2>
        <section id="dashboard">
            ${products?.length > 0 ? html`
            ${products.map(p => productTemp(p))}`
            : html`<h2>No products yet.</h2>`} 
    `

const productTemp = (product) => html`
        <div class="product">
            <img src=${product.imageUrl} alt=${product.name} />
            <p class="title">${product.name}</p>
            <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
            <a class="details-btn" href="/details/${product._id}">Details</a>
        </div>
    `
let context = null;
export async function showDashboardView(ctx) {
    context = ctx;

    try {
        const data = await dataService.getAllProducts();

        if (!data) {
            throw new Error('Error: No products!')
        }

        renderer(temp(data));

    } catch (error) {
        window.alert(error.message)
    }
}