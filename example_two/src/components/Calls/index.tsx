import * as React from "react"
import UCSession, { CallObject } from "ucclient-sdk"
import CallTableHead from "./CallTableHead"
import CallTableBody from "./CallTableBody"

interface CallsProps {
    calls: { [id: string]: CallObject }
    callController: UCSession["callController"]
    activeCallId: string
    updateActiveCall: (id: string) => void
}

export default function CallContainer(props: CallsProps) {
    return (
        <table id="CallsTable">
            <CallTableHead />
            <CallTableBody
                callController={props.callController}
                calls={props.calls}
                activeCallId={props.activeCallId}
                updateActiveCall={props.updateActiveCall}
            />
        </table>
    )
}
