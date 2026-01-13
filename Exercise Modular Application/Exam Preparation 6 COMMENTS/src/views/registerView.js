import { userService } from "../service/userService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
          <section id="register-page" class="content auth">
            <form id="register" @submit=${handler}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    `

    let context = null;
    export async function showRegisterView(ctx) {
        context = ctx;
        renderer(temp(createSubmitHandler(onSubmit)));
    }

    async function onSubmit(data, e) {
    const {email, password, ['confirm-password']: rePass} = data;

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