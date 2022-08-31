import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { printStars } from "../../components/Stars";
import { Unpacked } from "../../utils/constants";
import { RefreshControl } from "react-native";
import { GetBeeperListQuery } from "../../generated/graphql";
import { Navigation } from "../../utils/Navigation";
import { Container } from "../../components/Container";
import { Avatar } from "../../components/Avatar";
import { Card } from "../../components/Card";
import { useLocation } from "../../utils/useLocation";
import {
  Text,
  Spinner,
  FlatList,
  Badge,
  Box,
  HStack,
  Spacer,
  Heading,
  useColorMode,
  Stack,
} from "native-base";

const GetBeepers = gql`
  query GetBeeperList($latitude: Float!, $longitude: Float!, $radius: Float) {
    getBeeperList(
      input: { latitude: $latitude, longitude: $longitude, radius: $radius }
    ) {
      id
      name
      first
      isStudent
      singlesRate
      groupRate
      capacity
      queueSize
      photoUrl
      role
      rating
      venmo
      cashapp
    }
  }
`;

export function PickBeepScreen() {
  const { colorMode } = useColorMode();
  const { location } = useLocation();
  const { params } = useRoute<any>();
  const navigation = useNavigation<Navigation>();

  const { data, loading, error, refetch } = useQuery<GetBeeperListQuery>(
    GetBeepers,
    {
      variables: {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        radius: 20,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const beepers = data?.getBeeperList;
  const isRefreshing = Boolean(data) && loading;

  function goBack(id: string): void {
    params.handlePick(id);
    navigation.goBack();
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: Unpacked<GetBeeperListQuery["getBeeperList"]>;
    index: number;
  }) => (
    <Card
      mx={4}
      my={2}
      mt={index === 0 ? 4 : undefined}
      pressable
      onPress={() => goBack(item.id)}
    >
      <HStack alignItems="center">
        <Stack flexShrink={1}>
          <HStack alignItems="center" mb={2}>
            <Avatar mr={2} size="45px" url={item.photoUrl} />
            <Stack>
              <Text
                fontWeight="extrabold"
                fontSize="lg"
                letterSpacing="sm"
                isTruncated
              >
                {item.name}
              </Text>
              {item.rating !== null && item.rating !== undefined ? (
                <Text fontSize="xs">{printStars(item.rating)}</Text>
              ) : null}
            </Stack>
          </HStack>
          <Box>
            <Text>
              <Text bold>Queue Size </Text>
              <Text>{item.queueSize}</Text>
            </Text>
            <Text>
              <Text bold>Capacity </Text>
              <Text>{item.capacity}</Text>
            </Text>
            <Text>
              <Text bold>Rates </Text>
              <Text>
                ${item.singlesRate} / ${item.groupRate}
              </Text>
            </Text>
          </Box>
        </Stack>
        <Spacer />
        <Stack space={2} flexShrink={1}>
          {item.venmo ? <Badge shadow={1}>Venmo</Badge> : null}
          {item.cashapp ? <Badge shadow={1}>Cash App</Badge> : null}
        </Stack>
      </HStack>
    </Card>
  );

  if ((!data && loading) || location === undefined) {
    return (
      <Container alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container alignItems="center" justifyContent="center">
        <Heading>Error</Heading>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  return (
    <Container h="100%">
      <FlatList
        height="100%"
        data={beepers}
        renderItem={renderItem}
        keyExtractor={(beeper) => beeper.id}
        contentContainerStyle={
          beepers?.length === 0
            ? { flex: 1, alignItems: "center", justifyContent: "center" }
            : undefined
        }
        ListEmptyComponent={
          <>
            <Heading key="title">Nobody is beeping</Heading>
            <Text key="message">
              There are no drivers within 20 miles of you
            </Text>
          </>
        }
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
