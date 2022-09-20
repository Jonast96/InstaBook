const loginForm = document.querySelector(".form-signin")
const passwordValue = document.querySelector("#inputPassword")
const emailValue = document.querySelector("#emailValue")

const baseUrl = "https://nf-api.onrender.com"
const loginUrl = `${baseUrl}/api/v1/social/auth/login`
/**
 * Sends a post request to noroff API and stores token to localStorage
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * loginUser(loginUrl, userToLogin)
 * 
 * userToLogin {
 *  email:email,
 *  password:password
 * }
 * ```
 */
async function loginUser(url, userData) {
    try {

        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        const response = await fetch(url, postData)
        const json = await response.json()
        const userToken = json.accessToken;
        localStorage.setItem('userToken', userToken)


    } catch (error) {
        console.log(error)
    }
}


/**
 * Creates userToLogin info.
 * Form validation and checks database runs loginUser function.
 * 
 * ```js
 *  userToLogin = {
 * 
        email: `${emailValue.value}`,
        password: `${passwordValue.value}`
    }
 * 
 * ```
 */
loginForm.onsubmit = function () {
    event.preventDefault()

    const userToLogin = {
        email: `${emailValue.value}`,
        password: `${passwordValue.value}`
    }
    loginUser(loginUrl, userToLogin)
}
