import React, { useEffect, useState } from 'react'
import { AptosClient, TokenClient } from "aptos";
// import aptosWeb3 from '@martiandao/aptos-web3.js';
import aptosWeb3, { WalletClient } from '@martiandao/aptos-web3-bip44.js';
import { SiEthereum } from "react-icons/si";

const App = () => {
  const [receive, setreceive] = useState()
  // const walletClient = new aptosWeb3.WalletClient();




  return (
    <div>
      {/* <button onClick={() => getProvider()} className="m-4 bg-slate-400">getProvider </button>
      <button onClick={() => connectWallet()} className="m-4 bg-slate-400">connect wallet</button>
      <button onClick={() => checkWallet()} className="m-4 bg-slate-400">checkWallet</button>
      <button onClick={() => disconnect()} className="m-4 bg-slate-400">disconnect</button>
      <div className=" bg-amber-300 flex">
        <button onClick={() => send()} className="m-4 bg-slate-400">send</button>
        <button onClick={() => sign()} className="m-4 bg-slate-400">sign</button>
      </div> */}
      <div className="">
        {/* {receive} */}
      </div>

{/* 
      <SiEthereum fontSize={100} color="#000" />
      <SiEthereum className="w-16 h-16 text-amber-700 " /> */}

    </div>
  )

}

export default App






// import React, { useEffect, useState } from 'react'
// import { AptosClient, TokenClient } from "aptos";
// // import aptosWeb3 from '@martiandao/aptos-web3.js';
// import aptosWeb3, { WalletClient } from '@martiandao/aptos-web3-bip44.js';
// import { SiEthereum } from "react-icons/si";

// const App = () => {
//   const [isMartianWalletInstalled, setisMartianWalletInstalled] = useState()
//   const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");
//   const tokenClient = new TokenClient(aptosClient);
//   const [receive, setreceive] = useState()
//   // const walletClient = new aptosWeb3.WalletClient();

//   const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
//   const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
//   // const walletClient = new aptosWeb3.WalletClient(NODE_URL, FAUCET_URL);
//   const walletClient = new WalletClient(NODE_URL, FAUCET_URL);
//   const address = "0x2d34a73c9b6e9ed5733e3a7ecf80a51a0d7dd8eabb0342b441d0d9916ead87fc";
//   //0x1e916f3391575b2ae1b968141aa4b35720a0bcc2840120d742e5ba37446f09b3

//   async function nameserv() {
//     const response = await fetch(`https://www.aptosnames.com/api/v1/name/${address}`);
//     const { name } = await response.json();
//     const receivestring = JSON.stringify(await walletClient.getSentEvents(address));
//     setreceive(receivestring)
//     console.log('Balance:', await walletClient.getBalance(address));
//     console.log('getTokenIds:', await walletClient.getTokenIds(address));
//     console.log('receive:', await walletClient.getReceivedEvents(address));
//     console.log('send:', await walletClient.getSentEvents(address));
//     console.log('eve:', await aptosClient.getEventsByEventKey("0x03000000000000002d34a73c9b6e9ed5733e3a7ecf80a51a0d7dd8eabb0342b441d0d9916ead87fc"));

//     console.log(name)
//   }

//   useEffect(() => {
//     setisMartianWalletInstalled(window.martian)
//   }, [])

//   useEffect(() => {
//     // if ("martian" in window) {
//     console.log("isMartianWalletInstalled", isMartianWalletInstalled)
//     // if (isMartianWalletInstalled !== undefined) {
//     checkWallet()
//     nameserv()
//     // }
//     // }
//   }, [isMartianWalletInstalled])

//   const getProvider = () => {
//     console.log("mat", window.martian)
//     if ("martian" in window) {
//       return (window.martian);
//     };
//     // window.open("https://www.martianwallet.xyz/", "_blank");
//   }

//   async function connectWallet() {
//     // console.log("mat", window.martian)
//     if ("martian" in window) {
//       await window.martian.connect();
//       console.log("mart", window.martian)
//     } else {
//       console.log("no mart", window.martian)
//     }
//   }

//   async function disconnect() {
//     await window.martian.disconnect();
//   }

//   async function checkWallet() {
//     if (window.martian._isConnected == false) return
//     const account = await window.martian.address
//     const isconnect = await window.martian.isConnected()
//     const balance = await tokenClient.getTokenBalanceForAccount(address, "0x1")
//     // const balance = await aptosClient.getChainId()
//     console.log("check", window.martian, account, isconnect, await window.martian.account())
//     console.log("balance", balance)
//   }

//   async function send() {
//     // Generate a transaction
//     const response = await window.martian.connect();
//     const sender = response.address;
//     const payload = {
//       type: "script_function_payload",
//       function: "0x1::coin::transfer",
//       type_arguments: ["0x1::aptos_coin::AptosCoin"],
//       arguments: ["0x1e916f3391575b2ae1b968141aa4b35720a0bcc2840120d742e5ba37446f09b3", "50"]
//     };
//     const transaction = await window.martian.generateTransaction(sender, payload);
//     const signedTxn = await window.martian.signTransaction(transaction);
//     const txnHash = await window.martian.submitTransaction(signedTxn);
//     console.log("send", txnHash)
//   }

//   async function sign() {
//     const signature = await window.martian.signMessage("This is a sample message");
//     console.log("sign", signature)
//     // {signature: '0x4d215a31797d56e28ee1c8e2cf5dc41b4aff9d2371b507d6…e97746dd7232fd6f1537d1b38e20dc620c44135de7b8ec107'}
//   }


//   return (
//     <div>
//       <button onClick={() => getProvider()} className="m-4 bg-slate-400">getProvider </button>
//       <button onClick={() => connectWallet()} className="m-4 bg-slate-400">connect wallet</button>
//       <button onClick={() => checkWallet()} className="m-4 bg-slate-400">checkWallet</button>
//       <button onClick={() => disconnect()} className="m-4 bg-slate-400">disconnect</button>
//       <div className=" bg-amber-300 flex">
//         <button onClick={() => send()} className="m-4 bg-slate-400">send</button>
//         <button onClick={() => sign()} className="m-4 bg-slate-400">sign</button>
//       </div>
//       <div className="">
//         {/* {receive} */}
//       </div>


//     </div>
//   )

// }

// export default App

