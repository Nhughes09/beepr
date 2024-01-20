import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Container } from "../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { ApolloError, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { isMobile } from "../../utils/constants";
import { generateRNFile } from "../settings/EditProfile";
import { CarsQuery } from "./Cars";
import { getMakes, getModels } from "car-info";
import { capitalize, colors, years } from "./utils";
import { Ionicons } from "@expo/vector-icons";
import {
  isValidationError,
  useValidationErrors,
} from "../../utils/useValidationErrors";
import {
  Image,
  CheckIcon,
  Select,
  Stack,
  Button,
  Flex,
  Pressable,
  Icon,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import { VariablesOf, graphql } from "gql.tada";

const makes = getMakes();

const AddCarMutation = graphql(`
  mutation CreateCar(
    $make: String!
    $model: String!
    $year: Float!
    $color: String!
    $photo: Upload!
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

type Values = VariablesOf<typeof AddCarMutation>

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

  const [addCar, { error, loading }] = useMutation(
    AddCarMutation,
    {
      context: {
        headers: {
          "apollo-require-preflight": true,
        },
      },
    }
  );

  const validationErrors =
    useValidationErrors<Values>(error);

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
      if (!isValidationError(error as ApolloError)) {
        alert((error as ApolloError).message);
      }
    }
  });

  return (
    <Container p={4}>
      <Stack space={4}>
        <FormControl
          isInvalid={Boolean(errors.make) || Boolean(validationErrors?.make)}
        >
          <Controller
            name="make"
            rules={{ required: "Make is required" }}
            defaultValue=""
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                accessibilityLabel="Choose Make"
                placeholder="Make"
                onValueChange={(value) => onChange(value)}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                {makes.map((make) => (
                  <Select.Item key={make} label={make} value={make} />
                ))}
              </Select>
            )}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.make?.message}
            {validationErrors?.make?.[0]}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(errors.model) || Boolean(validationErrors?.model)}
        >
          <Controller
            name="model"
            rules={{ required: "Model is required" }}
            defaultValue=""
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                accessibilityLabel="Choose Model"
                placeholder="Model"
                onValueChange={(value) => onChange(value)}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                {!make
                  ? []
                  : getModels(make).map((make: string) => (
                      <Select.Item key={make} label={make} value={make} />
                    ))}
              </Select>
            )}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.model?.message}
            {validationErrors?.model?.[0]}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(errors.year) || Boolean(validationErrors?.year)}
        >
          <Controller
            name="year"
            rules={{ required: "Year is required" }}
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                accessibilityLabel="Choose Year"
                placeholder="Year"
                onValueChange={(value) => onChange(value)}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                {years.map((year) => (
                  <Select.Item key={year} label={year} value={year} />
                ))}
              </Select>
            )}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.year?.message}
            {validationErrors?.year?.[0]}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(errors.color) || Boolean(validationErrors?.color)}
        >
          <Controller
            name="color"
            rules={{ required: "Color is required" }}
            defaultValue=""
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                accessibilityLabel="Choose Color"
                placeholder="Color"
                onValueChange={(value) => onChange(value)}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                {colors.map((color) => (
                  <Select.Item
                    key={color}
                    label={capitalize(color)}
                    value={color}
                  />
                ))}
              </Select>
            )}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.color?.message}
            {validationErrors?.color?.[0]}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(errors.photo) || Boolean(validationErrors?.photo)}
        >
          <Controller
            name="photo"
            rules={{ required: "Photo is required" }}
            defaultValue=""
            control={control}
            render={() => (
              <Pressable onPress={choosePhoto}>
                {photo ? (
                  <Image
                    height="48"
                    width="100%"
                    borderRadius="2xl"
                    source={{ uri: photo.uri }}
                    alt="uploaded car image"
                  />
                ) : (
                  <Flex
                    height="48"
                    bgColor="gray.100"
                    borderRadius="2xl"
                    alignItems="center"
                    justifyContent="center"
                    _text={{ fontWeight: "extrabold" }}
                    _dark={{ bgColor: "gray.800" }}
                  >
                    Attach a Photo
                    <Icon
                      mt={2}
                      as={Ionicons}
                      name="add-sharp"
                      size="xl"
                      color="black"
                      _dark={{ color: "white" }}
                    />
                  </Flex>
                )}
              </Pressable>
            )}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.photo?.message}
            {validationErrors?.photo?.[0]}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          _text={{ fontWeight: "extrabold" }}
          isLoading={isSubmitting || loading}
          onPress={onSubmit}
        >
          Add Car
        </Button>
      </Stack>
    </Container>
  );
}
