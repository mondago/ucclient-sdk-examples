import * as React from "react"
import { CallObject } from "ucclient-sdk"

import "./Call.css"

interface CallProps {
    call: CallObject
    active: boolean
    updateActiveCall: (id: string) => void
}

export default function Call(props: CallProps) {
    return (
        <tr className={"CallRow " + (props.active ? "Active" : "")} onClick={e => props.updateActiveCall(props.call.Id)}>
            <td>{props.call.Id}</td>
            <td>{props.call.Called.Tel}</td>
            <td>{props.call.Caller.Tel}</td>
            <td>{props.call.State}</td>
        </tr>
    )
}
