import '../styles/globals.css'
import Head from "next/head";
import Layout from '../components/Layout'
import WalletProvider from '../src/context/WalletContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aptos Dashboard</title>
        <link rel="apple-touch-icon" href="/vercel.svg" />
      </Head>
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </>
  )
}

export default MyApp
