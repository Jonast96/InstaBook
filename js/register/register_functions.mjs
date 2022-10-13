const errorMessage = document.querySelector(".error_message")
const loginLink = document.querySelector(".login_button")
const baseURL = 'https://nf-api.onrender.com'
const registerUrl = `${baseURL}/api/v1/social/auth/register`;


/**
 * Post user data to API. Used on form submit.
 * @param {string} url 
 * @param {object} userData 
 * @example
 * ```js
 * registerUser(registerUrl, userToRegister)
 * ```
 */
async function registerUser(url, userData) {
    try {
        const postData = {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        };
        const response = await fetch(url, postData);
        const json = await response.json();

        if (response.ok === true) {
            errorMessage.innerHTML = `<p class="text-success>User successfully created, you can now log in</p>`
            loginLink.classList.replace("d-none", "d-inline")
        } else {
            errorMessage.innerHTML = `<p class="text-danger">${json.message}</p>`
        }
    } catch (error) {
        console.log(error);
    }
}

export function storeUserData() {
    const emailValue = document.querySelector("#emailValue")
    const nameValue = document.querySelector("#nameValue")
    const passwordValue = document.querySelector("#passwordValue")

    const userToRegister = {
        name: `${nameValue.value.toLowerCase()}`,
        email: `${emailValue.value.toLowerCase()}`,
        password: `${passwordValue.value}`
    }

    if (emailValue.value.includes("@noroff.no") || emailValue.value.includes("@noroff.stud.no")) {
        registerUser(registerUrl, userToRegister)
    } else {
        errorMessage.innerHTML = "Email address must be either noroff.no or noroff.stud.no"
    }
}