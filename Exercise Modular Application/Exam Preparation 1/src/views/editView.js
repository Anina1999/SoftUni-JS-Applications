import { navigation } from "../navigation/navigation.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { api } from '../api/api.js';
import { auth } from "../authentication/authService.js";
import page from '../../node_modules/page/page.mjs';

export const editTemplate = (solution, onSubmit) => html`
<section id="edit">
  <div class="form">
    <img class="border" src="./images/border.png" alt="" />
    <h2>Edit Solution</h2>
    <form class="edit-form" @submit=${onSubmit}>
      <input type="text" name="type" id="type" .value=${solution.type} placeholder="Solution Type" />
      <input type="text" name="image-url" id="image-url" .value=${solution.imageUrl} placeholder="Image URL" />
      <textarea id="description" name="description" .value=${solution.description} rows="2" cols="10"></textarea>
      <textarea id="more-info" name="more-info" .value=${solution.moreInfo} rows="2" cols="10"></textarea>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>
`;

export async function showEdit(ctx) {
    const solutionId = ctx.params.id;
    const main = document.querySelector('main');
    navigation().update();

    try {
        const solution = await api.get(`/data/solutions/${solutionId}`);
        const userId = auth.getUserId();

        async function handleSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const type = formData.get('type');
            const imageUrl = formData.get('image-url');
            const description = formData.get('description');
            const moreInfo = formData.get('more-info');

            if (!type || !imageUrl || !description || !moreInfo) {
                window.alert('All fields are required!');
                return;
            }

            try {
                await api.authenticatedPUT(`/data/solutions/${solutionId}`, { type, imageUrl, description, moreInfo });
                page(`/solutions/${solutionId}`);
            } catch (error) {
                window.alert(error.message);
            }
        }

        render(editTemplate(solution, handleSubmit), main);
        navigation().update();
    } catch (error) {
        window.alert(error.message);
    }
}

