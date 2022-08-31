import * as Notifications from "expo-notifications";
import { Vibration } from "react-native";
import { gql } from "@apollo/client";
import { client } from "../utils/Apollo";
import { isMobile } from "./constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Checks for permssion for Notifications, asks expo for push token, sets up notification listeners, returns
 * push token to be used
 */
export async function getPushToken(): Promise<string | null> {
  const hasPermission = await getNotificationPermission();

  if (!hasPermission) {
    return null;
  }

  const pushToken = await Notifications.getExpoPushTokenAsync();

  return pushToken.data;
}

/**
 * function to get existing or prompt for notification permission
 * @returns boolean true if client has location permissions
 */
async function getNotificationPermission(): Promise<boolean> {
  const settings = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });

  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

/**
 * call getPushToken and send to backend
 * @param {string | null} previousPushToken a user's previous push token to compare aginst
 */
export async function updatePushToken(
  previousPushToken?: string | null
): Promise<void> {
  if (isMobile) {
    const UpdatePushToken = gql`
      mutation UpdatePushToken($token: String!) {
        updatePushToken(pushToken: $token)
      }
    `;

    const token = await getPushToken();

    if (previousPushToken && token === previousPushToken) {
      return;
    }

    if (token) {
      await client.mutate({ mutation: UpdatePushToken, variables: { token } });
    }
  }
}

export function handleNotification(
  notification: Notifications.Notification
): void {
  Vibration.vibrate();
}
