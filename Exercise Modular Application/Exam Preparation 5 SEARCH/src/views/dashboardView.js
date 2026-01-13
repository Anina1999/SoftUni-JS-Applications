import { dataService } from "../service/dataService.js";
import { html, renderer } from "../utility/library.js";

const temp = (records) => html`
<h2>Available Motorcycles</h2>
        <section id="dashboard">
          ${records?.length > 0 ? html`
          ${records.map(r => recordTemp(r))}`
          : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
        </section>         
        `

const recordTemp = (record) => html`
<div class="motorcycle">
            <img src=${record.imageUrl} alt=${record.model} />
            <h3 class="model">${record.model}</h3>
            <p class="year">Year: ${record.year}</p>
            <p class="mileage">Mileage: ${record.mileage} km.</p>
            <p class="contact">Contact Number: ${record.contact}</p>
            <a class="details-btn" href="/details/${record._id}">More Info</a>
          </div>
        `

export async function showDashboardView(ctx) {
    const data = await dataService.getAllRecords();
    renderer(temp(data));
}