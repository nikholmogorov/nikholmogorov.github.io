import { DESKTOP_QUERY } from "../constants";

import type { DesktopOnlyGuardProps } from "../types";

export default function DesktopOnlyGuard(props: DesktopOnlyGuardProps) {
  const { children } = props;

  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;

  if (!isDesktop) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="nes-container with-title bg-red-800 border-red-950!">
          <p className="title text-black bg-red-800!">CUBE FIGHT</p>
          <p className="panel__description text-black">Mobiles not supported</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
