import * as React from "react"
import "./index.css"

interface CallControlProps {
    makeCallValue: string
    valueUpdate: (value: string) => void
    makeCall: () => void
}

export default class CallControl extends React.Component<CallControlProps> {
    private _inputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") this.props.makeCall()
    }

    render() {
        return (
            <div id="CallControl">
                <input value={this.props.makeCallValue} onChange={e => this.props.valueUpdate(e.target.value)} onKeyUp={this._inputKeyUp} />
                <span onClick={this.props.makeCall}>Make Call</span>
            </div>
        )
    }
}
