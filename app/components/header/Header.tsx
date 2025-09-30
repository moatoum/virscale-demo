import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { themeStore } from '~/lib/stores/theme';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const chat = useStore(chatStore);
  const theme = useStore(themeStore);

  return (
    <>
      <header
        className={classNames('flex items-center px-4 border-b h-[var(--header-height)] relative', {
          'border-transparent': !chat.started,
          'border-bolt-elements-borderColor': chat.started,
        })}
        suppressHydrationWarning
      >
        {/* Powered by section - absolutely positioned */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 text-sm text-bolt-elements-textSecondary opacity-80 z-10">
          <span>Powered by</span>
          <a
            href="http://yotta.solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="/yotta-logo.png"
              alt="Yotta Solutions"
              className={classNames('h-6 w-auto inline-block filter', {
                invert: theme === 'light',
                '': theme === 'dark',
              })}
            />
          </a>
        </div>
        <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
          <div className="i-ph:sidebar-simple-duotone text-xl" />
          <a href="/" className="text-2xl font-semibold text-accent flex items-center">
            {/* <span className="i-bolt:logo-text?mask w-[46px] inline-block" /> */}
            <img
              src="/logo-light-styled.png"
              alt="Virscale"
              className={classNames('w-[90px] inline-block filter', {
                invert: theme === 'dark',
                '': theme === 'light',
              })}
            />
          </a>
        </div>
        {chat.started && ( // Display ChatDescription and HeaderActionButtons only when the chat has started.
          <>
            <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
              <ClientOnly>{() => <ChatDescription />}</ClientOnly>
            </span>
            <ClientOnly>
              {() => (
                <div className="">
                  <HeaderActionButtons chatStarted={chat.started} />
                </div>
              )}
            </ClientOnly>
          </>
        )}
      </header>
    </>
  );
}
