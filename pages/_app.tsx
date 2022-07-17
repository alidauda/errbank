import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ProvideAuth } from '../lib/firebase'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ProvideAuth>
    <ChakraProvider>
  <Component {...pageProps} />
  </ChakraProvider>
  </ProvideAuth>);
}

export default MyApp
