//HTML elements----------------------------------
const displayFullName = document.querySelector(".user_name")
const displayEmail = document.querySelector(".user_email")
const userFollowers = document.querySelector(".followers_counter")
const userFollowing = document.querySelector(".following_counter")
const userPosts = document.querySelector(".posts_counter")
//------------------------------------------------

//Local Storage------------------------------------
const userName = localStorage.getItem("userName")
const userToken = localStorage.getItem("userToken")
const userEmail = localStorage.getItem("userEmail")
//--------------------------------------------------


//URL for api call--------------------------------
const baseUrl = "https://nf-api.onrender.com"
const profileUrl = `${baseUrl}/api/v1/social/profiles/${userName}`
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


function displayUserData(e) {
    const followers = e._count.followers;
    const following = e._count.following;
    const posts = e._count.posts;
    userFollowers.innerHTML = `${followers}`
    userFollowing.innerHTML = `${following}`
    userPosts.innerHTML = `${posts}`

    displayFullName.innerHTML = `${userName}`
    displayEmail.innerHTML = `${userEmail}`
}
