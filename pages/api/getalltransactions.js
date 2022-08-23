// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// http://localhost:3000/api/getalltransctions?address={adderss}

import { WalletClient } from '@martiandao/aptos-web3-bip44.js';
import axios from 'axios'

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

export default async function handler(req, res) {
  const { address } = req.query;

  const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
  const FAUCET_URL = "https://faucet.devnet.aptoslabs.com/";
  const walletClient = new WalletClient(NODE_URL, FAUCET_URL);

  const sendEvents = await walletClient.getSentEvents(address)
  const receiveEvents = await walletClient.getReceivedEvents(address)        // receiveEvents have no timestamps.
  const getEventsWithTime = await Promise.all(receiveEvents.map(async i => {
    const eventWithTime = await fetchEvent(i.version)
    return eventWithTime
  }))
  const combinedEvents = [...sendEvents, ...getEventsWithTime]
  const transactions = [...combinedEvents].sort((a, b) => b.timestamp - a.timestamp);
  res.status(200).json( transactions )
}
