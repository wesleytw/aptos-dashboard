import '../styles/globals.css'
import Head from "next/head";
import Layout from '../components/Layout'
import WalletProvider from '../src/contexts/WalletContext'
import Web3Provider from "@fewcha/web3-react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="apple-touch-icon" href="/vercel.svg" />
      </Head>
      {/* <Web3Provider> */}
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
      {/* </Web3Provider> */}
    </>
  )
}

export default MyApp
