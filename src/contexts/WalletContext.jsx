import React, { useContext, useState, useEffect, createContext } from 'react'
import axios from 'axios'
// import { AptosClient, TokenClient } from "aptos";
import { WalletClient } from '@martiandao/aptos-web3-bip44.js';
import { BCS, TxnBuilderTypes } from 'aptos';

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
  const [allTransactions, setallTransactions] = useState()

  // const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");
  // const tokenClient = new TokenClient(aptosClient);
  const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
  const FAUCET_URL = "https://faucet.devnet.aptoslabs.com/";
  const walletClient = new WalletClient(NODE_URL, FAUCET_URL);

  useEffect(() => {
    if ("martian" in window) {
      if (iswallet === false) { setiswallet(true) }
      checkWallet()
    } else if ("aptos" in window) {
      if (iswallet === false) { setiswallet(true) }
      checkWallet()
    } else {
      setiswallet(false)
    }
  }, [iswallet, isconnect])

  async function checkWallet() {
    if ("martian" in window) {
      const isConnectMartian = await window.martian.isConnected()
      if (!isConnectMartian) {
        setisconnect(false)
        return
      }
      setisconnect(true)
      setaccount(await window.martian.address)
    } else if ("aptos" in window) {
      const isConnect = await window.aptos.isConnected()
      if (!isConnect) {
        setisconnect(false)
        return
      }
      setisconnect(true)
      const addr = (await window.aptos.account()).address
      setaccount(addr)
    }
  }

  useEffect(() => {
    console.log("account", account)
    if (account === undefined) {
      return
    }
    async function getAccountInfo() {
      setbalance(await walletClient.getBalance(account))
      settokens(await walletClient.getTokenIds(account))
      const sendEvents = await walletClient.getSentEvents(account)
      const descendSendEvents = [...sendEvents].sort((a, b) => b.timestamp - a.timestamp);
      settransactions(descendSendEvents)
      const receiveEvents = await walletClient.getReceivedEvents(account)        // receiveEvents have no timestamps.
      const getEventsWithTime = await Promise.all(receiveEvents.map(async i => {
        const eventWithTime = await fetchEvent(i.version)
        return eventWithTime
      }))
      const descendReceiveEvents = [...getEventsWithTime].sort((a, b) => b.timestamp - a.timestamp);
      setreceptions(descendReceiveEvents)
      const combinedEvents = [...sendEvents, ...getEventsWithTime]
      const descendCombinedEvents = [...combinedEvents].sort((a, b) => b.timestamp - a.timestamp);
      setallTransactions(descendCombinedEvents)
      const name = await nameService(account)
      if (name !== undefined) { setname(name) }
    }
    getAccountInfo()
  }, [account])

  async function getAllTransctions(account) {
    if (account === undefined) return "account undefined"
    const sendEvents = await walletClient.getSentEvents(account)
    const receiveEvents = await walletClient.getReceivedEvents(account)        // receiveEvents have no timestamps.
    const getEventsWithTime = await Promise.all(receiveEvents.map(async i => {
      const eventWithTime = await fetchEvent(i.version)
      return eventWithTime
    }))
    const combinedEvents = [...sendEvents, ...getEventsWithTime]
    const descendCombinedEvents = [...combinedEvents].sort((a, b) => b.timestamp - a.timestamp);
    // setallTransactions(descendCombinedEvents)
    return descendCombinedEvents
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
    } else if ("aptos" in window) {
      try {
        await window.aptos.connect();
        setisconnect(true)
        const addr = (await window.aptos.account()).address
        setaccount(addr)
      } catch (error) {
        setisconnect(false)
        console.log(error)
      }
      console.log("connectWalleted atp")
    } else {
      resetState()
      console.log("no wallet")
    }
  }

  async function disconnect() {
    if ("martian" in window) {
      if (window.martian._isConnected === false) return
      await window.martian.disconnect();
      resetState()
      console.log("isConnected apt wallet", await window.martian._isConnected)
    } else if ("aptos" in window) {
      if (await window.aptos.isConnected() === false) return
      await window.aptos.disconnect()
      resetState()
      console.log("isConnected apt wallet", await window.aptos.isConnected())
    }
  }

  async function sendApt(address, amount) {
    if ("martian" in window) {
      try {
        const response = await window.martian.connect();
        const sender = response.address;
        const payload = {
          type: "entry_function_payload",
          function: "0x1::coin::transfer",
          type_arguments: ["0x1::aptos_coin::AptosCoin"],
          arguments: [address, amount]
        };
        const transaction = await window.martian.generateTransaction(sender, payload);
        const signedTxn = await window.martian.signTransaction(transaction);
        const txnHash = await window.martian.submitTransaction(signedTxn);
        console.log("send", txnHash)
      } catch (error) {
        console.log(error)
      }
    } else if ("aptos" in window) {
      try {
        const transaction = {
          arguments: [address, amount],
          function: '0x1::coin::transfer',
          type: 'entry_function_payload',
          type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };
        const response = await window.aptos.signAndSubmitTransaction(transaction)
        console.log("rep", response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function sign(address, amount) {
    if ("martian" in window) {
      const signature = await window.martian.signMessage("This is a sample message");
      console.log("sign", signature)
    } else if ("aptos" in window) {
      const transaction = {
        arguments: [address, amount],
        function: '0x1::coin::transfer',
        type: 'entry_function_payload',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      }
      const signedTransaction = await window.aptos.signTransaction(transaction)
      console.log("sign", signedTransaction)
    }
  }

  function resetState() {
    setisconnect(false)
    setaccount()
    setname()
    setbalance()
    settokens()
    settransactions()
    setreceptions()
  }

  async function nameService(address) {
    const response = await fetch(`https://www.aptosnames.com/api/v1/name/${address}`);
    const { name } = await response.json();
    return name
  }

  async function fetchEvent(version) {
    let item
    try {
      const fetchIt = await axios.get(
        `https://fullnode.devnet.aptoslabs.com/v1/transactions/by_version/${version}`, {})
      item = fetchIt.data
      return item
    } catch (error) {
      console.log("fetch error", error)
    }
  }

  const contextValue = {
    iswallet: iswallet,
    isconnect: isconnect,
    account: account,
    name: name,
    balance: balance,
    tokens: tokens,
    transactions: transactions,
    receptions: receptions,
    allTransactions: allTransactions,
    getAllTransctions: getAllTransctions,
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

