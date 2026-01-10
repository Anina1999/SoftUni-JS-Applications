import { decorateContext } from './utility/decorateContext.js';
import { page } from './utility/library.js';
import { logout } from './utility/logout.js';
import { updateNav } from './utility/navigationControl.js';
import { showCreateView } from './views/createView.js';
import { showDashboardView } from './views/dashboardView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showHomePageView } from './views/homePageView.js';
import { showLoginView } from './views/loginView.js';
import { showRegisterView } from './views/registerView.js';
import { showSearchView } from './views/searchView.js';

page(decorateContext);

page('/', showHomePageView);
page('/register', showRegisterView);
page('/login', showLoginView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/search', showSearchView);
page('/edit/:id', showEditView);
page('/logout', logout);
page.start();
updateNav();