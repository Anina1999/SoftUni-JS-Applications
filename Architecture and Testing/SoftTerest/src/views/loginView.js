import { userService } from "../api/userService.js";

const section = document.querySelector('div[data-section="login"]');
const main = document.querySelector('main');

let context = null;

export function showLoginView(ctx) {
    context = ctx;
    main.replaceChildren(section);

    document.querySelector('form').addEventListener('submit', onSubmit);
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    if (!email || !password) {
        return;
    }

    await userService.login({ email, password });
    
    context.updateNav();
    context.goTo('/');
}