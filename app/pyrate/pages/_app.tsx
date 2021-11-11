import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"

import SideBarLayout from '../components/SideBarLayout'

// import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter()
  // const pathname = router.pathname
    return <ChakraProvider>
    <SideBarLayout>
      <Component {...pageProps} />
    </SideBarLayout>
  </ChakraProvider>
  
}

export default MyApp

