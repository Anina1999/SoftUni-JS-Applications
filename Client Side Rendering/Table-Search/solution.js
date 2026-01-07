import { renderTable } from './tableTemp.js';

renderTable();
solve();

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const input = document.querySelector('#searchField');
      const searchText = input.value.trim().toLowerCase();
      input.value = '';

      const rows = Array.from(document.querySelectorAll('tbody tr'));

      rows.forEach(row => row.classList.remove('select'));

      if (searchText === '') {
         return;
      }
      
      rows.forEach(row => {
         const cells = Array.from(row.querySelectorAll('td'));
         const matchFound = cells.some(td => td.textContent.toLowerCase().includes(searchText));

         if (matchFound) {
            row.classList.add('select');
         }
      });
   }
}