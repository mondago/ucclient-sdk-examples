import * as React from "react"
import UCSession, { CallObject } from "ucclient-sdk"
import Call from "./Call"

interface CallTableBodyProps {
    calls: { [id: string]: CallObject }
    callController: UCSession["callController"]
    activeCallId: string
    updateActiveCall: (id: string) => void
}

export default function CallTableBody(props: CallTableBodyProps) {
    return (
        <tbody>
            {Object.keys(props.calls).map(id => (
                <Call key={id} active={props.activeCallId === id} call={props.calls[id]} updateActiveCall={props.updateActiveCall} />
            ))}
        </tbody>
    )
}
