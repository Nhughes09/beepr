import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PasswordInput from "../../components/PasswordInput";
import { Alert } from "../../utils/Alert";
import { GradietnButton } from "../../components/GradientButton";
import { isMobile } from "../../utils/constants";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "../../generated/graphql";
import { client, wsLink } from "../../utils/Apollo";
import { getPushToken } from "../../utils/Notifications";
import { Navigation } from "../../utils/Navigation";
import { Container } from "../../components/Container";
import { UserData } from "../../utils/useUser";
import { Stack, Button, Input, Heading, Flex, Spacer, Box, FormControl, WarningOutlineIcon } from "native-base";
import { Logger } from "../../utils/Logger";
import { useValidationErrors } from "../../utils/useValidationErrors";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const Login = gql`
  mutation Login($username: String!, $password: String!, $pushToken: String) {
    login(
      input: { username: $username, password: $password, pushToken: $pushToken }
    ) {
      tokens {
        id
        tokenid
      }
      user {
        id
        username
        name
        first
        last
        email
        phone
        venmo
        isBeeping
        isEmailVerified
        isStudent
        groupRate
        singlesRate
        photoUrl
        capacity
        cashapp
      }
    }
  }
`;

export function LoginScreen() {
  const [login, { error }] = useMutation<LoginMutation>(Login);

  const validationErrors = useValidationErrors<LoginMutationVariables>(error);

  const navigation = useNavigation<Navigation>();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<Omit<LoginMutationVariables, 'pushToken'>>();

  useEffect(() => {
    try {
      SplashScreen.hideAsync();
    } catch (error) {
      // ...
    }
  }, []);

  const onLogin = handleSubmit(async (variables) => {
    let pushToken: string | null;
    try {
      pushToken = isMobile ? await getPushToken() : null;
    } catch (error) {
      Logger.error(error);
      pushToken = null;
    }

    try {
      const { data } = await login({
        variables: { ...variables, pushToken },
      });

      await AsyncStorage.setItem("auth", JSON.stringify(data?.login));

      client.writeQuery({
        query: UserData,
        data: { getUser: { ...data?.login.user, pushToken } },
      });

      wsLink.client.restart();
    } catch (error) {
      Alert(error as ApolloError);
    }
  });

  return (
    <Container keyboard center scrollViewProps={{ scrollEnabled: true, bounces: false  }}>
      <Stack space={4} w="90%">
        <Box>
          <Heading size="xl" mr={4} fontWeight="extrabold">
            Welcome
          </Heading>
          <Heading size="xl" mr={4} fontWeight="extrabold">
            to Ride Beep App
          </Heading>
        </Box>
        <Stack space={2}>
          <FormControl
            isInvalid={
              Boolean(errors.username) || Boolean(validationErrors?.username)
            }
          >
            <FormControl.Label>Username or Email</FormControl.Label>
            <Controller
              name="username"
              rules={{ required: "Username or Email is required" }}
              defaultValue=""
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  ref={ref}
                  returnKeyLabel="next"
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus("password")}
                  textContentType="username"
                  size="lg"
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.username?.message}
              {validationErrors?.username?.[0]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              Boolean(errors.password) || Boolean(validationErrors?.password)
            }
          >
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              name="password"
              rules={{ required: "Password is required" }}
              defaultValue=""
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <PasswordInput
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={(val: string) => onChange(val)}
                  value={value}
                  ref={ref}
                  returnKeyLabel="login"
                  returnKeyType="go"
                  onSubmitEditing={onLogin}
                  textContentType="password"
                  size="lg"
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.password?.message}
              {validationErrors?.password?.[0]}
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            onPress={onLogin}
          >
            Login
          </Button>
        </Stack>
        <Flex direction="row">
          <GradietnButton
            size="sm"
            onPress={() => navigation.navigate("Sign Up")}
          >
            Sign Up
          </GradietnButton>
          <Spacer />
          <Button onPress={() => navigation.navigate("Forgot Password")}>
            Forgot Password
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}
