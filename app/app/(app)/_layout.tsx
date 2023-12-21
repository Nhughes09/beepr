import { Redirect, Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Text } from 'react-native';
import { UserData, UserSubscription } from '../../utils/useUser';
import { useQuery } from '@apollo/client';
import { UserDataQuery } from '../../generated/graphql';
import { updatePushToken } from '../../utils/Notifications';
import { useEffect } from 'react';
import { setUserContext } from '../../utils/sentry';
import { CustomDrawerContent } from '../../components/Drawer';
import { useColorMode } from 'native-base';
import * as Splashscreen from 'expo-splash-screen';

let unsubscribe: (() => void) | null = null;

export default function AppLayout() {
  const { colorMode } = useColorMode();
  const { data, loading, subscribeToMore } = useQuery<UserDataQuery>(UserData, {
    errorPolicy: "none",
    onCompleted: () => {
      updatePushToken();
      // Splashscreen.hideAsync();
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

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Drawer
        initialRouteName="ride"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: "front",
          headerTintColor: colorMode === "dark" ? "white" : "black",
        }}
      />
    </>
  );
}