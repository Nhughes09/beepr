import React, { FormEvent, useState } from 'react';
import { Error } from '../components/Error';
import { Button, Input, FormControl, FormLabel, Container, HStack, Spacer, Stack, Center, Heading } from "@chakra-ui/react"
import { Card } from '../components/Card';
import { PasswordInput } from '../components/PasswordInput';
import { Link, createRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from '../utils/router';
import { trpc } from '../utils/trpc';

export const loginRoute = createRoute({
  component: Login,
  path: "/login",
  getParentRoute: () => rootRoute,
});

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: login, isPending, error } = trpc.auth.login.useMutation();
  const utils = trpc.useUtils();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const result = await login({
      username: username,
      password: password
    });

    if (result) {
      localStorage.setItem('user', JSON.stringify(result));

      utils.user.me.setData(undefined, result.user);

      navigate({ to: '/' });
    }
  }

  return (
    <Container maxW="container.sm" p={[0]}>
      <Card>
        <Center pb={8}>
          <Heading>Login</Heading>
        </Center>
          {error && <Error>{error.message}</Error>}
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username or Email</FormLabel>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Password</FormLabel>
              <PasswordInput onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <HStack>
              <Button
                type="submit"
                isLoading={isPending}
                isDisabled={!username || !password}
                textColor="white"
                bgGradient='linear(to-r, #fb7ba2, #fce043)'
                boxShadow="0 0 15px 2px #fb7ba2"
                _hover={{
                  bgGradient: 'linear(to-r, pink.200, yellow.200)',
                }}
                _active={{
                  bgGradient: 'linear(to-r, pink.300, yellow.400)',
                }}
              >
                Sign in
              </Button>
              <Spacer />
              <Button as={Link} to="/password/forgot">
                Forgot Password
              </Button>
            </HStack>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
