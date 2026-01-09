import { decorateContext } from './utility/decorateContext.js';
import { page } from './utility/library.js';
import { logout } from './utility/logout.js';
import { updateNav } from './utility/navigationControl.js';
import { showBrowseTeamsView } from './views/browseTeamsView.js';
import { showCreateView } from './views/createView.js';
import { showEditView } from './views/editView.js';
import { showHomeView } from './views/homeView.js';
import { showLoginView } from './views/loginView.js';
import { showMyTeamsView } from './views/myTeamsView.js';
import { showRegisterView } from './views/registerView.js';
import { showTeamDetailsView } from './views/teamDetailsView.js';

page(decorateContext)
page('/', showHomeView)
page('/browseTeams', showBrowseTeamsView)
page('/login', showLoginView)
page('/register', showRegisterView)
page('/myTeams', showMyTeamsView)
page('/logout', logout)
page('/create', showCreateView)
page('/edit/:id', showEditView)
page('/details/:id', showTeamDetailsView)


page.start();
updateNav();