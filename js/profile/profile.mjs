import {
  displayUserData,
  createHtml
} from "./profile_functions.mjs"
import {
  isUserLoggedIn,
  sendUserToProfile
} from "../utils.mjs"
sendUserToProfile()

//HTML elements----------------------------------
const logoutButton = document.querySelector(".logout_button")
//------------------------------------------------

//Local Storage------------------------------------
const userName = localStorage.getItem("userName")
const userToken = localStorage.getItem("userToken")
const userEmail = localStorage.getItem("userEmail")
//--------------------------------------------------

//URL for api call--------------------------------
const baseUrl = "https://nf-api.onrender.com"
const profileUrl = `${baseUrl}/api/v1/social/profiles/${userName}`
const userPosts = `${baseUrl}/api/v1/social/profiles/${userName}?_posts=true&_following=true&_followers=true`
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

  } catch (error) {
    console.log(error)
  }

}
displayUserPosts(userPosts)

logoutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html"
})

