import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Container } from "../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { ApolloError, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { isMobile } from "../../utils/constants";
import { generateRNFile } from "../settings/EditProfile";
import { CarsQuery } from "./Cars";
import { getMakes, getModels } from "car-info";
import { colors, years } from "./utils";
import { VariablesOf, graphql } from "../../graphql";
import { Pressable } from "react-native";
import { Plus } from "@tamagui/lucide-icons";
import {
  isValidationError,
  useValidationErrors,
} from "../../utils/useValidationErrors";
import {
  Image,
  Stack,
  Button,
  Text,
  Select,
  Spinner,
  Label,
  Input,
} from "@beep/ui";

const makes = getMakes();

const AddCarMutation = graphql(`
  mutation CreateCar(
    $make: String!
    $model: String!
    $year: Float!
    $color: String!
    $photo: File!
  ) {
    createCar(
      make: $make
      model: $model
      year: $year
      color: $color
      photo: $photo
    ) {
      id
      make
      model
      year
      color
    }
  }
`);

let picture: any;

type Values = VariablesOf<typeof AddCarMutation>;

export function AddCar() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<Values>();

  const photo: any = watch("photo");
  const make = watch("make");

  const [addCar, { error, loading }] = useMutation(AddCarMutation, {
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
  });

  const validationErrors = useValidationErrors<Values>(error);

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [5, 3],
      base64: false,
    });

    if (result.canceled) {
      return;
    }

    setValue("photo", result.assets[0]);

    if (!isMobile) {
      const res = await fetch(result.assets[0].uri);
      const blob = await res.blob();
      const fileType = blob.type.split("/")[1];
      const file = new File([blob], "photo." + fileType);
      picture = file;
    } else {
      const file = generateRNFile(result.assets[0].uri, "file.jpg");
      picture = file;
    }
  };

  const onSubmit = handleSubmit(async (variables) => {
    try {
      await addCar({
        variables: {
          ...variables,
          year: Number(variables.year),
          photo: picture,
        },
        refetchQueries: [CarsQuery],
      });

      navigation.goBack();
    } catch (error) {
      alert(JSON.stringify(error));
      if (!isValidationError(error as ApolloError)) {
        alert((error as ApolloError).message);
      }
    }
  });

  return (
    <Container px="$4">
      <Stack>
        <Controller
          name="make"
          rules={{ required: "Make is required" }}
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Stack>
                  <Label fontWeight="bold">Make</Label>
                  <Input disabled value={value} placeholder="Select a make" />
                </Stack>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {getMakes().map((make) => (
                  <DropdownMenu.Item key={make} onSelect={() => onChange(make)}>
                    <DropdownMenu.ItemTitle>{make}</DropdownMenu.ItemTitle>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Arrow />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        />
        <Text color="red">
          {errors.make?.message}
          {validationErrors?.make?.[0]}
        </Text>
        <Controller
          name="model"
          rules={{ required: "Model is required" }}
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Stack>
                  <Label fontWeight="bold">Model</Label>
                  <Input disabled value={value} placeholder="Select a model" />
                </Stack>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {getModels(make).map((make) => (
                  <DropdownMenu.Item key={make} onSelect={() => onChange(make)}>
                    <DropdownMenu.ItemTitle>{make}</DropdownMenu.ItemTitle>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Arrow />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        />
        <Text color="red">
          {errors.model?.message}
          {validationErrors?.model?.[0]}
        </Text>
        <Controller
          name="year"
          rules={{ required: "Year is required" }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Stack>
                  <Label fontWeight="bold">Year</Label>
                  <Input
                    disabled
                    value={value ? String(value) : ""}
                    placeholder="Select a year"
                  />
                </Stack>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {years.map((make) => (
                  <DropdownMenu.Item key={make} onSelect={() => onChange(make)}>
                    <DropdownMenu.ItemTitle>{make}</DropdownMenu.ItemTitle>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Arrow />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        />
        <Text color="red">
          {errors.year?.message}
          {validationErrors?.year?.[0]}
        </Text>
        <Controller
          name="color"
          rules={{ required: "Color is required" }}
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Stack>
                  <Label fontWeight="bold">Color</Label>
                  <Input
                    disabled
                    value={value ? String(value) : ""}
                    placeholder="Select a color"
                  />
                </Stack>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {colors.map((make) => (
                  <DropdownMenu.Item key={make} onSelect={() => onChange(make)}>
                    <DropdownMenu.ItemTitle>{make}</DropdownMenu.ItemTitle>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Arrow />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        />
        <Text color="red">
          {errors.color?.message}
          {validationErrors?.color?.[0]}
        </Text>
        <Stack mt="$4">
          <Controller
            name="photo"
            rules={{ required: "Photo is required" }}
            control={control}
            render={() => (
              <Pressable onPress={choosePhoto}>
                {photo ? (
                  <Image
                    height="$14"
                    width="100%"
                    borderRadius="$4"
                    source={{ uri: photo.uri, width: 300, height: 164 }}
                    alt="uploaded car image"
                  />
                ) : (
                  <Stack
                    height="$14"
                    bg="$gray3"
                    borderRadius="$4"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text>Attach a Photo</Text>
                    <Plus />
                  </Stack>
                )}
              </Pressable>
            )}
          />
          <Text color="red">
            {errors.photo?.message}
            {validationErrors?.photo?.[0]}
          </Text>
        </Stack>
        <Button
          iconAfter={isSubmitting ? <Spinner /> : undefined}
          onPress={onSubmit}
          disabled={isSubmitting}
          mt="$4"
        >
          Add Car
        </Button>
      </Stack>
    </Container>
  );
}
