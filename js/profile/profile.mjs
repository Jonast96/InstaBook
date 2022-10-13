import {
  displayUserData,
  createHtml
} from "./profile_functions.mjs"
import {
  sendUserToProfile,
  baseURL,
  loggedInOrNot
} from "../utils.mjs"
sendUserToProfile()

//HTML elements----------------------------------
const logoutButton = document.querySelector(".logout_button")
//------------------------------------------------

//Local Storage------------------------------------
const userName = localStorage.getItem("userName")
const userToken = localStorage.getItem("userToken")
//--------------------------------------------------

//URL for api call--------------------------------
const profileUrl = `${baseURL}/api/v1/social/profiles/${userName}`
const userPosts = `${baseURL}/api/v1/social/profiles/${userName}?_posts=true&_following=true&_followers=true`
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

