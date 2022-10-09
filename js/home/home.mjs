import {
  createPostData,
  searchPosts,
  filteredPosts
} from './home_functions.mjs';

import {
  isUserLoggedIn,
  sendUserToProfile
} from "../utils.mjs"


const postForm = document.querySelector(".post_form")
const baseURL = 'https://nf-api.onrender.com'
const postUrl = `${baseURL}/api/v1/social/posts`
const allPosts = `${baseURL}/api/v1/social/posts`
const userToken = localStorage.getItem("userToken")



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
  createPostData(postUrl, userInput)
}
async function displayPosts(url) {

  try {
    const postData = {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${userToken}`
      },
    };
    const response = await fetch(url, postData);
    const json = await response.json();

    filteredPosts(json)
    searchPosts(json)




  } catch (error) {
    console.log(error);
  }

}
displayPosts(allPosts)
sendUserToProfile()
