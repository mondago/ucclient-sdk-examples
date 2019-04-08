import * as React from "react"
import { CallObject } from "ucclient-sdk"

import "./Call.css"

interface CallProps {
    call: CallObject
    active: boolean
}

export default function Call(props: CallProps) {
    return (
        <tr className={"CallRow " + (props.active ? "Active" : "")}>
            <td>{props.call.Id}</td>
            <td>{props.call.Called.Tel}</td>
            <td>{props.call.Caller.Tel}</td>
            <td>{props.call.State}</td>
        </tr>
    )
}
