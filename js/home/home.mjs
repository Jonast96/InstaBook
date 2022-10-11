import {
  createPostData,
  searchPosts,
  createHtml
} from './home_functions.mjs';

import {
  isUserLoggedIn,
  sendUserToProfile,
  getApiCall,
  baseURL,
  loggedInOrNot
} from "../utils.mjs"
sendUserToProfile()

const postForm = document.querySelector(".post_form")
const postUrl = `${baseURL}/api/v1/social/posts`
const allPosts = `${baseURL}/api/v1/social/posts`

postForm.onsubmit = function () {
  const postTitle = document.querySelector("#title")
  const postMedia = document.querySelector("#media")
  const postBody = document.querySelector(".body")
  event.preventDefault()
  const userInput = {
    title: `${postTitle.value}`,
    body: `${postBody.value}`,
    media: `${postMedia.value}`
  }
  createPostData(allPosts, userInput)
}


async function displayPosts() {
  try {
    const json = await getApiCall(allPosts)
    loggedInOrNot()
    createHtml(json)
    searchPosts(json)
  } catch (error) {
    console.log(error);
  }
}
displayPosts()



