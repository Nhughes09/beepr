import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Center } from '@chakra-ui/react';
import { GetUserQuery } from '../../../generated/graphql';
import { cache, client } from '../../../utils/Apollo';
import { Marker } from '../../../components/Marker';
import { Map } from '../../../components/Map';
import { Route } from '@tanstack/react-router';
import { GetUser, userRoute } from './User';

const BeepersLocation = gql`
  subscription BeepersLocation($id: String!) {
    getLocationUpdates(id: $id) {
      latitude
      longitude
    }
  }
`;

let sub: any;

export const locationRoute = new Route({
  component: LocationView,
  path: 'location',
  getParentRoute: () => userRoute,
});


export function LocationView() {
  const { userId } = locationRoute.useParams();

  const { data } = useQuery<GetUserQuery>(GetUser, { variables: { id: userId } });

  const user = data?.getUser;

  async function subscribe() {
    const a = client.subscribe({ query: BeepersLocation, variables: { id: userId } });

    sub = a.subscribe(({ data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: userId,
        }),
        fields: {
          location() {
            return {
              latitude: data.getLocationUpdates.latitude,
              longitude: data.getLocationUpdates.longitude,
            };
          },
        },
      });
    });
  }

  useEffect(() => {
    subscribe();

    return () => {
      sub?.unsubscribe();
    };
  }, []);

  if (!user?.location) {
    return (
      <Center h="100px">
        This user has no Location data.
      </Center>
    );
  }

  return (
    <Box>
      <div style={{ height: 550, width: '100%' }}>
        <Map
          initialViewState={{
            latitude: user.location.latitude,
            longitude: user.location.longitude,
            zoom: 13,
          }}
        >
          <Marker
            latitude={user.location.latitude}
            longitude={user.location.longitude}
            userId={user.id}
            username={user.username}
            photo={user.photo}
            name={user.name}
            variant="default"
          />
        </Map>
      </div>
    </Box>
  );
}
