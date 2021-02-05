import NProgress from "nprogress";
import Router from "next/router";
import Page from "../components/Page";

// TODO: swap with your own
import "nprogress/nprogress.css";
import "../components/styles/nprogress.css";

// adds progress bar when routing.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
