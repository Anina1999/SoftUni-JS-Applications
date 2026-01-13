import { userService } from "../service/userService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";
import { html, renderer } from "../utility/library.js";

const temp = (handler) => html`
          <section id="login-page" class="auth">
            <form id="login" @submit=${handler}>

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
            </form>
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