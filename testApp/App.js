// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>blah</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React, { Fragment, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  ToastAndroid,
  DeviceEventEmitter,
  Linking,
  TouchableOpacity,
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import {
  passJourney,
  showFloatingBubble,
  hideFloatingBubble,
  requestPermission,
  checkPermission,
  initialize,
  reopenApp,
} from "react-native-floating-bubble";

const showToast = (text) => ToastAndroid.show(text, 1000);
const startAddress = {
  address: "Wayanad Rd, Kerala 673586, India ==> Start Location",
  index: 0,
  latitude: 11.4822236,
  longitude: 75.9909821,
};
const locations = [
  {
    address: "Adivaram,Adivaram, Kerala 673586, India",
    index: 1,
    latitude: 11.488039,
    longitude: 76.0130784,
  },
  {
    address: "Mylellampara,Mylellampara, Kerala 673586, India",
    index: 2,
    latitude: 11.5047168,
    longitude: 75.9855098,
  },
  {
    address: "Nooramthode,Nooramthode, Kerala 673586, India",
    index: 3,
    latitude: 11.4727686,
    longitude: 76.02686059999999,
  },
  {
    address:
      "Kaithapoyil Bridge,Kaithapoyil Bridge, Kaithappoyil, Kerala 673586, India",
    index: 4,
    latitude: 11.4809478,
    longitude: 75.9963375,
  },
  {
    address:
      "Kaithapoyil New Jumu'a Masjid,Kappad-Thusharagiri-Adivaram Rd, Kaithappoyil, Puduppadi, Kerala 673586, India",
    index: 5,
    latitude: 11.4783634,
    longitude: 76.0006633,
  },
  {
    address: "Engapuzha,Engapuzha, Kedavur, Kerala, India",
    index: 6,
    latitude: 11.4694315,
    longitude: 75.97244909999999,
  },
  {
    address: "Thamarassery,Thamarassery, Kerala, India",
    index: 7,
    latitude: 11.4145864,
    longitude: 75.93632269999999,
  },
  {
    address: "Ambayathode Bus Stop,Thamarassery, Kerala 673615, India",
    index: 8,
    latitude: 11.4285049,
    longitude: 75.9467913,
  },
];
let index = 0;
const navigate = (idx) => {
  console.log("navigating");
  Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=${startAddress.latitude},${startAddress.longitude}&destination=${locations[idx].latitude},${locations[idx].longitude}`
  ).catch((error) => {
    console.log(error);
  });
};
const App = () => {
  const onAdd = () =>
    showFloatingBubble().then(() => showToast("Add Floating Button"));
  const onPassJourney = () => {
    console.log("clicking pass journey ");
    passJourney("irshad kk kkkkkkkkk ").then((data) =>
      console.log("clicking pass journey in then ", data)
    );
  };

  const onHide = () =>
    hideFloatingBubble()
      .then(() => showToast("Manually Removed Bubble"))
      .catch(() => showToast("Failed to remove"));
  const onRequestPermission = () =>
    requestPermission()
      .then(() => showToast("Permission received"))
      .catch(() => showToast("Failed to get permission"));
  const testMe = () => {
    console.log("testMe");
  };

  const onCheckPermissoin = () =>
    checkPermission()
      .then((value) => showToast(`Permission: ${value ? "Yes" : "No"}`))
      .catch(() => showToast("Failed to check"));
  const onInit = () =>
    initialize()
      .then(() => showToast("Init"))
      .catch(() => showToast("Failed init"));
  useEffect(() => {
    const subscriptionPress = DeviceEventEmitter.addListener(
      "floating-bubble-press-irsahd",
      function (e) {
        showToast("Press Bubble --------");
      }
    );
    const subscriptionPressNext = DeviceEventEmitter.addListener(
      "floating-bubble-press-next",
      function (e) {
        console.log("Press Bubble next --   ------ sdfgsdfg");
        console.log("Index ====", index);
        navigate(index);
        index++;
        // passJourney("next pressed").then((data) =>
        //   console.log("clicking pass journey in then ", data)
        // );
      }
    );
    const subscriptionPressDone = DeviceEventEmitter.addListener(
      "floating-bubble-press-done",
      function (e) {
        reopenApp();
        showToast("Press Bubble Done --------");
        // passJourney("Done pressed").then((data) =>
        //   console.log("clicking pass journey in then ", data)
        // );
      }
    );
    const subscriptionRemove = DeviceEventEmitter.addListener(
      "floating-bubble-remove",
      function (e) {
        showToast("Remove Bubble");
      }
    );
    return () => {
      subscriptionPress.remove();
      subscriptionPressDone.remove();
      subscriptionPressNext.remove();
      subscriptionRemove.remove();
    };
  }, []);
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Header />
          <View style={{ padding: 30 }}>
            <TouchableOpacity onPress={() => navigate()}>
              <Text>Navigate to Destination</Text>
            </TouchableOpacity>
            <Text>Test</Text>
            <Button style={styles.button} title="Test" onPress={testMe} />
            <Text>Check Permission</Text>
            <Button
              style={styles.button}
              title="Check"
              onPress={onCheckPermissoin}
            />
            <Text>Ger Permission</Text>
            <Button
              style={styles.button}
              title="Get Permission"
              onPress={onRequestPermission}
            />
            <Text>Initialize Bubble Manage</Text>
            <Button style={styles.button} title="Initialize" onPress={onInit} />
            <Text>Add the bubble</Text>
            <Button style={styles.button} title="Add Bubble" onPress={onAdd} />
            <Text>Pass Journey</Text>
            <Button
              style={styles.button}
              title="PassJourney"
              onPress={onPassJourney}
            />
            <Text>Remove the bubble</Text>
            <Button
              style={styles.button}
              title="Hide Bubble"
              onPress={onHide}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  button: {
    margin: 30,
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
