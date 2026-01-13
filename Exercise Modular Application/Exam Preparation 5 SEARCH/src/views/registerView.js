import { userService } from "../service/userService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

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
    export async function showRegisterView(ctx) {
        context = ctx;
        renderer(temp(createSubmitHandler(onSubmit)));
    }

    async function onSubmit(data, e) {
    const {email, password, ['re-password']: rePass} = data;

    try {
      if (!email || !password) {
        throw new Error('All fields are required!');
      }

      if (password !== rePass) {
        throw new Error('Passwords don\'t match!');
      }

      await userService.register({email, password});

      e.target.reset();
      context.goTo('/');
    } catch (error) {
      window.alert(error.message || 'Register failed!');
    }
    
}