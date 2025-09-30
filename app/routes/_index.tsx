import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [
    { title: 'Virscale' },
    { name: 'description', content: 'Talk with Virscale, your AI-powered development platform' },
  ];
};

export const loader = () => json({});

function ChatFallback() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="i-svg-spinners:90-ring-with-bg text-4xl text-bolt-elements-loader-progress" />
        <p className="text-bolt-elements-textSecondary">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Landing page component for Virscale
 * Note: Settings functionality should ONLY be accessed through the sidebar menu.
 * Do not add settings button/panel to this landing page as it was intentionally removed
 * to keep the UI clean and consistent with the design system.
 */
export default function Index() {
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <ClientOnly fallback={<ChatFallback />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
