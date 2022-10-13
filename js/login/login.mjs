import {
    sendUserDataToLocalStorage
} from './login_functions.mjs';


const loginForm = document.querySelector(".form-signin")
const passwordValue = document.querySelector("#inputPassword")
const emailValue = document.querySelector("#emailValue")

const baseUrl = "https://nf-api.onrender.com"
const loginUrl = `${baseUrl}/api/v1/social/auth/login`
const wrongUsername = document.querySelector(".wrong_Email")

/**
 * @param {SubmitEvent} event The event object
 */
export async function onSubmit(event) {
    try {
        event.preventDefault()
        const userToLogin = {

            email: `${emailValue.value.toLowerCase()}`,
            password: `${passwordValue.value}`
        }
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToLogin),
        };
        const response = await fetch(loginUrl, postData)
        const json = await response.json()
        sendUserDataToLocalStorage(json)
        if (response.ok === true) {
            wrongUsername.classList.replace("d-block", "d-none")
            window.location.href = "profile.html"
        } else {
            wrongUsername.classList.replace("d-none", "d-block")
        }
    } catch (error) {
        console.log(error)
    }

}


loginForm.onsubmit = onSubmit
