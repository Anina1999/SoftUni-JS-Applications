import { userService } from "../data/userService.js";
import { html, page } from "../lib.js";
import { updateNav } from "../utils/navigation.js";
import { showNotification } from "../utils/notification.js";

const temp = () => html`
    <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="register-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>
    `

export function showRegisterView(ctx) {
    ctx.render(temp());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, ['re-password']: repass } = Object.fromEntries(formData);

    if (!email || !password) {
        return showNotification('All fields are required');
    }

    if (password !== repass) {
        return showNotification('Passwords don\'t match');
    }

    await userService.register(email, password);
    updateNav();
    page.redirect('/');
}