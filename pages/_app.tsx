import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Home mar</title>
        <link rel="apple-touch-icon" href="/vercel.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
