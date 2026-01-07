import { html, render } from './node_modules/lit-html/lit-html.js';
import { tableRowTemp } from './tableRowTemp.js';
import { loadInfo } from './loadInfo.js';

const root = document.querySelector('tbody');

export async function renderTable() {
    const data = await loadInfo();
    render(tableTemp(data), root);
}

const tableTemp = (data) => html`
    ${data.map(student => tableRowTemp(student))}
`;