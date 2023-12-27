import React from "react";
import { gql, useQuery } from "@apollo/client";
import { GetRatingsForUserQuery, GetRatingsQuery } from "../../generated/graphql";
import { Avatar } from "../../components/Avatar";
import { printStars } from "../../components/Stars";
import { Card } from "../../components/Card";
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../utils/Navigation";
import {
  Text,
  XStack,
  Stack,
  Heading,
  Spinner,
  Spacer,
} from "tamagui";
import { Container } from "../../components/Container";
import { FlatList, useColorMode } from "native-base";

const Ratings = gql`
  query GetRatingsForUser($id: String, $offset: Int, $show: Int) {
    getRatings(id: $id, show: $show, offset: $offset, filter: "recieved") {
      items {
        id
        timestamp
        message
        stars
        rater {
          id
          name
          photo
          username
        }
        rated {
          id
          name
          photo
          username
        }
        beep {
          id
        }
      }
      count
    }
  }
`;

interface Props {
  id: string;
}

const PAGE_SIZE = 5;

export function RatePreview({ id }: Props) {
  const { colorMode } = useColorMode();
  const { push } = useNavigation<Navigation>();
  const { data, loading, error, fetchMore, refetch } =
    useQuery<GetRatingsForUserQuery>(Ratings, {
      variables: { id, offset: 0, show: PAGE_SIZE },
      notifyOnNetworkStatusChange: true,
    });

  const ratings = data?.getRatings.items;
  const count = data?.getRatings.count || 0;
  const isRefreshing = Boolean(data) && loading;
  const canLoadMore = ratings && count && ratings?.length < count;

  const getMore = () => {
    if (!canLoadMore || isRefreshing) return;

    fetchMore({
      variables: {
        offset: ratings?.length || 0,
        limit: PAGE_SIZE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          getRatings: {
            items: [
              ...prev.getRatings.items,
              ...fetchMoreResult.getRatings.items,
            ],
            count: fetchMoreResult.getRatings.count,
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

  if (loading && !ratings) {
    return (
      <Container center>
        <Spinner />
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

  return (
    <Card flexShrink={1}>
      <XStack alignItems="center">
        <Heading fontWeight="extrabold">Ratings</Heading>
        <Spacer />
        <Heading size="xs" color="gray.400">
          {count} ratings
        </Heading>
      </XStack>
      <FlatList
        data={ratings}
        renderItem={({ item: rating }) => (
          <Card
            key={rating.id}
            p={1}
            mt={2}
            pressable
            onPress={() => push("Profile", { id: rating.rater.id, beepId: rating.beep.id })}
          >
            <XStack alignItems="center" p={2}>
              <Avatar size="md" mr={4} url={rating.rater.photo} />
              <Stack>
                <Text fontWeight="extrabold" fontSize="lg" letterSpacing="xs">
                  {rating.rater.name}
                </Text>
                <Text color="gray.400" fontSize="xs" mb={1}>
                  {new Date(rating.timestamp).toLocaleString()}
                </Text>
                <Text fontSize="xs">{printStars(rating.stars)}</Text>
                {rating.message ? (
                  <Text fontSize="xs">{rating.message}</Text>
                ) : null}
              </Stack>
            </XStack>
          </Card>
        )}
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
    </Card>
  );
}
