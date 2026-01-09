import page from '../node_modules/page/page.mjs';
import { userService } from './service/userService.js';
import { updateNav } from './utility/navigationRender.js';
import { showCreateView } from './views/createView.js';
import { showDashboardView } from './views/dashboardView.js';
import { deleteItem } from './views/deleteView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showLoginView } from './views/loginView.js';
import { showMyFurnitureView } from './views/myFurnitureView.js';
import { showRegisterView } from './views/registerView.js';

page(decorateContext)
page('/', showDashboardView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/my-furniture', showMyFurnitureView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView)
page('/delete/:id', deleteItem);
page('/logout', onLogout)

page.start();
updateNav();

function decorateContext(ctx, next) {
    ctx.goTo = goTo;
    ctx.updateNav = updateNav;
    next();
}

function goTo(path) {
    page.redirect(path);
}

async function onLogout(ctx) {
    await userService.logout();
    ctx.updateNav();
    ctx.goTo('/dashboard');
}