import { dataService } from "../service/dataService.js";

export async function deleteItem(ctx) {
    const userAction = confirm('Are you sure you want to delete the current item?');
    
    if (!userAction) {
        return;
    }

    const id = ctx.params.id;

    await dataService.deleteFurniture(id);
    ctx.goTo('/dashboard');
}