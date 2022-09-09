import React from "react";
import { Text, Avatar, Flex } from "@chakra-ui/react";
import { User } from "../generated/graphql";
import { NavLink } from "react-router-dom";

interface Props {
  user: Partial<User>;
}

export function BasicUser(props: Props) {
  const { user } = props;

  return (
    <NavLink to={`/admin/users/${user.id}`}>
      <Flex align="center">
        <Avatar src={user.photo || undefined} mr={2} />
        <Text>{user.name}</Text>
      </Flex>
    </NavLink>
  );
}