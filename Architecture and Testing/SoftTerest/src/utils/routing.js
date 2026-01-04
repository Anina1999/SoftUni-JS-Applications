import { showHomeView } from '../views/homeView.js';
import { showRegisterView } from '../views/registerView.js';
import { showLoginView } from '../views/loginView.js';
import { logout } from '../views/logoutView.js';
import { showDashboardView } from '../views/dashboardView.js';
import { showCreateView } from '../views/createView.js';
import { showDetailsView } from '../views/detailsView.js';
import { updateNav } from './navigationUtils.js';

document.querySelector('nav').addEventListener('click', onNavigate);

const routes = {
    '/': showHomeView,
    '/login': showLoginView,
    '/register': showRegisterView,
    '/logout': logout,
    '/dashboard': showDashboardView,
    '/create': showCreateView,
    '/details': showDetailsView 
};

function onNavigate(e) {
    e.preventDefault();

    let target = e.target;

    if (target.tagName === 'IMG') {
        target = target.parentElement;
    }

    if (target.tagName !== 'A') {
        return;
    }

    const path = new URL(target.href);
    const viewName = path.pathname;

    goTo(viewName);
}

const ctx = {
    goTo,
    updateNav
}

function goTo(name, ...params) {
    const handler = routes[name];


    handler(ctx, params);
}

export const routing = {
    goTo,
    updateNav
}