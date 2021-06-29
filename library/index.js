import { NativeModules } from "react-native";

const { RNFloatingBubble } = NativeModules;

export const reopenApp = () => RNFloatingBubble.reopenApp();
export const passJourney = (x) => RNFloatingBubble.passJourney(x);
export const showFloatingBubble = (x = 50, y = 100) =>
  RNFloatingBubble.showFloatingBubble(x, y);
export const hideFloatingBubble = () => RNFloatingBubble.hideFloatingBubble();
export const checkPermission = () => RNFloatingBubble.checkPermission();
export const requestPermission = () => RNFloatingBubble.requestPermission();
export const initialize = () => RNFloatingBubble.initialize();

export default {
  showFloatingBubble,
  hideFloatingBubble,
  requestPermission,
  checkPermission,
  initialize,
  reopenApp,
  passJourney,
};
