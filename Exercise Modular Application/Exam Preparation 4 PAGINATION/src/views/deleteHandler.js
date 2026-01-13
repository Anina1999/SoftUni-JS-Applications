import { dataService } from "../service/dataService.js";
import { page } from "../utility/library.js";

let context = null;
export async function deleteHandler(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const userConfirm = confirm('Are you sure you want to delete the current event?');

    if (userConfirm) {
        userConfirm && dataService.delEvent(id);
        context.updateNav();
        context.goTo('/dashboard');
    }
}   