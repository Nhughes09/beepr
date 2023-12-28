import React from "react";
import { RefreshControl, useColorScheme } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { GetBeepHistoryQuery } from "../generated/graphql";
import { Container } from "../components/Container";
import { useUser } from "../utils/useUser";
import { Beep } from "../components/Beep";
import { PAGE_SIZE } from "../utils/constants";
import { Spinner, SizableText, H1 } from "tamagui";
import { FlatList } from "react-native";

export const GetBeepHistory = gql`
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
`;

export function BeepsScreen() {
  const { user } = useUser();
  const colorMode = useColorScheme();

  const { data, loading, error, fetchMore, refetch } =
    useQuery<GetBeepHistoryQuery>(GetBeepHistory, {
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
      <Container center>
        <Spinner mt={4} mb={9} color="gray.400" />
      </Container>
    );
  };

  if (loading && !beeps) {
    return (
      <Container center>
        <Spinner size="small" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container center>
        <SizableText>{error.message}</SizableText>
      </Container>
    );
  }

  if (beeps?.length === 0) {
    return (
      <Container center>
        <H1>No Beeps</H1>
        <SizableText>You have no previous beeps to display</SizableText>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        contentContainerStyle={
          colorMode === "dark" ? { backgroundColor: "black" } : {}
        }
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
