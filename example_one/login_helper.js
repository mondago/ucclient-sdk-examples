function loggedIn() {
    showAppScreen()
    ucSession.userController.monitor()
}

function showAppScreen() {
    document.getElementById("splash").classList.remove("active")
    document.getElementById("app").classList.add("active")
}
