"use client"

import { NextPageContext } from 'next';

import Framework7 from 'framework7/lite-bundle';
import Framework7React, { App, View } from 'framework7-react';
import { usePathname } from 'next/navigation'

// Import icons and styles
import 'framework7/css/bundle';

import 'framework7-icons/css/framework7-icons.css';
import 'material-icons/iconfont/material-icons.css';

Framework7.use(Framework7React);

// App routes
const routes = [
  {
    path: '/',
    asyncComponent: () => import('./pages/index'),
  },
];

function MyApp({ Component, pageProps }) {
  // current Next.js route
  // change the line below to a new v13 NextJS setup per migration guide
  const pathname = usePathname()

  /*
    Here we need to know (mostly on server-side) on what URL user opens our app
  */
  const url = `${process.env.NEXT_PUBLIC_HOST}${pathname}`;

  return (
    /*
      Here we pass initial server URL and routes to the Framework7's App.
      It is required because Framework7 will be initialized on server-side,
      and we need to know this URL to correctly load pages by Framework7 router
    */
    <App url={url} routes={routes}>
      {/*
        Create main View.
        Apparently we need to enable browserHistory to navigating by URL
      */}
      <View
        main
        browserHistory
        browserHistorySeparator=""
        browserHistoryInitialMatch={true}
        browserHistoryStoreHistory={false}
        url="/"
      >
        {/*
          Initial page components (returned by Next.js).
          Here it is mandatory to set `initialPage` prop on it.
        */}
        <Component initialPage {...pageProps} />
      </View>
    </App>
  );
}

/*
  Required for server-side device detection based on user-agent.
  Comment this code if you don't need it.
*/

MyApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  if (ctx && ctx.req && ctx.req.headers) {
    return {
      userAgent: ctx.req.headers['user-agent']
    }
  }
  return {};
}

export default MyApp;
