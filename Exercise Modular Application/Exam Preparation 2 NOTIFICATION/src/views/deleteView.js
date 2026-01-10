import { dataService } from "../data/data.js";
import { page } from "../lib.js";

export async function deleteHandler(ctx) {
    const id = ctx.params.id;
    const userConfirm = confirm('???');

    if (userConfirm) {
        userConfirm && dataService.deleteById(id);
        page.redirect('/dashboard');
    }
}