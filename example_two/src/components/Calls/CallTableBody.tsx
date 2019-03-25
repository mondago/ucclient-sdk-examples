import * as React from "react"
import CallController, { CallObject } from "ucsdk-api"
import Call from "./Call"

interface CallTableBodyProps {
    calls: { [id: string]: CallObject }
    callController: CallController
    activeCallId: string
}

export default class CallTableBody extends React.Component<CallTableBodyProps> {
    private get _callElements(): React.ReactNode[] {
        return Object.keys(this.props.calls).map(id => <Call key={id} active={this.props.activeCallId === id} call={this.props.calls[id]} />)
    }

    render(): React.ReactNode {
        return <tbody>{this._callElements}</tbody>
    }
}
