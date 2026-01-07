import { html, render } from './node_modules/lit-html/lit-html.js';

export const dropdownTemplate = (items) => html`
  ${items.map(i => html`<option value=${i._id}>${i.text}</option>`)}
`;