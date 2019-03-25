import * as React from "react"
import CallController, { CallObject } from "ucsdk-api"
import CallTableHead from "./CallTableHead"
import CallTableBody from "./CallTableBody"

interface CallsProps {
    calls: { [id: string]: CallObject }
    callController: CallController
    activeCallId: string
}

export default function CallContainer(props: CallsProps) {
    return (
        <table id="CallsTable">
            <CallTableHead />
            <CallTableBody callController={props.callController} calls={props.calls} activeCallId={props.activeCallId} />
        </table>
    )
}
