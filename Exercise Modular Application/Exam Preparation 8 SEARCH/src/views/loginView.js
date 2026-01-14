import { userService } from "../service/userService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${handler}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
    `

    let context = null;
    
    export async function showLoginView(ctx) {
        context = ctx;
        renderer(temp(createSubmitHandler(onSubmit)));
    }

    async function onSubmit(data, e) {
    const { email, password } = data;

    try {
        if (!email || !password) {
          throw new Error('All fields are required!');
        }

        await userService.login({ email, password });

        e.target.reset();
        context.updateNav();
        context.goTo('/');
    } catch (error) {
        window.alert(error.message || 'Login failed!');
    }
}