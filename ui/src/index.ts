import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui';

export * from 'tamagui';
export { Text } from './Text';
export { Select } from './Select';
export { Menu } from './Menu';

export const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
