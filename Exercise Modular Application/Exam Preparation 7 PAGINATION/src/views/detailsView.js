import { dataService } from "../service/dataService.js";
import { html, nothing, renderer } from "../utility/library.js";
import { userUtils } from "../utility/userUtils.js";

const temp = (product, userId, hasOwner, isLogged, buyCounter, onClick) => html`
        <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src=${product.imageUrl}
              alt=${product.name}
            />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${buyCounter}</span> times.</h4>
                <span>${product.description}</span>
              </div>
            </div>
            ${hasOwner ? html`
            <div id="action-buttons">
                <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                <a href="/delete/${product._id}" id="delete-btn">Delete</a>
            </div>`
            : (isLogged ? html`
            <div id="action-buttons">
                <a href="/buy/${product._id}" id="buy-btn" @click=${onClick} data-user="${userId}">Buy</a>
            </div>`
        : nothing)}
          </div>
        </section>
    `
let context = null;

export async function showDetailsView(ctx) {
  context = ctx;
  const id = ctx.params.id;

  const product = await dataService.getProductById(id);
  const isLogged = Boolean(userUtils.getAccessToken());
  const userId = userUtils.getUserId();
  const hasOwner = userId === product._ownerId;

  const buyCounter = await dataService.getTotalBuys(id);
  renderer(temp(product, userId, hasOwner, isLogged, buyCounter, onClick));
}

async function onClick(e) {
    e.preventDefault();
    const id = context.params.id;

    await dataService.addBuys(id);

    const newCount = await dataService.getTotalBuys(id);

    e.target.style.display = 'none';

    const productSpan = document.getElementById('buys');
    if (productSpan) {
        productSpan.textContent = newCount;
    }
}