import * as React from "react"
import UCSession, { CallObject } from "ucclient-sdk"

import "./index.css"

type CallAction = "hangup" | "hold" | "answer" | "unhold"
interface CallButtonsProps {
    activeCall: CallObject
    callController: UCSession["callController"]
}

export default class CallButtons extends React.Component<CallButtonsProps> {
    private get _activeButtons(): CallAction[] {
        if (!this.props.activeCall) return []
        switch (this.props.activeCall.State) {
            case "CONNECTED":
                return ["hangup", "hold"]
            case "DIALING":
                return ["hangup"]
            case "RINGING":
                return ["answer"]
            case "DIALBACK":
                return ["answer", "hangup"]
            case "HELD":
                return ["unhold"]
            case "DISCONNECTED":
                return []
        }
        return []
    }

    private _isActive(action: CallAction): boolean {
        return this._activeButtons.includes(action)
    }

    private _activeClass(action: CallAction): string {
        if (this._isActive(action)) return "ActiveButton"
        return ""
    }

    private _answer = (): void => this.props.callController.answerCall(this.props.activeCall.Id)
    private _hangup = (): void => this.props.callController.hangupCall(this.props.activeCall.Id)
    private _hold = (): void => this.props.callController.holdCall(this.props.activeCall.Id)
    private _unhold = (): void => this.props.callController.unHoldCall(this.props.activeCall.Id)

    render(): React.ReactNode {
        return (
            <div id="CallControls">
                <span className={"CallButton " + this._activeClass("answer")} onClick={this._answer}>
                    answer
                </span>
                <span className={"CallButton " + this._activeClass("hangup")} onClick={this._hangup}>
                    hang up
                </span>
                <span className={"CallButton " + this._activeClass("hold")} onClick={this._hold}>
                    hold
                </span>
                <span className={"CallButton " + this._activeClass("unhold")} onClick={this._unhold}>
                    unhold
                </span>
            </div>
        )
    }
}
