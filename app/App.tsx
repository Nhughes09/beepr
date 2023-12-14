import "react-native-gesture-handler";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Sentry from "sentry-expo";
import { cache, client } from "./utils/Apollo";
import { ApolloProvider, useQuery, useSubscription } from "@apollo/client";
import { UserDataQuery, UserUpdatesSubscription } from "./generated/graphql";
import { NativeBaseProvider, useColorMode } from "native-base";
import { colorModeManager } from "./utils/theme";
import { updatePushToken } from "./utils/Notifications";
import { UserData, UserSubscription } from "./utils/useUser";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setUserContext } from "./utils/sentry";
import { StatusBar } from "expo-status-bar";
import { NATIVE_BASE_THEME } from "./utils/constants";
import { Navigation } from "./navigators/Navigation";
import config from "./package.json";
import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { setPurchaseUser, setupPurchase } from "./utils/purchase";

SplashScreen.preventAutoHideAsync();

Sentry.init({
  release: config.version,
  dsn: "https://22da81efd1744791aa86cfd4bf8ea5eb@o1155818.ingest.sentry.io/6358990",
  enableInExpoDevelopment: true,
  enableAutoSessionTracking: true,
  enableAutoPerformanceTracing: true,
});

setupPurchase();

function Beep() {
  const { colorMode } = useColorMode();
  const { data, loading } = useQuery<UserDataQuery>(UserData, {
    errorPolicy: "none",
    onCompleted: () => {
      updatePushToken();
    },
  });

  const user = data?.getUser;

  useSubscription<UserUpdatesSubscription>(UserSubscription, {
    onData({ data }) {
      cache.updateQuery<UserDataQuery>({ query: UserData }, () => ({ getUser: data.data!.getUserUpdates }));
    },
    skip: !user,
  });

  useEffect(() => {
    if (user) {
      setPurchaseUser(user);
      setUserContext(user);
    }
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar style={colorMode === "dark" ? "light" : "dark"} />
      <Navigation theme={colorMode === "dark" ? DarkTheme : DefaultTheme} />
    </>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider
        theme={NATIVE_BASE_THEME}
        colorModeManager={colorModeManager}
        config={{
          dependencies: {
            "linear-gradient": require("expo-linear-gradient").LinearGradient,
          },
        }}
      >
        <ApolloProvider client={client}>
          <Beep />
        </ApolloProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default App;
