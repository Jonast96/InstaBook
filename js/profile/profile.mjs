import {
  displayUserData,
  createHtml
} from "./profile_functions.mjs"
import {
  isUserLoggedIn,
  sendUserToProfile,
  baseURL,
  loggedInOrNot
} from "../utils.mjs"
sendUserToProfile()



//Local Storage------------------------------------
const userName = localStorage.getItem("userName")
const userToken = localStorage.getItem("userToken")
//--------------------------------------------------

const logoutButton = document.querySelector(".logout_button")
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let user = params.get("user");
console.log(user)
function loggedInProfile() {
  if (!user) {
    user = localStorage.getItem("userName")
  }
  if (userName === user) {
    logoutButton.classList.replace("d-none", "d-block")
  }
}
loggedInProfile()

//URL for api call--------------------------------
const profileUrl = `${baseURL}/api/v1/social/profiles/${user}`
const userPosts = `${baseURL}/api/v1/social/profiles/${user}?_posts=true&_following=true&_followers=true`
//------------------------------------------------

async function getUsersDataAndDisplay(url) {
  try {
    const getData = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`
      },
    };
    const response = await fetch(url, getData)
    const json = await response.json()
    console.log(json)
    displayUserData(json)
  } catch (error) {
    console.log(error)
  }
}
getUsersDataAndDisplay(profileUrl)

async function displayUserPosts(url) {
  try {

    const getData = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`
      },
    };
    const response = await fetch(url, getData)
    const json = await response.json()
    createHtml(json)
    loggedInOrNot()


  } catch (error) {
    console.log(error)
  }

}
displayUserPosts(userPosts)

logoutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html"
})

