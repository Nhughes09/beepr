import React, { useEffect, useState } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client';
import { GetBeeperLocationUpdatesSubscription, GetBeepersQuery } from '../../../generated/graphql';
import { Badge, Box, Center, Heading, HStack, Select, Spacer, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { TdUser } from '../../../components/TdUser';
import { Loading } from '../../../components/Loading';
import { Error } from '../../../components/Error';
import { BeepersMap } from './BeepersMap';
import { cache } from '../../../utils/Apollo';

const BeepersGraphQL = gql`
  query GetBeepers($latitude: Float!, $longitude: Float!, $radius: Float) {
    getBeepers(latitude: $latitude, longitude: $longitude, radius: $radius) {
      id
      username
      name
      photo
      singlesRate
      groupRate
      capacity
      isStudent
      queueSize
      location {
        longitude
        latitude
      }
    }
  }
`;

const BeeperLocationUpdates = gql`
  subscription GetBeeperLocationUpdates(
    $radius: Float!
    $longitude: Float!
    $latitude: Float!
    $anonymize: Boolean
  ) {
    getBeeperLocationUpdates(
      radius: $radius
      longitude: $longitude
      latitude: $latitude
      anonymize: $anonymize
    ) {
      id
      latitude
      longitude
    }
  }
`;

export function Beepers() {
  const {
    data,
    loading,
    error,
    startPolling,
    stopPolling
  } = useQuery<GetBeepersQuery>(BeepersGraphQL, {
    variables: {
      latitude: 0,
      longitude: 0,
      radius: 0
    }
  });

  const beepers = data?.getBeepers;

  const options = [
    {
      label: "Boone",
      value: {
        latitude: 36.215735,
        longitude: -81.674205,
        zoom: 12,
      },
    },
    {
      label: "North Carolina",
      value: {
        latitude: 35.683560,
        longitude: -80.271723,
        zoom: 7,
      }
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();

  useEffect(() => {
    startPolling(15000);
    return () => {
      stopPolling();
    };
  }, []);

  useSubscription<GetBeeperLocationUpdatesSubscription>(BeeperLocationUpdates, {
    variables: {
      radius: 0,
      latitude: 0,
      longitude: 0,
      anonymize: false,
    },
    onData(data) {
      const location = data.data.data?.getBeeperLocationUpdates;
      if (
        location &&
        location.latitude !== null &&
        location.latitude !== undefined &&
        location.longitude !== null &&
        location.longitude !== undefined
      ) {
        cache.modify({
          id: cache.identify({
            __typename: "User",
            id: location.id,
          }),
          fields: {
            location() {
              return {
                latitude: location.latitude,
                longitude: location.longitude,
              };
            },
          },
        });
      }
    },
  });


  if (loading || beepers === undefined) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (beepers?.length === 0) {
    return (
      <Box>
        <Heading>Beepers</Heading>
        <Center>
          <Heading size="lg" mt={4}>
            Nobody is beeping right now
          </Heading>
        </Center>
      </Box>
    );
  }

  return (
    <Box>
      <HStack alignItems="center">
        <Heading>Beepers</Heading>
        <Badge ml={2}>
          {String(beepers?.length ?? 0)}
        </Badge>
        <Spacer />
        <Box>
          <Select variant='filled' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            {options.map((option) => <option value={option.label}>{option.label}</option>)}
          </Select>
        </Box>
      </HStack>
      <BeepersMap beepers={beepers} viewState={options.find((option) => option.label === selectedOption)?.value} />
      <Box overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Beeper</Th>
              <Th>Queue size</Th>
              <Th>Ride capacity</Th>
              <Th>Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {beepers.map((beeper) => (
              <Tr key={beeper.id}>
                <TdUser user={beeper} />
                <Td>{beeper.queueSize} riders</Td>
                <Td>{beeper.capacity} riders</Td>
                <Td>${beeper.singlesRate} / ${beeper.groupRate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}