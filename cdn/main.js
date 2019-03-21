/**
 * access UCSession class via the polluted window object
 * instansiate the class to give us our session
 */
const UCSession = window.ucsdk.default
const ucSession = new UCSession()

/**
 * ignore initDOM
 * this is just for the test harness dom manipulation
 */
initDOM()

/**
 * handle login event, likey to be more complex in complete application
 */
const handleLoginEvent = e => showAppScreen()

/**
 * handle call event
 * each call has two possible values of the "Event" property, "UPDATE" and "REMOVE"
 */
const handleCallEvent = e => {
    const call = e.detail
    if (call.Event === "REMOVE") removeCall(call)
    else if (call.Event === "UPDATE") upsertCall(call)
}

/**
 * this is how we listen for events
 * ucLogin and ucCall are the only two listeners currently
 */
window.addEventListener("ucLogin", handleLoginEvent)
window.addEventListener("ucCall", handleCallEvent)

/**
 * connect to our websocket via this method
 */
ucSession.connect()
