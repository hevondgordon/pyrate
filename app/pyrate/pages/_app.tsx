import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'

import LocalSideBarLayout from '../components/LocalSideBarLayout'

// import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter()
  // const pathname = router.pathname
  return (
    <LocalSideBarLayout>
      <Component {...pageProps} />
    </LocalSideBarLayout>)
}

export default MyApp

