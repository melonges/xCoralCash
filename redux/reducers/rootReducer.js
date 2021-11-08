import {createSlice} from "@reduxjs/toolkit";
import {connectWallet} from "./asyncActions/connectWallet";
import {disconnectWallet} from "./asyncActions/disconnectWallet";
import {repairConnect} from "./asyncActions/repairConnect";
import XCORAL_ABI from "../../ABI/xcoral.json"
import MONETARY_ABI from "../../ABI/monetary.json"
import FUTURES_ABI from "../../ABI/futures.json"
import TREASURY_ABI from "../../ABI/treasury.json"
import Web3 from "web3"
import {getWalletInfo} from "./asyncActions/getWalletInfo/getCurrentPriceReducer";

const web3 = new Web3(process.env.INFURA_NET)

const contracts = {
    xCORAL: new web3.eth.Contract(XCORAL_ABI, process.env.xCORAL),
    monetaryPolicy: new web3.eth.Contract(MONETARY_ABI, process.env.monetaryPolicy),
    futures: new web3.eth.Contract(FUTURES_ABI, process.env.futures),
    treasury: new web3.eth.Contract(TREASURY_ABI, process.env.treasury),
}

console.log(XCORAL_ABI)
const rootStore = createSlice({
    name: "rootStore",
    initialState: {
        onboard: null,
        web3ForUser: null,
        isConnected: false,
        address: "0x0000000000000000000000",
        balance: null,
        network: null,
        xCoralBalance: null,
        walletMiniInfo: {
            currentPrice: 0,
            targetPrice: 0,
            currentAPY: 0,
            nextRebaseIn: 0,

        },

        contracts,
    }, reducers: {
        dispatchOnboard(state, action) {
            state.onboard = action.payload
        },
        dispatchWeb3forUser(state, action) {
            state.web3ForUser = action.payload
        },
        changeWalletAddress(state, action) {
            state.address = action.payload
        }
    },
    extraReducers: {
        [connectWallet.fulfilled]: (state, action) => {
            state.isConnected = true
            state.address = action.payload[0].address
            state.network = action.payload[0].network
            state.balance = action.payload[0].balance == null ? 0 : action.payload.balance
            state.xCoralBalance = (action.payload[1] / 10 ** 9)
            localStorage.setItem("selectedWallet", action.payload[0].wallet.name)
            localStorage.setItem("lastWalletAddress", action.payload[0].address)

        },
        [disconnectWallet.fulfilled]: (state) => {
            state.isConnected = false
            localStorage.clear()
        },

        [repairConnect.fulfilled]: (state, action) => {
            state.isConnected = true
            state.address = action.payload[2]
            state.network = action.payload[0].network
            state.balance = action.payload[0].balance == null ? 0 : action.payload.balance
            state.xCoralBalance = (action.payload[1] / 10 ** 9)

        },
        [repairConnect.rejected]: () => {
            console.log("repairConnect error")
        },

        [getWalletInfo.fulfilled]: (state, action) => {
            state.walletMiniInfo.currentPrice = (action.payload[0] / 10 ** 18).toFixed(2)
            state.walletMiniInfo.targetPrice = (action.payload[1] / 10 ** 18).toFixed(2)
            // state.walletMiniInfo.currentAPY = action.payload[2]
            // state.walletMiniInfo.nextRebaseIn = action.payload[3]
        },
    }

})


export default rootStore.reducer
export const {dispatchOnboard, dispatchWeb3forUser, changeWalletAddress} = rootStore.actions
