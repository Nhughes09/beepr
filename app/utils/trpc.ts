import { QueryClient } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../apinext';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export const trpc = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

const httpLink = httpBatchLink({
  url: 'http://localhost:3001/trpc',
  async headers() {
    const tokens = await AsyncStorage.getItem("auth");
    if (tokens) {
      const auth = JSON.parse(tokens);
      return {
        Authorization: `Bearer ${auth?.tokens?.id}`
      };
    }
    return {};
  },
});

const wsClient = createWSClient({
  url: 'ws://localhost:3001/trpc',
  async connectionParams() {
    const tokens = await AsyncStorage.getItem("auth");
    if (tokens) {
      const auth = JSON.parse(tokens);
      return {
        token: auth?.tokens?.id
      };
    }
    return {};
  },
  retryDelayMs: () => 500,
  lazy: {
    enabled: true,
    closeMs: 0,
  }
});

const websocketLink = wsLink<AppRouter>({
  client: wsClient,
});

export const trpcClient = trpc.createClient({
  links: [
    splitLink<AppRouter>({
      condition: (op) => op.type === 'subscription',
      true: websocketLink,
      false: httpLink
    })
  ],
});
