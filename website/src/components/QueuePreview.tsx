import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Indicator } from './Indicator';
import { Text, Avatar, Box, Center, HStack, Spacer, Spinner } from '@chakra-ui/react';
import { client } from '../utils/apollo';
import { useQuery } from '@apollo/client';
import { QueueSubscription } from './QueueTable';
import { Status } from '../types/User';
import { Link } from '@tanstack/react-router';
import { graphql } from 'gql.tada';

dayjs.extend(duration);

let sub: any;

const QueueQuery = graphql(`
  query UsersQueue($id: String) {
    getQueue(id: $id) {
      id
      status
      rider {
        id
        name
        photo
      }
    }
  }
`);

interface Props {
  userId: string;
}

export function QueuePreview({ userId }: Props) {
  const { data, loading, error } = useQuery(QueueQuery, { variables: { id: userId } });

  const queue = data?.getQueue;

  async function subscribe() {
    const a = client.subscribe({ query: QueueSubscription, variables: { id: userId } });

    sub = a.subscribe(({ data }) => {
      if (data) {
        client.writeQuery({
          query: QueueQuery,
          data: {
            getQueue: data.getBeeperUpdates
          },
          variables: { id: userId }
        });
      }
    });
  }

  useEffect(() => {
    subscribe();

    return () => {
      sub?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        {error.message}
      </Center>
    );
  }

  if (queue?.length === 0) {
    return (
      <Center h="100px">
        This user's queue is empty.
      </Center>
    );
  }

  return (
    <Box>
      {queue?.map((entry) => (
        <HStack key={entry.id}>
          <Link to="/admin/users/$userId" params={{ userId: entry.rider.id }}>
            <Avatar src={entry.rider.photo || ''} size="xs" />
          </Link>
          <Link to="/admin/users/$userId" params={{ userId: entry.rider.id }}>
            <Box fontWeight="bold" whiteSpace="nowrap">{entry.rider.name}</Box>
          </Link>
          <Text noOfLines={1}>
            {entry.status}
          </Text>
          <Spacer />
          <Indicator color={entry.status !== Status.WAITING ? 'green' : 'red'} />
        </HStack>
      ))}
    </Box>
  );
}
