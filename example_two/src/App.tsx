import * as React from "react"
import UCSession, { LoginObject, UserObject, CallObject } from "ucclient-sdk"
import Calls from "./components/Calls"
import CallControl from "./components/CallControl"

import "./App.css"
import CallButtons from "./components/CallButtons"

interface AppProps {}
interface AppState {
    user: UserObject
    calls: { [id: string]: CallObject }
    makeCallValue: string
    loggedIn: boolean
    activeCall: CallObject
}

export default class App extends React.Component<AppProps, AppState> {
    private _ucInterface: UCSession

    state: AppState = { calls: {}, user: null, makeCallValue: "", loggedIn: false, activeCall: null }

    private _removeCall(id: string) {
        const { [id]: removedCall, ...callsWithoutRemoved } = this.state.calls
        this.setState({ calls: callsWithoutRemoved })
        if (this.state.activeCall.Id === id) this.updateActiveCall()
    }

    private _callIn(call: CallObject) {
        if (call.Event === "REMOVE") return this._removeCall(call.Id)
        this.setState({ calls: { ...this.state.calls, [call.Id]: call } })
        this.updateActiveCall(call.Id)
    }

    private _loggedIn(login: LoginObject) {
        this.setState({ user: { ...login, Type: "User" }, loggedIn: true })
    }

    private _addEventListeners(): void {
        window.addEventListener("ucLogin", (e: CustomEvent) => this._loggedIn(e.detail))
        window.addEventListener("ucCall", (e: CustomEvent) => this._callIn(e.detail))
    }

    private _activeCallRemoved(): void {
        const quantityOfCalls = Object.keys(this.state.calls).length
        const otherCallsExist = quantityOfCalls > 0
        if (!otherCallsExist) return this.setState({ activeCall: null })
        this.setState({ activeCall: this.state.calls[Object.keys(this.state.calls)[quantityOfCalls - 1]] })
    }

    get activeCallId(): string {
        if (this.state.activeCall) return this.state.activeCall.Id
        return null
    }

    updateActiveCall = (id?: string): void => {
        if (!id) this._activeCallRemoved()
        this.setState({ activeCall: this.state.calls[id] })
    }

    makeCall = (): void => {
        this._ucInterface.callController.makeCall(this.state.makeCallValue)
        this.setState({ makeCallValue: "" })
    }

    updateMakeCallValue = (value: string) => {
        this.setState({ makeCallValue: value })
    }

    componentDidMount() {
        this._ucInterface = new UCSession()
        this._addEventListeners()
        this._ucInterface.connect()
    }

    render() {
        if (!this.state.loggedIn) return <div>Logging in...</div>
        return (
            <div>
                <CallControl makeCallValue={this.state.makeCallValue} valueUpdate={this.updateMakeCallValue} makeCall={this.makeCall} />
                <Calls
                    activeCallId={this.activeCallId}
                    calls={this.state.calls}
                    callController={this._ucInterface.callController}
                    updateActiveCall={this.updateActiveCall}
                />
                <CallButtons activeCall={this.state.activeCall} callController={this._ucInterface.callController} />
            </div>
        )
    }
}
