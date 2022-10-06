import React, { useLayoutEffect } from "react";
import { Container } from "../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../utils/Navigation";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { GetCarsQuery } from "../../generated/graphql";
import { RefreshControl } from "react-native";
import { Card } from "../../components/Card";
import {
  FlatList,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Text,
  useColorMode,
} from "native-base";

const CarsQuery = gql`
  query GetCars {
    getCars {
      items {
        id
        make
        model
        year
        color
      }
      count
    }
  }
`;

export function Cars() {
  const navigation = useNavigation<Navigation>();
  const { colorMode } = useColorMode();

  const { data, loading, error, refetch } = useQuery<GetCarsQuery>(CarsQuery);

  const cars = data?.getCars.items;

  const isRefreshing = Boolean(data) && loading;

  useLayoutEffect(() => {
    const navigator = navigation.getParent();
    navigator?.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={() => navigation.navigate("Add Car")}
            mr={2}
            icon={
              <Icon
                as={Ionicons}
                name="ios-add-sharp"
                size="xl"
                color={colorMode === "dark" ? "white" : "black"}
              />
            }
          />
        );
      },
    });
  }, [navigation, colorMode]);

  if (!data && loading) {
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

  return (
    <Container>
      <FlatList
        height="100%"
        data={cars}
        renderItem={({ item: car }) => (
          <Card>
            <Text>{car.id}</Text>
          </Card>
        )}
        keyExtractor={(car) => car.id}
        contentContainerStyle={
          cars?.length === 0
            ? { flex: 1, alignItems: "center", justifyContent: "center" }
            : undefined
        }
        ListEmptyComponent={
          <>
            <Heading fontWeight="extrabold" letterSpacing="sm" key="title">
              No Cars
            </Heading>
            <Text key="message">You have no cars on your account!</Text>
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
