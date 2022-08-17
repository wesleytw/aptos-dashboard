import React, { useContext, useState, useEffect, createContext } from 'react'
import { AptosClient, TokenClient } from "aptos";
// import aptosWeb3 from '@martiandao/aptos-web3.js';
import aptosWeb3, { WalletClient } from '@martiandao/aptos-web3-bip44.js';

const web3Context = createContext()

// 把context包useContext再export，就不用在children用useContext包
export function useWeb3Context() {
  return useContext(web3Context)
}

const WalletProvider = ({ children }) => {
  const [iswallet, setiswallet] = useState(false)
  const [isconnect, setisconnect] = useState(false)
  const [account, setaccount] = useState()
  const [name, setname] = useState()
  const [balance, setbalance] = useState()
  const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");
  const tokenClient = new TokenClient(aptosClient);
  const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
  const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
  // const walletClient = new aptosWeb3.WalletClient(NODE_URL, FAUCET_URL);
  const walletClient = new WalletClient(NODE_URL, FAUCET_URL);
  const address = "0x2d34a73c9b6e9ed5733e3a7ecf80a51a0d7dd8eabb0342b441d0d9916ead87fc";
  //0x1e916f3391575b2ae1b968141aa4b35720a0bcc2840120d742e5ba37446f09b3

  async function nameService() {
    const response = await fetch(`https://www.aptosnames.com/api/v1/name/${account}`);
    const { name } = await response.json();
    const receivestring = JSON.stringify(await walletClient.getSentEvents(account));
    // setreceive(receivestring)
    console.log('Balance:', await walletClient.getBalance(account));
    // console.log('getTokenIds:', await walletClient.getTokenIds(account));
    console.log('receive:', await walletClient.getReceivedEvents(account));
    console.log('send:', await walletClient.getSentEvents(account));
    // console.log('eve:', await aptosClient.getEventsByEventKey("0x03000000000000002d34a73c9b6e9ed5733e3a7ecf80a51a0d7dd8eabb0342b441d0d9916ead87fc"));

    console.log("n",name,typeof account)
  }


  async function connectWallet() {
    // console.log("mat", window.martian)
    if ("martian" in window) {
      try {
        await window.martian.connect();
        setisconnect(true)
      } catch (error) {
        setisconnect(false)
        console.log(error)
      }
      console.log("connectWalleted", window.martian)
    } else {
      console.log("no martian", window.martian)
    }
  }

  async function disconnect() {
    if (window.martian._isConnected === false) return
    await window.martian.disconnect();
  }

  const getProvider = () => {
    console.log("mat", window.martian)
    if ("martian" in window) {
      return (window.martian);
    };
    // window.open("https://www.martianwallet.xyz/", "_blank");
  }

  async function checkWallet() {
    const isConnectMartian = await window.martian.isConnected()
    if (!isConnectMartian) {
      setisconnect(false)
      return
    }
    setisconnect(true)
    // if (window.martian._isConnected == false) return
    // const account = await window.martian.address
    setaccount(await window.martian.address)
    // await nameService()
    // setbalance(await tokenClient.getTokenBalanceForAccount(account, "0x1"))
    // // const balance = await tokenClient.getTokenBalanceForAccount(address, "0x1")
    // // const balance = await aptosClient.getChainId()
    // console.log("check", window.martian, account, isconnect, await window.martian.account())
    // console.log("balance che", balance)
  }

  useEffect(() => {
    if (account === undefined) return
    async function getAccountInfo() {
      await nameService()
      // Fetch user transactions
      const response = await window.martian.connect();
      const address = response.address;
      const transactions = await window.martian.getAccountTransactions(address);
      console.log("tran",transactions)
    }
    getAccountInfo()
  }, [account])


  async function sendApt(address, amount) {
    // Generate a transaction
    const response = await window.martian.connect();
    const sender = response.address;
    const payload = {
      type: "script_function_payload",
      function: "0x1::coin::transfer",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [address, amount]
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

  useEffect(() => {
    if ("martian" in window) {
      if (iswallet === false) { setiswallet(true) }
      checkWallet()
    } else {
      setiswallet(false)
    }
  }, [iswallet, isconnect])

  const contextValue = {
    iswallet: iswallet,
    isconnect: isconnect,
    account: account,
    balance: balance,
    connectWallet: connectWallet,
    disconnect: disconnect,
    sign: sign,
    sendApt: sendApt,
    // setisconnect: setisconnect 
  }

  return (
    // 每個provider 只能一個value 所以會有很多provider wrapper
    // ，這裡把它全部先包裝 才不會在App.js包一堆。 
    //不對，value可包成物件 方便。
    <web3Context.Provider value={contextValue}>
      {children}
    </web3Context.Provider>
  )
}
export default WalletProvider

