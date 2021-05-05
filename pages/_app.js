import '../styles/globals.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://base-wordpress.consumedesign.com/graphql';

function MyApp({ Component, pageProps }) {
  //  debugger
  return <Component {...pageProps} />
}

export default MyApp
