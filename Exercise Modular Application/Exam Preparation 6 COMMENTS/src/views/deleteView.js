import { dataService } from "../service/dataService.js";

let context = null;
export async function deleteHandler(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const userConfirm = confirm('Are you sure you want to delete the current game?');

    if (userConfirm) {
        userConfirm && dataService.deleteGame(id);
        context.updateNav();
        context.goTo('/');
    }
}  