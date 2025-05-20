import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;

// Tambahkan ini di bawah export default
export { reportWebVitals } from '../reportWebVitals';