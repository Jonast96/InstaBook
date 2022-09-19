const form = document.querySelector(".form-signin")
const emailValue = document.querySelector("#emailValue")
const nameValue = document.querySelector("#nameValue")
const passwordValue = document.querySelector("#passwordValue")


const baseURL = 'https://nf-api.onrender.com'

const registerUrl = `${baseURL}/api/v1/social/auth/register`;


form.onsubmit = function () {
    event.preventDefault();
    const userToRegister = {
        name: `${nameValue.value}`,
        email: `${emailValue.value}`,
        password: `${passwordValue.value}`
    }

    if (emailValue.value.includes("@noroff.no") || emailValue.value.includes("@noroff.stud.no")) {
        console.log("success")
        registerUser(registerUrl, userToRegister)
    } else {
        console.log("fail")
    }
}



/**
 * Post user data to API. Used on form submit.
 * @param {string} url 
 * @param {any} userData 
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
        console.log(response)
        const json = await response.json();
        console.log(json)
    } catch (error) {
        console.log(error);
    }
}