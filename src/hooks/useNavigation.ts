import { NavigationOptions, useLoaderStore } from "~/store/loader";

export function useNavigation() {
  const setTargetRoute = useLoaderStore.getState().setTargetRoute;

  const navigateTo = (targetPath: string, navigationOptions: NavigationOptions = {}) => {
    setTargetRoute(targetPath, navigationOptions);
  };

  return navigateTo;
}
