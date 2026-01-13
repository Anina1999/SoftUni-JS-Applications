import { decorateContext } from './utility/decorateContext.js';
import { page } from './utility/library.js';
import { logout } from './utility/logout.js';
import { updateNav } from './utility/navigationControl.js';
import { showCreateView } from './views/createView.js';
import { showDashboardView } from './views/dashboardView.js';
import { deleteHandler } from './views/deleteView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showHomePageView } from './views/homePageView.js';
import { showLoginView } from './views/loginView.js';
import { showRegisterView } from './views/registerView.js';

page(decorateContext);

page('/', showHomePageView);
page('/dashboard', showDashboardView);
page('/register', showRegisterView);
page('/login', showLoginView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', deleteHandler);
page('/logout', logout);

page.start();

updateNav();