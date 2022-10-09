import { storeUserData } from "./register_functions.mjs"

const form = document.querySelector(".form-signin")


form.onsubmit = function () {
    event.preventDefault()
    storeUserData()
}









