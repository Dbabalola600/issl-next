import '../styles/globals.css'
import '../styles/nprogress.css'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps, NextWebVitalsMetric } from 'next/app'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress';
import { config } from 'process'

import Script from 'next/script';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {

  const router = useRouter();


  useEffect(() => {

    //the web vitals for google analytics
    // const handleRouteChange = ( url:URL) => {
    //       window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    //         page_path: url,
    //       });
    //     }

    //loading bar
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());

    //webvital
    // router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        // router.events.off('routeChangeComplete', handleRouteChange);
      }
  }, []);

  // Use the layout defined at the page level, if available


  return (
      <Component {...pageProps} />
  
  )
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)

// }




//const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
 
// useEffect(() => {
//   const handleRouteChange = ( url:URL) => {
//     window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
//       page_path: url,
//     });
//   }
//   router.events.on('routeChangeComplete', handleRouteChange);
//   return () => {
//     router.events.off('routeChangeComplete', handleRouteChange);
//   }
// }, [router.events]);



// method 2 

// return (

//   <>
//     {process.env.NEXT_PUBLIC_GA_ID && (
//       <>
//         <Script
//           src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){window.dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
//           `}
//         </Script>
//       </>
//     )}

//     <Component {...pageProps} />
//   </>



// )