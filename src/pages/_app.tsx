import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };
  }, [router]);

  // Variables
  const getLayout = Component.getLayout ?? ((page, pageProps) => <UserLayout pageProps={pageProps}>{page}</UserLayout>);

  return (
    <CacheProvider value={emotionCache}>
       <SessionProvider session={pageProps.session}>
      <Head>
        <title>{`${themeConfig.templateName} - Website Option Cyber Solutions`}</title>
        <meta name="csrf-token" content="{{ CSRFToken }}" />

        <meta
          name='description'
          content={`${themeConfig.templateName} – WOCSOL is a complete digital development and digital services provider platform where one can seek any type of project development starting from website development, mobile apps development, website clone scripts, games development, search engine optimisation and other digital marketing services including social media marketing and bulk sms services and bulk sms reseller partnership.`}
        />
        <meta name='keywords' content='Website Option Cyber Solutions, Website development, App development, Game Development, Webhosting, Bulk SMS Services , SEO , SMM , Digital Marketing, Logo Designing.' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://wocsol.com/images/logo.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7136029550390873"
     crossorigin="anonymous"></script>
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
            <ThemeComponent settings={settings}>
              {loading && <Spinner />}
              {getLayout(<Component {...pageProps} />)}
            </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
      </SessionProvider>
    </CacheProvider>
  )
}

export default App
