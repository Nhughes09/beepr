import React from "react";
import { RefreshControl } from "react-native";
import { useQuery } from "@apollo/client";
import { Container } from "../components/Container";
import { useUser } from "../utils/useUser";
import { Beep } from "../components/Beep";
import { PAGE_SIZE } from "../utils/constants";
import { graphql } from "gql.tada";
import {
  Spinner,
  Text,
  FlatList,
  Heading,
  Center,
  useColorMode,
} from "native-base";

export const GetBeepHistory = graphql(`
  query GetBeepHistory($id: String, $offset: Int, $show: Int) {
    getBeeps(id: $id, offset: $offset, show: $show) {
      items {
        id
        start
        end
        groupSize
        origin
        destination
        status
        rider {
          id
          name
          first
          last
          photo
        }
        beeper {
          id
          name
          first
          last
          photo
        }
      }
      count
    }
  }
`);

export function BeepsScreen() {
  const { user } = useUser();
  const { colorMode } = useColorMode();

  const { data, loading, error, fetchMore, refetch } =
    useQuery(GetBeepHistory, {
      variables: { id: user?.id, offset: 0, show: PAGE_SIZE },
      notifyOnNetworkStatusChange: true,
    });

  const beeps = data?.getBeeps.items;
  const count = data?.getBeeps.count || 0;
  const isRefreshing = Boolean(data) && loading;
  const canLoadMore = beeps && count && beeps?.length < count;

  const getMore = () => {
    if (!canLoadMore || isRefreshing) return;

    fetchMore({
      variables: {
        offset: beeps?.length || 0,
        limit: PAGE_SIZE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          getBeeps: {
            items: [...prev.getBeeps.items, ...fetchMoreResult.getBeeps.items],
            count: fetchMoreResult.getBeeps.count,
          },
        };
      },
    });
  };

  const renderFooter = () => {
    if (!isRefreshing) return null;

    if (!count || count < PAGE_SIZE) return null;

    return (
      <Center>
        <Spinner mt={4} mb={9} color="gray.400" />
      </Center>
    );
  };

  if (loading && !beeps) {
    return (
      <Container center>
        <Spinner size="lg" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container center>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (beeps?.length === 0) {
    return (
      <Container center>
        <Heading fontWeight="extrabold">No Beeps</Heading>
        <Text>You have no previous beeps to display</Text>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        w="100%"
        data={beeps}
        renderItem={(data) => <Beep {...data} />}
        keyExtractor={(beep) => beep.id}
        onEndReached={getMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter()}
        refreshControl={
          <RefreshControl
            tintColor={colorMode === "dark" ? "#cfcfcf" : undefined}
            refreshing={isRefreshing}
            onRefresh={refetch}
          />
        }
      />
    </Container>
  );
}
