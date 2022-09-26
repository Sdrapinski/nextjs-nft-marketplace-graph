import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Header from "../components/Header";
import "../styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/35450/nft-marketplace/v0.0.2",
});

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Nft Marketplace</title>
        <meta name="description" content="NfT marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Header />
            <Component {...pageProps} />
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </div>
  );
}

export default MyApp;
