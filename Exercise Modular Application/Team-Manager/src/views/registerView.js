import { userService } from '../service/userService.js';
import { createSubmitHandler } from '../utility/createSubmitHandler.js';
import { html, nothing, renderer } from '../utility/library.js';

const temp = (handler, error) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form id="register-form" class="main-form pad-large" @submit=${handler}>
            ${Boolean(error) ? html`<div class="error">${error.message}</div>` : nothing}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
`

let context = null;
export function showRegisterView(ctx) {
    renderer(temp(createSubmitHandler(onSubmit)));
    context = ctx;
}

async function onSubmit(data) {
    const {email, username, password, repass} = data;

    if (!email || password.length < 3 || password !== repass || !username) {
        return renderer(temp(createSubmitHandler(onSubmit), {message: 'All fields are required!!!'}))
    }

    await userService.register({email, username, password});
    context.goTo('myTeams');
    context.updateNav();
}