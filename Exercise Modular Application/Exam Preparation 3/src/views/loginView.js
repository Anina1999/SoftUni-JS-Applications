import { html, renderer } from '../utility/library.js';
import { createSubmitHandler } from '../utility/createSubmitHandler.js';
import { userService } from '../service/userService.js';

const temp = (handler) => html`
    <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${handler}>
              <input type="text" name="email" placeholder="email" />
              <input type="password" name="password" placeholder="password" />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
    </section>
`;

let context = null;

export function showLoginView(ctx) {
    context = ctx;
    renderer(temp(createSubmitHandler(onSubmit)));
}

async function onSubmit(data) {
    const { email, password } = data;

    if (!email || !password) {
        return alert('All fields are required!');
    }

    try {
        await userService.login({ email, password });
        context.updateNav();
        context.goTo('/');
    } catch (err) {
        alert(err.message || 'Login failed!');
    }
}