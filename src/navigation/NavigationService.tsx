import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams
} from "react-navigation";

type Navigator = null | NavigationContainerComponent;

let navigator: Navigator;

const setTopLevelNavigator = (navigatorRef: Navigator) => {
  navigator = navigatorRef;
};

const navigate = (routeName: string, params: NavigationParams) => {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        params,
        routeName
      })
    );
  }
};

export default {
  navigate,
  setTopLevelNavigator
};
