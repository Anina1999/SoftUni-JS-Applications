import { dataService } from "../service/dataService.js";

let context = null;
export async function deleteHandler(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const userConfirm = confirm('Are you sure you want to delete the current post?');

    if (userConfirm) {
        userConfirm && await dataService.deletePost(id);
        context.updateNav();
        context.goTo('/dashboard');
    }
} 