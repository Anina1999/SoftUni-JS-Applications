import { dataService } from "../service/dataService.js";
import { html, nothing, renderer } from "../utility/library.js";
import { userUtils } from "../utility/userUtils.js";

const temp = (hasOwner, event, isLogged, userId, goCounter, onClick) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${event.imageUrl} alt=${event.name} />
            <p id="details-title">${event.name}</p>
            <p id="details-category">
              Category: <span id="categories">${event.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${event.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span
                  >${event.description}</span>
              </div>
            </div>

            <h3>Going: <span id="go">${goCounter}</span> times.</h3>
            <div id="action-buttons">
            ${hasOwner ? html`
              <a href="/edit/${event._id}" id="edit-btn">Edit</a>
              <a href="/delete/${event._id}" id="delete-btn">Delete</a>
              ` : html`${isLogged? html`
                <a href="" id="go-btn" @click=${onClick} data-user="${userId}">Going</a>`
              : nothing}`}
              </div>
            </div>
          </div>
        </section>
    `

let context = null;
let goCounter = 0;

export async function showDetailsView(ctx) {
  context = ctx;
  const eventId = ctx.params.id;

  const event = await dataService.getEventById(eventId);
  const isLogged = userUtils.getAccessToken();
  const userId = userUtils.getUserId();
  const hasOwner = userId === event._ownerId;

  goCounter = await dataService.getTotalGoing(eventId);

  renderer(temp(hasOwner, event, isLogged, userId, goCounter, onClick));
}

async function onClick(e) {
  e.preventDefault();
  const eventId = context.params.id;

  await dataService.sendGoing(eventId);

  goCounter = await dataService.getTotalGoing(eventId);

  e.target.style.display = 'none';

  const goSpan = document.getElementById('go');
  if (goSpan) goSpan.textContent = goCounter;
}

