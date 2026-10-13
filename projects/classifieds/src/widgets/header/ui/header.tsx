import { ToggleTheme } from "@/features/toggle-theme";
import { Logo } from "@/shared/ui/logo";
import { HeaderActions } from "@/widgets/header/ui/header-actions";
import { UserNav } from "@/widgets/header/ui/user-nav";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-100 border-b bg-card">
      <div className="mx-auto flex h-14 w-full max-w-[1340px] items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-4 max-[391px]:gap-2">
          <HeaderActions />
          <UserNav />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
