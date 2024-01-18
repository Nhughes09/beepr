import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Button, Stack } from "native-base";
import { Container } from "../../components/Container";
import { UserHeader } from "../../components/UserHeader";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { GetUser } from "./Profile";
import { graphql } from "gql.tada";

const ReportUser = graphql(`
  mutation ReportUser($userId: String!, $reason: String!, $beepId: String) {
    reportUser(input: { userId: $userId, reason: $reason, beepId: $beepId })
  }
`);


type Props = StaticScreenProps<{ userId: string, beepId?: string }>;

export function ReportScreen({ route }: Props) {
  const [reason, setReason] = useState<string>("");
  const [report, { loading }] = useMutation(ReportUser);
  const { goBack } = useNavigation();

  const { data } = useQuery(GetUser, {
    variables: {
      id: route.params.userId
    }
  });

  const user = data?.getUser;

  async function reportUser() {
    try {
      await report({
        variables: {
          userId: route.params.userId,
          beepId: route.params.beepId,
          reason: reason,
        },
      });
      goBack();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container keyboard p={4}>
      <Stack space={4} w="full">
        {user &&
          <UserHeader
            username={user.username}
            name={user.name}
            picture={user.photo}
          />
        }
        <Input
          size="lg"
          h={100}
          multiline={true}
          placeholder="Your reason for reporting here"
          returnKeyType="go"
          onChangeText={(text) => setReason(text)}
          onSubmitEditing={() => reportUser()}
          blurOnSubmit={true}
        />
        <Button
          onPress={() => reportUser()}
          isDisabled={!reason}
          isLoading={loading}
        >
          Report User
        </Button>
      </Stack>
    </Container>
  );
}
