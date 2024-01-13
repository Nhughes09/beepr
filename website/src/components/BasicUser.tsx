import React from "react";
import { Text, Avatar, Flex } from "@chakra-ui/react";
import { User } from "../generated/graphql";
import { Link } from "@tanstack/react-router";

interface Props {
  user: Partial<User>;
}

export function BasicUser(props: Props) {
  const { user } = props;

  return (
    <Link to="/admin/users/$userId" params={{ userId: user.id! }}>
      <Flex align="center">
        <Avatar src={user.photo || undefined} mr={2} />
        <Text>{user.name}</Text>
      </Flex>
    </Link>
  );
}
