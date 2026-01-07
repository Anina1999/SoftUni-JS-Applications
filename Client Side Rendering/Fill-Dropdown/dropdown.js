import { html, render } from './node_modules/lit-html/lit-html.js';
import { api } from './api.js';;
import { dropdownTemplate } from './itemTemp.js';

const dropDownRoot = document.getElementById('menu');
const form = document.querySelector('form');

loadItems();

form.addEventListener('submit', onSubmit);

async function loadItems() {
  try {
    const items = await api.get();
    render(dropdownTemplate(items), dropDownRoot);
  } catch (error) {
    alert(error.message);
  }
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const text = formData.get('text');

    if (!text) {
        return alert('Input should not be empty');
    }

    try {
        await api.post({text});

        form.reset();

        await loadItems();
    } catch (error) {
        alert(error.message);
    }
}
