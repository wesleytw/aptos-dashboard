import React, { useEffect, useState } from 'react'
import { AptosClient } from "aptos";

const App = () => {
  const [isMartianWalletInstalled, setisMartianWalletInstalled] = useState()
  const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");
  const address = "0x2d34a73c9b6e9ed5733e3a7ecf80a51a0d7dd8eabb0342b441d0d9916ead87fc";
  async function nameserv() {
    // const name = await aptosClient.getTableItem(
    //   // Current devnet handle. Updates every time devnet resets.
    //   "115666430819508854909334766482148507499",
    //   "address",
    //   "0x1::string::String",
    //   address
    // );
    const response = await fetch(`https://www.aptosnames.com/api/v1/name/${address}`);
    const { name } = await response.json();

    console.log(name)

  }

  useEffect(() => {
    setisMartianWalletInstalled(window.martian)
  }, [])

  useEffect(() => {
    // if ("martian" in window) {
    console.log("isMartianWalletInstalled", isMartianWalletInstalled)
    // if (isMartianWalletInstalled !== undefined) {
    checkWallet()
    nameserv()
    // }
    // }
  }, [isMartianWalletInstalled])

  const getProvider = () => {
    console.log("mat", window.martian)
    if ("martian" in window) {
      return (window.martian);
    };
    // window.open("https://www.martianwallet.xyz/", "_blank");
  }

  async function connectWallet() {
    // console.log("mat", window.martian)
    if ("martian" in window) {
      await window.martian.connect();
      console.log("mart", window.martian)
    } else {
      console.log("no mart", window.martian)
    }
  }

  async function disconnect() {
    await window.martian.disconnect();
  }

  async function checkWallet() {
    if (window.martian._isConnected == false) return
    const account = await window.martian.address
    const isconnect = await window.martian.isConnected()
    console.log("check", window.martian, account, isconnect, await window.martian.account())
  }

  async function send() {
    // Generate a transaction
    const response = await window.martian.connect();
    const sender = response.address;
    const payload = {
      type: "script_function_payload",
      function: "0x1::coin::transfer",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: ["0x07346b833dc81bc5c698fee0ae12664b5aa7adabd1bb96d1fe40fcc3e0f28379", "50"]
    };
    const transaction = await window.martian.generateTransaction(sender, payload);
    const signedTxn = await window.martian.signTransaction(transaction);
    const txnHash = await window.martian.submitTransaction(signedTxn);
    console.log("send", txnHash)
  }

  async function sign() {
    const signature = await window.martian.signMessage("This is a sample message");
    console.log("sign", signature)
    // {signature: '0x4d215a31797d56e28ee1c8e2cf5dc41b4aff9d2371b507d6…e97746dd7232fd6f1537d1b38e20dc620c44135de7b8ec107'}
  }
  return (
    <div>
      <button onClick={() => getProvider()} className="m-4 bg-slate-400">getProvider </button>
      <button onClick={() => connectWallet()} className="m-4 bg-slate-400">connect wallet</button>
      <button onClick={() => checkWallet()} className="m-4 bg-slate-400">checkWallet</button>
      <button onClick={() => disconnect()} className="m-4 bg-slate-400">disconnect</button>
      <div className=" bg-amber-300 flex">
        <button onClick={() => send()} className="m-4 bg-slate-400">send</button>
        <button onClick={() => sign()} className="m-4 bg-slate-400">sign</button>
      </div>
    </div>
  )

}

export default App

