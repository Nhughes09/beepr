import "react-native-gesture-handler";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "./routes/global/Profile";
import { ReportScreen } from "./routes/global/Report";
import { RateScreen } from "./routes/global/Rate";
import { client } from "./utils/Apollo";
import { ApolloProvider, useQuery } from "@apollo/client";
import { UserDataQuery } from "./generated/graphql";
import { NativeBaseProvider, useColorMode } from "native-base";
import { BeepDrawer } from "./components/Drawer";
import { colorModeManager } from "./utils/theme";
import { handleNotification, updatePushToken } from "./utils/Notifications";
import { UserData, UserSubscription } from "./utils/useUser";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setUserContext } from "./utils/sentry";
import { StatusBar } from "expo-status-bar";
import { NATIVE_BASE_THEME } from "./utils/constants";
import { AddCar } from "./app/(app)/cars/add";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { ChangePasswordScreen } from "./routes/settings/ChangePassword";
import * as SplashScreen from "expo-splash-screen";
import config from "./package.json";
import * as Sentry from "sentry-expo";

let unsubscribe: (() => void) | null = null;

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();
Sentry.init({
  release: config.version,
  dsn: "https://22da81efd1744791aa86cfd4bf8ea5eb@o1155818.ingest.sentry.io/6358990",
  enableInExpoDevelopment: true,
  enableAutoSessionTracking: true,
  enableAutoPerformanceTracing: true,
});

function Beep() {
  const { colorMode } = useColorMode();
  const { data, loading, subscribeToMore } = useQuery<UserDataQuery>(UserData, {
    errorPolicy: "none",
    onCompleted: () => {
      updatePushToken();
    },
  });

  const user = data?.getUser;

  useEffect(() => {
    if (user) {
      if (unsubscribe === null) {
        unsubscribe = subscribeToMore({
          document: UserSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            // @ts-expect-error apollo dumb
            const newFeedItem = subscriptionData.data.getUserUpdates;
            return Object.assign({}, prev, {
              getUser: newFeedItem,
            });
          },
        });
      }

      setUserContext(user);
    }
  }, [user]);

  React.useEffect(() => {
    const subscription =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => subscription.remove();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar style={colorMode === "dark" ? "light" : "dark"} />
      <NavigationContainer
        theme={colorMode === "dark" ? DarkTheme : DefaultTheme}
      >
        <Stack.Navigator
          initialRouteName={user ? "Main" : "Login"}
          screenOptions={{
            headerTintColor: colorMode === "dark" ? "white" : "black",
          }}
        >
          {!user ? (
            <>
            </>
          ) : (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Main"
                component={BeepDrawer}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen
                name="Report"
                component={ReportScreen}
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="Rate"
                component={RateScreen}
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="Change Password"
                component={ChangePasswordScreen}
              />
              <Stack.Screen name="Add Car" component={AddCar} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function App2() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider
        theme={NATIVE_BASE_THEME}
        colorModeManager={colorModeManager}
      >
        <Beep />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <App2 />
    </ApolloProvider>
  );
}

export default App;
