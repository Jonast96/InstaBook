/**
 * Checks if a user is logged in by checking is a user token is stored in the localStorage
 * @returns {boolean}
 * ```js
 * //if true, user is logged in
 * //if false, user is not logged in
 * ```
 */
export function isUserLoggedIn() {
    const userToken = localStorage.getItem("userToken")

    if (userToken) {
        return true
    } else {
        return false
    }
}
/**
 * If user is logged in, profile/login link will take them to their profile, if user is not logged in they will go to login
 */
export function sendUserToProfile() {
    const userNotLoggedIn = document.querySelector(".sign_in")
    const profileLi = document.querySelector(".profile_link_li")

    if (isUserLoggedIn() === true) {
        profileLi.innerHTML = `
      <a class="nav-link text-primary" href="/profile.html"
      >Profile/Login</a
    >`

        userNotLoggedIn.classList.replace("d-block", "d-none")
    } else {
        console.log("user is not logged in")
    }
}



/**
 * GET call
 * @param {*} url 
 * @returns 
 */
export async function getApiCall(url) {
    const userToken = localStorage.getItem("userToken")

    const postData = {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            authorization: `Bearer ${userToken}`
        },
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    return json
}

export const baseURL = 'https://nf-api.onrender.com'



export function loggedInOrNot() {
    const userToken = localStorage.getItem("userToken")

    if (!userToken) {
        console.log("not logged in")
        window.location.href = "login.html"
    }
}