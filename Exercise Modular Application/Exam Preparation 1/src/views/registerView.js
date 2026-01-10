import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { navigation } from '../navigation/navigation.js';
import { api } from '../api/api.js';
import { auth } from '../authentication/authService.js';
import page from '../../node_modules/page/page.mjs';

export const registerTemplate = (onSubmit) => html`
    <section id="register">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Register</h2>
            <form class="register-form" @submit=${onSubmit}>
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
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>
        `

async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('re-password');

    if (!email || !password || !repeatPassword || password !== repeatPassword) {
        window.alert('All fields are required!');
        return;
    }

    try {
        await api.post('/users/register', { email, password });
        navigation().update();
        page('/login');

    } catch (error) {
        window.alert(error.message);
    }
}

export function showRegister() {
    const main = document.querySelector('main');
    render(registerTemplate(handleSubmit), main);
    navigation().update();
}