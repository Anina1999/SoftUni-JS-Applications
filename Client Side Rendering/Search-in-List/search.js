import { html, nothing, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const root = document.getElementById('towns');
const searchTextRef = document.getElementById('searchText');
const resultMatch = document.getElementById('result');

document.querySelector('button').addEventListener('click', search);

search();

function search(e) {
   let searchText = null;

   if (e) {
      searchText = searchTextRef.value;
      if (!searchText) {
         return;
      }
   }

   const matches = towns.filter(town => town.includes(searchText)).length;
   const temp = towns.map((town, i) => createTemp(town, searchText, i));
   const townsTemp = html`<ul>${temp}</ul>`;

   render(townsTemp, root);

   !!e  && render(matchesTemp(matches), resultMatch);
}

function matchesTemp(count) {
   return html`<p>${count} matches found</p>`
}

function createTemp(town, searchText, i) {
   let isMatch = town.includes(searchText);
   if (isMatch) {
      return html`<li id=${i} class="active">${town}</li>`
   } else {
      return html`<li id=${i}>${town}</li>`
   }
      
   
}
