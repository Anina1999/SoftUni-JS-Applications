import { dataService } from "../service/dataService.js";

let context = null;
export async function deleteHandler(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const userConfirm = confirm('Are you sure you want to delete the current event?');

    if (userConfirm) {
        userConfirm && dataService.delRecord(id);
        context.updateNav();
        context.goTo('/dashboard');
    }
}  