import { dataService } from '../service/dataService.js';
import { html, nothing, renderer } from '../utility/library.js';
import { userUtils } from '../utility/userUtils.js';

const temp = (show, hasOwner, onDelete) => html`
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${show.imageUrl} alt="example1" />
    <div id="details-text">
      <p id="details-title">${show.title}</p>
      <div id="info-wrapper">
        <div id="description">
          <p id="details-description">${show.details}</p>
        </div>
        ${hasOwner ? html`
        <div id="action-buttons">
          <a href="/edit/${show._id}" id="edit-btn">Edit</a>
          <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
        </div>` : nothing}
      </div>
    </div>
  </div>
</section>
`;

let context = null;
let currentShow = null;

export async function showDetailsView(ctx) {
  context = ctx;
  const id = ctx.params.id;

  try {
    currentShow = await dataService.getShowById(id);
  } catch {
    alert('This show does not exist.');
    return ctx.goTo('/dashboard');
  }

  const hasOwner = userUtils.getUserId() === currentShow._ownerId;
  renderer(temp(currentShow, hasOwner, onDeleteClick));
}

async function onDeleteClick(e) {
  e.preventDefault();
  const confirmed = confirm('Are you sure you want to delete this show?');
  if (!confirmed) return;

  try {
    await dataService.deleteShow(currentShow._id);
    context.goTo('/dashboard');
  } catch (err) {
    alert(err.message);
  }
}