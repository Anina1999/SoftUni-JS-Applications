import { html, renderer } from '../utility/library.js';
import { createSubmitHandler } from '../utility/createSubmitHandler.js';
import { userService } from '../service/userService.js';

const temp = (handler) => html`
    <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${handler}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
        `

let context = null;
export function showRegisterView(ctx) {
    context = ctx;
    renderer(temp(createSubmitHandler(onSubmit)));
}

async function onSubmit(data) {
    const {email, password, ['re-password']: rePass} = data;

    if (!email || !password) {
        return renderer(temp(createSubmitHandler(onSubmit), {message: 'All fields are required!!!'}))
    }

    if (password !== rePass) {
      return window.alert('Passwords don\'t match');
    }

    await userService.register({email, password});
    context.goTo('/');
}
