import { Map } from "../../components/Map";
import { useLocation } from "../../utils/useLocation";
import { AnimatedRegion, MarkerAnimated, Region } from "react-native-maps";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { Text } from "native-base";
import { Platform } from "react-native";
import { cache } from "../../utils/Apollo";
import {
  AnonymousBeeper,
  GetAllBeepersLocationQuery,
  GetBeeperLocationUpdatesSubscription,
} from "../../generated/graphql";
import { BEEPER_ICON } from "../../utils/constants";

const BeepersLocations = gql`
  query GetAllBeepersLocation(
    $radius: Float!
    $longitude: Float!
    $latitude: Float!
  ) {
    getAllBeepersLocation(
      radius: $radius
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      latitude
      longitude
    }
  }
`;

const BeeperLocationUpdates = gql`
  subscription GetBeeperLocationUpdates(
    $radius: Float!
    $longitude: Float!
    $latitude: Float!
  ) {
    getBeeperLocationUpdates(
      radius: $radius
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      latitude
      longitude
    }
  }
`;

export function BeepersMap() {
  const { location } = useLocation();
  const { data, startPolling, stopPolling } =
    useQuery<GetAllBeepersLocationQuery>(BeepersLocations, {
      variables: {
        radius: 20,
        latitude: location?.coords.latitude ?? 0,
        longitude: location?.coords.longitude ?? 0,
      },
      skip: !location,
    });

  const beepers = data?.getAllBeepersLocation;

  useEffect(() => {
    startPolling(15000);
    return () => {
      stopPolling();
    };
  }, []);

  useSubscription<GetBeeperLocationUpdatesSubscription>(BeeperLocationUpdates, {
    variables: {
      radius: 20,
      latitude: location?.coords.latitude ?? 0,
      longitude: location?.coords.longitude ?? 0,
    },
    skip: !location,
    onData(d) {
      const data = d.data.data?.getBeeperLocationUpdates;
      if (
        data &&
        data.latitude !== null &&
        data.latitude !== undefined &&
        data.longitude !== null &&
        data.longitude !== undefined
      ) {
        cache.modify({
          id: cache.identify({
            __typename: "AnonymousBeeper",
            id: data.id,
          }),
          fields: {
            latitude() {
              return data.latitude!;
            },
            longitude() {
              return data.longitude!;
            },
          },
        });
      }
    },
  });

  const initialRegion: Region | undefined = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.09,
        latitudeDelta: 0.09,
      }
    : undefined;

  return (
    <Map
      showsUserLocation
      style={{
        width: "100%",
        height: 250,
        borderRadius: 15,
        marginTop: 16,
        overflow: "hidden",
      }}
      initialRegion={initialRegion}
    >
      {beepers?.map((beeper) => (
        <BeeperMarker key={beeper.id} {...beeper} />
      ))}
    </Map>
  );
}

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

export function BeeperMarker({ id, latitude, longitude }: AnonymousBeeper) {
  const ref = useRef<MarkerAnimated>(null);
  const [coordinate] = useState(
    new AnimatedRegion({
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    })
  );

  useEffect(() => {
    if (Platform.OS === "android") {
      if (ref?.current) {
        ref.current.animateMarkerToCoordinate(
          { latitude: latitude ?? 0, longitude: longitude ?? 0 },
          1000
        );
      }
    } else {
      coordinate
        .timing({
          latitude: latitude ?? 0,
          longitude: longitude ?? 0,
          duration: 1000,
          useNativeDriver: false,
        })
        .start();
    }
  }, [latitude, longitude]);

  return (
    <MarkerAnimated ref={ref} coordinate={coordinate}>
      <Text fontSize="2xl">{BEEPER_ICON}</Text>
    </MarkerAnimated>
  );
}
