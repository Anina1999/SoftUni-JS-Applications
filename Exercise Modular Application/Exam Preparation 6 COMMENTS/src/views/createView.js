import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
        <section id="create-page" class="auth">
            <form id="create" @submit=${handler}>
                <div class="container">

                    <h1>Create Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title...">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category...">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input class="btn submit" type="submit" value="Create Game">
                </div>
            </form>
        </section>
    `
let context = null;
export async function showCreateView(ctx) {
    context = ctx;
    renderer(temp(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, e) {
    const { title, category, maxLevel, imageUrl, summary } = data;
    try {
        if (!title || !category || !maxLevel || !imageUrl || !summary) {
            throw new Error('All fields are required!');
        }

        await dataService.createGame(data);

        e.target.reset();
        context.updateNav();
        context.goTo('/');
    } catch (error) {
        window.alert(error.message)
    }
}