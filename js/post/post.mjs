import {
  giveUserRights,
  createHtml,
  updatePost
} from "./post_functions.mjs";

import {
  isUserLoggedIn,
  sendUserToProfile,
  getApiCall,
  baseURL,
  loggedInOrNot

} from "../utils.mjs";
sendUserToProfile()

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const userToken = localStorage.getItem("userToken")
const postsURL = `${baseURL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`


const deletePostBtn = document.querySelector(".btn_delete")
deletePostBtn.addEventListener("click", async () => {
  try {
    const postData = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${userToken}`
      },
    };
    const response = await fetch(`https://nf-api.onrender.com/api/v1/social/posts/${id}`, postData);
    window.location.href = "profile.html"
  } catch (error) {
    console.log(error)
  }
})

async function displayPost() {
  try {
    const json = await getApiCall(postsURL)
    giveUserRights(json.author.name)
    createHtml(json)
    loggedInOrNot()

  } catch (error) {
    console.log(error)
  }
}
displayPost()

const postForm = document.querySelector(".post_form")
postForm.onsubmit = function () {
  event.preventDefault()
  const postTitle = document.querySelector("#title")
  const postBody = document.querySelector(".body")
  const postMedia = document.querySelector("#media")

  const postDetails = {
    title: `${postTitle.value}`,
    body: `${postBody.value}`,
    media: `${postMedia.value}`
  }
  updatePost(postsURL, postDetails)
}