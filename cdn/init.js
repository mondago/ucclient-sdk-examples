function initDOM() {
    const makeCallClick = e => {
        const callNumberInput = document.getElementById("make_call_input")
        const callNumber = callNumberInput.value
        ucSession.callController.makeCall(callNumber)
        callNumberInput.value = ""
    }
    
    const makeCallEnter = e => {
        if (e.key === "Enter") makeCallClick()
    }

    const answerCallClick = e => {
        if (!e.target.classList.contains("active")) return
        ucSession.callController.answerCall(activeCall.Id)
    }

    const hangupCallClick = e => {
        if (!e.target.classList.contains("active")) return
        ucSession.callController.hangupCall(activeCall.Id)
    }

    const holdCallClick = e => {
        if (!e.target.classList.contains("active")) return
        ucSession.callController.holdCall(activeCall.Id)
    }

    const unholdCallClick = e => {
        if (!e.target.classList.contains("active")) return
        ucSession.callController.unHoldCall(activeCall.Id)
    }

    document.getElementById("make_call_button").addEventListener("click", makeCallClick)
    document.getElementById("answer_call").addEventListener("click", answerCallClick)
    document.getElementById("hang_up_call").addEventListener("click", hangupCallClick)
    document.getElementById("hold_call").addEventListener("click", holdCallClick)
    document.getElementById("unhold_call").addEventListener("click", unholdCallClick)
    document.getElementById("make_call_input").addEventListener("keyup", makeCallEnter)
}
