import { createStackNavigator } from "@react-navigation/stack";
import { useColorMode } from "native-base";
import { useIsSignedIn, useIsSignedOut } from "../utils/useUser";
import { Drawer } from "./Drawer";
import { ProfileScreen } from "../routes/global/Profile";
import { ReportScreen } from "../routes/global/Report";
import { RateScreen } from "../routes/global/Rate";
import { ChangePasswordScreen } from "../routes/settings/ChangePassword";
import { PickBeepScreen } from "../routes/ride/PickBeep";
import { AddCar } from "../routes/cars/AddCar";
import { LoginScreen } from "../routes/auth/Login";
import { SignUpScreen } from "../routes/auth/SignUp";
import { ForgotPasswordScreen } from "../routes/auth/ForgotPassword";
import { StaticParamList, createStaticNavigation } from "@react-navigation/native";

const RootStack = createStackNavigator({
  screens: {},
  screenOptions: () => {
    const { colorMode } = useColorMode();
    return {
      headerTintColor: colorMode === "dark" ? "white" : "black",
      drawerType: "front",
    }
  },
  groups: {
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        Main: {
          screen: Drawer,
          options: {
            headerShown: false,
          },
        },
        Profile: ProfileScreen,
        Report: {
          screen: ReportScreen,
          options: {
           presentation: 'modal',
          }
        },
        Rate: {
          screen: RateScreen,
          options: {
           presentation: 'modal',
          }
        },
        ChangePassword: ChangePasswordScreen,
        ChooseBeeper: PickBeepScreen,
        AddCar: AddCar,
      },
    },
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        SignIn: {
          screen: LoginScreen,
          options: {
            headerShown: false,            
          },
        },
        SignUp: SignUpScreen,
        ForgotPassword: ForgotPasswordScreen,
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const Navigation = createStaticNavigation(RootStack);
