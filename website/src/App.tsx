import React from 'react';
import { ApolloProvider, useQuery, useSubscription } from '@apollo/client';
import { cache, client } from './utils/Apollo';
import { Center, ChakraProvider, Container, Spinner } from "@chakra-ui/react"
import { theme } from './utils/theme';
import { Header } from './components/Header';
import { Banners } from './components/Banners';
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import { Outlet, RootRoute, Router, RouterProvider } from '@tanstack/react-router';
import { indexRoute } from './routes/Home';
import { editProfileRoute } from './routes/EditProfile';
import { changePasswordRoute } from './routes/ChangePassword';
import { loginRoute } from './routes/Login';
import { signupRoute } from './routes/SignUp';
import { notFoundRoute } from './components/NotFound';
import { forgotPasswordRoute } from './routes/ForgotPassword';
import { privacyRoute } from './routes/Privacy';
import { termsRoute } from './routes/Terms';
import { adminRoute } from './routes/admin';
import { usersListRoute, usersRoute } from './routes/admin/users';
import { userRoute } from './routes/admin/users/User';
import { userDetailsInitalRoute, userDetailsRoute } from './routes/admin/users/Details';
import { editUserRoute } from './routes/admin/users/edit';
import { locationRoute } from './routes/admin/users/Location';
import { leaderboardsRoute } from './routes/admin/leaderboards';
import { usersByDomainRoute } from './routes/admin/UsersByDomain';
import { beepersRoute } from './routes/admin/beepers/Beepers';
import { activeBeepsRoute } from './routes/admin/beeps/ActiveBeeps';
import { beepsListRoute, beepsRoute } from './routes/admin/beeps';
import { carsRoute } from './routes/admin/cars';
import { reportsListRoute, reportsRoute } from './routes/admin/reports';
import { reportRoute } from './routes/admin/reports/Report';
import { ratingRoute } from './routes/admin/ratings/Rating';
import { ratingsListRoute, ratingsRoute } from './routes/admin/ratings';
import { notificationsRoute } from './routes/admin/notifications';
import { feedbackRoute } from './routes/admin/Feedback';
import { paymentsRoute } from './routes/admin/Payments';
import { redisRoute } from './routes/admin/Redis';
import { verifyAccountRoute } from './routes/VerifyAccount';
import { resetPasswordRoute } from './routes/ResetPassword';
import { beepRoute } from './routes/admin/beeps/Beep';
import { queueRoute } from './components/QueueTable';
import { beepsTableRoute } from './components/BeepsTable';
import { reportsTableRoute } from './components/ReportsTable';
import { ratingsTableRoute } from './components/RatingsTable';
import { carsTableRoute } from './components/CarsTable';
import { paymentsTableRoute } from './components/PaymentsTable';
import { ResultOf, graphql } from 'gql.tada';

export type User = ResultOf<typeof GetUserData>['getUser'];

export const GetUserData = graphql(`
  query GetUserData {
    getUser {
      id
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
      photo
      capacity
      username
      role
      cashapp
      queueSize
    }
  }
`);

const UserUpdates = graphql(`
  subscription UserUpdates {
    getUserUpdates {
      id
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
      photo
      capacity
      username
      role
      cashapp
      queueSize
    }
  }
`);

function Beep() {
  const { data, loading } = useQuery(GetUserData);

  const user = data?.getUser;

  useSubscription(UserUpdates, {
    onData({ data }) {
      cache.updateQuery({ query: GetUserData }, () => ({ getUser: data.data!.getUserUpdates }));
    },
    skip: !user,
  });

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <Header />
      <Container as="main" maxW="container.xl" pt={20}>
        <Banners />
        <Outlet />
      </Container>
    </>
  );
}

export const rootRoute = new RootRoute({
  component: Beep,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  editProfileRoute,
  changePasswordRoute,
  loginRoute,
  signupRoute,
  forgotPasswordRoute,
  privacyRoute,
  termsRoute,
  verifyAccountRoute,
  resetPasswordRoute,
  adminRoute.addChildren([
    leaderboardsRoute,
    usersByDomainRoute,
    beepersRoute,
    activeBeepsRoute,
    carsRoute,
    notificationsRoute,
    feedbackRoute,
    paymentsRoute,
    redisRoute,
    ratingsRoute.addChildren([
      ratingsListRoute,
      ratingRoute
    ]),
    reportsRoute.addChildren([
      reportsListRoute,
      reportRoute,
    ]),
    beepsRoute.addChildren([
      beepsListRoute,
      beepRoute,
    ]),
    usersRoute.addChildren([
      usersListRoute,
      usersByDomainRoute,
      userRoute.addChildren([
        userDetailsRoute,
        userDetailsInitalRoute,
        editUserRoute,
        locationRoute,
        queueRoute,
        beepsTableRoute,
        reportsTableRoute,
        ratingsTableRoute,
        carsTableRoute,
        paymentsTableRoute,
      ])
    ]),
  ]),
]);

const router = new Router({ routeTree, notFoundRoute });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
