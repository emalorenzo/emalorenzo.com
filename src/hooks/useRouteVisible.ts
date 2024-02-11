import { usePathname } from "next/navigation";

import { useLoaderStore } from "~/store/loader";

export function useRouteVisible(customRoute?: string) {
  const pathname = usePathname();
  const targetRoute = useLoaderStore((state) => state.targetRoute);
  const appReady = useLoaderStore((state) => state.appReady);

  const target = targetRoute?.split("/?")[0];

  if (!appReady) return false;
  if (!targetRoute) return true;

  return customRoute ? target === customRoute : target === pathname;
}
