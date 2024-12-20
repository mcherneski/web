'use client';

import { type PropsWithChildren } from 'react';
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { ErrorPage } from '@/app/components/error-page';

import { useDidMount } from '@/app/hooks/useDidMount';
import { init } from '@/app/init';

import { useClientOnce } from '@/app/hooks/useClientOnce';

function RootInner({ children }: PropsWithChildren) {

  const lp = useLaunchParams();
  useClientOnce(() => {
    init(lp.startParam === 'debug');
  });

  const isDark = useSignal(miniApp.isDark);

  return (
      <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      >
        {children}
      </AppRoot>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props}/>
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}