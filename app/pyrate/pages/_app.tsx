import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"

import SimpleSidebar from '../components/SideBar'

// import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter()
  // const pathname = router.pathname
    return <ChakraProvider>
    <SimpleSidebar>
      <Component {...pageProps} />
    </SimpleSidebar>
  </ChakraProvider>
  
}

export default MyApp

