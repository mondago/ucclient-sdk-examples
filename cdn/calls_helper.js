let calls = {}
let activeCall = null

function createTableCell(contentText) {
    const cell = document.createElement("td")
    const content = document.createTextNode(contentText)
    cell.classList = "call_cell"
    cell.appendChild(content)
    return cell
}

function createCallRow(call) {
    const callRow = document.createElement("tr")

    callRow.id = call.Id
    callRow.classList.add("call_row")
    callRow.appendChild(createTableCell(call.Id))
    callRow.appendChild(createTableCell(call.Called.Tel))
    callRow.appendChild(createTableCell(call.Caller.Tel))
    callRow.appendChild(createTableCell(call.State))

    return callRow
}

function addCallRow(call) {
    const callsTable = document.getElementById("calls_table")
    const tbody = callsTable.getElementsByTagName("tbody")[0]
    tbody.appendChild(createCallRow(call))
}

function updateCallRow(call) {
    const callsTable = document.getElementById("calls_table")
    const tbody = callsTable.getElementsByTagName("tbody")[0]
    const currentCallRow = document.getElementById(call.Id)
    const newCallRow = createCallRow(call)
    tbody.replaceChild(newCallRow, currentCallRow)
}

function upsertCallRow(call) {
    if (document.getElementById(call.Id)) return updateCallRow(call)
    addCallRow(call)
}

function removeCallRow(id) {
    const call = document.getElementById(id)
    const callsTable = document.getElementById("calls_table")
    const tbody = callsTable.getElementsByTagName("tbody")[0]
    tbody.removeChild(call)
}

function getActiveButtons(state) {
    switch (state) {
        case "CONNECTED":
            return ["hang_up_call", "hold_call"]
        case "DIALING":
            return ["hang_up_call"]
        case "RINGING":
            return ["answer_call"]
        case "DIALBACK":
            return ["answer_call", "hang_up_call"]
        case "HELD":
            return ["unhold_call"]
        case "DISCONNECTED":
            return []
    }
    return []
}

function updateCallControlButtons() {
    const activeIds = !activeCall ? [] : getActiveButtons(activeCall.State)
    const callControlButtons = document.getElementsByClassName("call_control_button")
    for (let i = 0; i < callControlButtons.length; i++) {
        const button = callControlButtons[i]
        const isActive = activeIds.includes(button.id)
        button.classList.remove("active")
        if (isActive) button.classList.add("active")
    }
}

function highlightActiveCallElem() {
    if (!activeCall) return
    const callsTable = document.getElementById("calls_table")
    const tbody = callsTable.getElementsByTagName("tbody")[0]
    const callRows = tbody.getElementsByTagName("tr")
    for (let i = 0; i < callRows.length; i++) {
        const cur = callRows[i]
        const isNewActive = cur.id === activeCall.Id
        const isCurActive = cur.classList.contains("active")
        if (isCurActive && isNewActive) return
        if (isNewActive) cur.classList.add("active")
        if (isCurActive) cur.classList.remove("active")
    }
}

function updateActiveCall(call) {
    activeCall = { ...call }
    if (call.Event === "REMOVE") activeCall = null
    updateCallControlButtons()
    highlightActiveCallElem()
}

const removeCall = call => {
    removeCallRow(call.Id)
    updateActiveCall(call)
}

const upsertCall = call => {
    upsertCallRow(call)
    updateActiveCall(call)
    calls = { ...calls, [call.Id]: call }
}

const selectCallRow = e => {
    if (e.target.tagName === "TD" && e.target.classList.contains("call_cell")) updateActiveCall(calls[e.target.parentElement.id])
    if (e.target.tagName === "TR" && e.target.classList.contains("call_row")) updateActiveCall(calls[e.target.id])
}

document.addEventListener("click", selectCallRow)
