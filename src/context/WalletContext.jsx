import React, { useContext, useState, useEffect, createContext } from 'react'
// import { AptosClient, TokenClient } from "aptos";
import { WalletClient } from '@martiandao/aptos-web3-bip44.js';

const web3Context = createContext()

export function useWeb3Context() {
  return useContext(web3Context)
}

const WalletProvider = ({ children }) => {
  const [iswallet, setiswallet] = useState(false)
  const [isconnect, setisconnect] = useState(false)
  const [account, setaccount] = useState()
  const [name, setname] = useState()
  const [balance, setbalance] = useState()
  const [tokens, settokens] = useState()
  const [transactions, settransactions] = useState()
  const [receptions, setreceptions] = useState()
  // const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");
  // const tokenClient = new TokenClient(aptosClient);
  const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
  const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
  const walletClient = new WalletClient(NODE_URL, FAUCET_URL);
  async function nameService(address) {
    const response = await fetch(`https://www.aptosnames.com/api/v1/name/${address}`);
    const { name } = await response.json();
    return name
  }

  async function connectWallet() {
    if ("martian" in window) {
      try {
        await window.martian.connect();
        setisconnect(true)
        setaccount(await window.martian.address)
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

  async function checkWallet() {
    const isConnectMartian = await window.martian.isConnected()
    if (!isConnectMartian) {
      setisconnect(false)
      return
    }
    setisconnect(true)
    setaccount(await window.martian.address)
  }

  useEffect(() => {
    console.log("acc", account)
    if (account === undefined) return
    async function getAccountInfo() {
      setname(await nameService(account))
      setbalance(await walletClient.getBalance(account))
      settokens(await walletClient.getTokenIds(account))
      settransactions(await walletClient.getSentEvents(account))
      setreceptions( await walletClient.getReceivedEvents(account))
    }
    getAccountInfo()
  }, [account])


  async function sendApt(address, amount) {
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
    name: name,
    balance: balance,
    tokens: tokens,
    transactions: transactions,
    receptions: receptions,
    connectWallet: connectWallet,
    disconnect: disconnect,
    sign: sign,
    sendApt: sendApt
  }

  return (
    <web3Context.Provider value={contextValue}>
      {children}
    </web3Context.Provider>
  )
}
export default WalletProvider

