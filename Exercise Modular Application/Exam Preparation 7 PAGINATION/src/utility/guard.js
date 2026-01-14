import { getUserData } from '../utility/userUtils/getUserData.js';

export function hasUser(ctx, next) {
    const userData = getUserData();

    if (!userData) {
        ctx.page.redirect('/login');
        return;
    }

    next();
}