import { Link, useLocation } from "react-router";
import clsx from "clsx";

import { changeBase } from "@/utils";

import { useTheme } from "@hooks/useTheme";

import type { Theme } from "@/types";

const icons: Record<Theme, string> = {
  light: `/light.svg`,
  dark: `/dark.svg`,
  pink: `/favicon.svg`,
};

export default function Header() {
  const { pathname } = useLocation();
  const isFeedPage = pathname === `/`;

  const { theme, handleToggleTheme } = useTheme();

  return (
    <header className="fixed left-0 top-0 z-[1000] flex justify-center w-screen bg-background">
      <div className="flex justify-center gap-2 max-[500px]:justify-between max-[500px]:gap-0 w-[300px]">
        <Link
          className={clsx(
            "active-element flex h-[3.125rem] w-fit items-center p-2",
            isFeedPage && "line-through pointer-events-none",
          )}
          to={`/`}
        >
          Feed
        </Link>
        <Link
          className={clsx(
            "active-element flex h-[3.125rem] w-fit items-center p-2",
            !isFeedPage && "line-through pointer-events-none",
          )}
          to={`/favorites`}
        >
          Favorites
        </Link>
        <button
          className="active-element aspect-square w-[50px] flex justify-center items-center"
          onClick={handleToggleTheme}
        >
          <img
            className="aspect-square w-[32px]"
            src={changeBase(icons[theme])}
            alt="Change Theme"
          />
        </button>
      </div>
    </header>
  );
}
