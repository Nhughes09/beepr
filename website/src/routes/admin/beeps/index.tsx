import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Pagination } from '../../../components/Pagination';
import { gql, useQuery } from '@apollo/client';
import { Box, Heading, HStack, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { TdUser } from '../../../components/TdUser';
import { Loading } from '../../../components/Loading';
import { Error } from '../../../components/Error';
import { Indicator } from '../../../components/Indicator';
import { Status } from '../../../types/User';
import { Route, useNavigate } from '@tanstack/react-router';
import { adminRoute } from '..';
import { graphql } from 'gql.tada';

dayjs.extend(duration);

export const BeepsGraphQL = graphql(`
  query getBeeps($show: Int, $offset: Int) {
    getBeeps(show: $show, offset: $offset) {
      items {
        id
        origin
        destination
        start
        end
        groupSize
        status
        beeper {
          id
          name
          photo
          username
        }
        rider {
          id
          name
          photo
          username
        }
      }
      count
    }
  }
`);

export const beepStatusMap: Record<Status, string> = {
  [Status.WAITING]: 'orange',
  [Status.ON_THE_WAY]: 'orange',
  [Status.ACCEPTED]: 'green',
  [Status.IN_PROGRESS]: 'green',
  [Status.HERE]: 'green',
  [Status.DENIED]: 'red',
  [Status.CANCELED]: 'red',
  [Status.COMPLETE]: 'green',
};

export const beepsRoute = new Route({
  path: "beeps",
  getParentRoute: () => adminRoute,
});


export const beepsListRoute = new Route({
  path: "/",
  getParentRoute: () => beepsRoute,
  component: Beeps,
  validateSearch: (search: Record<string, string>) => {
    return {
      page: Number(search?.page ?? 1),
    }
  },
});

export function Beeps() {
  const pageLimit = 20;
  const { page } = beepsListRoute.useSearch();
  const navigate = useNavigate({ from: beepsListRoute.id });

  const { data, loading, error, refetch, startPolling, stopPolling, previousData } = useQuery(BeepsGraphQL, {
    variables: {
      offset: (page - 1) * pageLimit,
      show: pageLimit
    }
  });

  useEffect(() => {
    startPolling(3000);

    if (data) {
      refetch();
    }

    return () => {
      stopPolling();
    }
  }, []);

  const setCurrentPage = (page: number) => {
    navigate({ search: { page } });
  };

  if (error) {
    return <Error error={error} />;
  }

  const beeps = data?.getBeeps.items ?? previousData?.getBeeps.items;

  return (
    <Box>
      <Heading>Beeps</Heading>
      <Pagination
        resultCount={data?.getBeeps.count}
        limit={pageLimit}
        currentPage={page}
        setCurrentPage={setCurrentPage}
      />
      <Box overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Beeper</Th>
              <Th>Rider</Th>
              <Th>Origin</Th>
              <Th>Destination</Th>
              <Th>Group</Th>
              <Th>Status</Th>
              <Th>Start</Th>
              <Th>End</Th>
              <Th>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {beeps?.map((beep) => (
              <Tr key={beep.id}>
                <TdUser user={beep.beeper} />
                <TdUser user={beep.rider} />
                <Td>{beep.origin}</Td>
                <Td>{beep.destination}</Td>
                <Td>{beep.groupSize}</Td>
                <Td>
                  <HStack>
                    <Indicator color={beepStatusMap[beep.status as Status]} />
                    <Text textTransform="capitalize">{beep.status.replaceAll("_", " ")}</Text>
                  </HStack>
                </Td>
                <Td>{dayjs().to(beep.start as string)}</Td>
                <Td>{beep.end ? dayjs().to(beep.end as string) : "N/A"}</Td>
                <Td>{beep.end ? dayjs.duration(new Date(beep.end as string).getTime() - new Date(beep.start as string).getTime()).humanize() : "N/A"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {loading && <Loading />}
      <Pagination
        resultCount={data?.getBeeps.count}
        limit={pageLimit}
        currentPage={page}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
