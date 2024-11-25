"use client";

import { type PropsWithChildren, useEffect } from "react";
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
} from "@tma.js/sdk-react";
import { useDidMount } from "./hooks/useDidMount";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { ErrorPage } from "@/app/components/ErrorPage";
import Script from "next/script";

function App(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewPort = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewPort && bindViewportCSSVars(viewPort);
  }, [viewPort]);

  if (!lp || Object.keys(lp).length === 0) {
    return (
      <div>
        <h1>Application Not launched from Telegram</h1>
        <p>Please launch this app as a MiniApp</p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <AppRoot
        appearance={miniApp.isDark ? "dark" : "light"}
        platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      >
        {props.children}
      </AppRoot>
    </>
  );
}

function RootInner({ children }: PropsWithChildren) {
  return (
    <SDKProvider debug>
      <App>{children}</App>
    </SDKProvider>
  );
}

export function Root(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
