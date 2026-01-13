import { dataService } from "../service/dataService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, nothing, renderer } from "../utility/library.js";
import { userUtils } from "../utility/userUtils.js";

const temp = (game, hasOwner, comments, handler, userId) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length > 0 
                ? html`<ul>${comments.map(c => html`
                        <li class="comment"><p>Content: ${c.comment}</p></li>
                    `)}</ul>`
                : html`<p class="no-comment">No comments.</p>`}
        </div>

        ${hasOwner ? html`
            <div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a href="/delete/${game._id}" class="button">Delete</a>
            </div>` : nothing}

    </div>

    ${userId && !hasOwner ? html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${handler}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>` : nothing}

</section>
`;

let context = null;


export async function showDetailsView(ctx) {
    context = ctx;
    const id = ctx.params.id;

    const game = await dataService.getGameById(id);
    const comments = await dataService.getComments(id);

    const userId = userUtils.getUserId();
    const hasOwner = userId === game._ownerId;

    renderer(temp(game, hasOwner, comments, createSubmitHandler(onSubmit), userId));
    ctx.updateNav();
}

async function onSubmit(data, e) {
    const id = context.params.id;

    if (!data.comment.trim()) {
        return alert("Please fill the comment field!");
    }

    await dataService.createNewComment({
        gameId: id,
        comment: data.comment
    });

    e.target.reset();
    context.goTo(`/details/${id}`);
}