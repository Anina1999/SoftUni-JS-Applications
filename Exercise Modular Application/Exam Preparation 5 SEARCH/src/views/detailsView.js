import { dataService } from '../service/dataService.js';
import { html, nothing, renderer } from '../utility/library.js';
import { userUtils } from '../utility/userUtils.js';

const temp = (record, hasOwner) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${record.imageUrl} alt=${record.model} />
            <p id="details-title">${record.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${record.year}</p>
                <p class="mileage">Mileage: ${record.mileage} km.</p>
                <p class="contact">Contact Number: ${record.contact}</p>
                   <p id = "motorcycle-description">
                    ${record.about}
                    </p>
              </div>
               ${hasOwner ? html`
               <div id="action-buttons">
                    <a href="/edit/${record._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${record._id}" id="delete-btn">Delete</a>
                </div>` : nothing}
            </div>
        </div>
      </section>
    `

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    try {
        const record = await dataService.getRecordById(id);
        const userId = userUtils.getUserId();
        const hasOwner = userId === record._ownerId;

        if (!record) {
            throw new Error('No content');
        }

        renderer(temp(record, hasOwner));    
        

    } catch (error) {
        window.alert(error.message);
    }
}


