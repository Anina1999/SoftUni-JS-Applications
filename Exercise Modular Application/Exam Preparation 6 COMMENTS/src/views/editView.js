import { html, renderer } from "../utility/library.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { dataService } from "../service/dataService.js";

const temp = (game, handler) => html`
        <section id="edit-page" class="auth">
            <form id="edit" @submit=${handler}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title: ${game.title}</label>
                    <input type="text" id="title" name="title" .value=${game.title}>

                    <label for="category">Category: ${game.category}</label>
                    <input type="text" id="category" name="category" .value=${game.category}>

                    <label for="levels">MaxLevel: ${game.maxLevel}</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

                    <label for="game-img">Image: ${game.imageUrl}</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

                    <label for="summary">Summary: ${game.summary}</label>
                    <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
    `

let context = null;
export async function showEditView(ctx) {
    context = ctx;
    const id = ctx.params.id;

    try {
      const data = await dataService.getGameById(id);
      renderer(temp(data, createSubmitHandler(onSubmit)));
    } catch (error) {
      window.alert(error.message);
    }
}

async function onSubmit(data, e) {
    e.preventDefault();
    const id = context.params.id;

    let { title, category, maxLevel, imageUrl, summary } = data;
    maxLevel = Number(maxLevel);

    try {
        if (!title || !category || !maxLevel || !imageUrl || !summary) {
            throw new Error('All fields are required!');
        } 

        await dataService.updateGame(id, data);

        e.target.reset();
        context.updateNav();
        context.goTo(`/details/${id}`);
    } catch (error) {
        window.alert(error.message);
    }
}