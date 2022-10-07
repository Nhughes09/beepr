import React from "react";
import { GetUserQuery } from "../../../generated/graphql";
import { Box, Text, Flex, Stack, Tooltip } from "@chakra-ui/react";
import { Indicator } from "../../../components/Indicator";
import { printStars } from "../ratings";

interface Props {
  user: GetUserQuery['getUser'];
}

export function Details({ user }: Props) {
  return (
    <Stack spacing={2}>
      <Box>
        <strong>Email:</strong>
        <Text>
          <Indicator mr={2} color={user.isEmailVerified ? "green" : "red"} />
          {user.email}
        </Text>
      </Box>
      <Box>
        <strong>Push Notification Token:</strong>
        <Text>
          <Indicator mr={2} color={user.pushToken ? "green" : "red"} />
          {user.pushToken || "N/A"}
        </Text>
      </Box>
      <Box>
        <strong>Rating:</strong>
        {user.rating ?
          <Text>
            <Tooltip label={user.rating} aria-label={`User rating of ${user.rating}`}>
              {printStars(user.rating)}
            </Tooltip>
          </Text>
          :
          <Text>
            No Rating
          </Text>
        }
      </Box>
      <Box>
        <strong>Phone:</strong>
        <Text>{user.phone || ''}</Text>
      </Box>
      <Box>
        <strong>Queue Size:</strong>
        <Text>{user.queueSize}</Text>
      </Box>
      <Box>
        <strong>Capacity:</strong>
        <Text>{user.capacity}</Text>
      </Box>
      <Box>
        <strong>Rate:</strong>
        <Text>${user.singlesRate} / ${user.groupRate}</Text>
      </Box>
      <Box>
        <strong>Venmo usename:</strong>
        <Text>{user.venmo || "N/A"}</Text>
      </Box>
      <Box>
        <strong>CashApp usename:</strong>
        <Text>{user.cashapp || "N/A"}</Text>
      </Box>
    </Stack>
  );
}
