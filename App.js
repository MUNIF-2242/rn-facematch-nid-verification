import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const App = () => {
  const [selfieImage, setSelfieImage] = useState(null);
  const [nidImage, setNidImage] = useState(null);
  const [selfieUrl, setSelfieUrl] = useState("");
  const [nidUrl, setNidUrl] = useState("");
  const [faceComparisonResult, setFaceComparisonResult] = useState("");

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [nid, setNid] = useState("");

  const [loading, setLoading] = useState(false); // New state for loading

  // Function to handle taking a selfie
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelfieImage(result.assets[0].uri);
      uploadSelfie(result.assets[0].base64);
    }
  };

  const pickNid = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      uploadNid(result.assets[0].base64);
      setNidImage(result.assets[0].uri);
    }
  };

  // Function to upload selfie to the first API
  const uploadSelfie = async (base64Image) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${BASE_URL}/uploadSelfie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      if (response.ok) {
        setSelfieUrl(data.imageUrl); // Assuming the response contains the URL of the uploaded selfie
        Alert.alert(
          "Selfie uploaded successfully!",
          `Selfie URL: ${data.imageUrl}`
        );
      } else {
        Alert.alert("Failed to upload selfie", `Error: ${data.message}`);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const uploadNid = async (base64Image) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${BASE_URL}/uploadNid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      if (response.ok) {
        setNidUrl(data.imageUrl); // Assuming the response contains the URL of the uploaded selfie
        Alert.alert("NID uploaded successfully!", `NID URL: ${data.imageUrl}`);
      } else {
        Alert.alert("Failed to upload NID", `Error: ${data.message}`);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to compare faces using the third API
  const compareFaces = async () => {
    if (!selfieUrl || !nidUrl) {
      Alert.alert("Please upload both selfie and NID images first!");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await fetch(`${BASE_URL}/compareFace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selfieUrl, nidUrl }),
      });

      const data = await response.json();
      setFaceComparisonResult(data.message);

      if (response.ok) {
        Alert.alert(
          "Face comparison successful!",
          `Response: ${JSON.stringify(data)}`
        );
        // Call the text detection API after face comparison
        detectTexts();
      } else {
        Alert.alert("Failed to compare faces", `Error: ${data.message}`);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to detect texts
  const detectTexts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${BASE_URL}/detectText`, // Replace with your actual API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: "nid.jpg" }),
        }
      );

      const data = await response.json();
      setName(data.name);
      setDob(data.dob);
      setNid(data.nid);
      if (response.ok) {
        console.log(`Detected Text: ${JSON.stringify(data)}`);
        Alert.alert(
          "Text detection successful!",
          `Detected Text: ${JSON.stringify(data)}`
        );
      } else {
        Alert.alert("Failed to detect text", `Error: ${data.message}`);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      {selfieImage ? (
        <Image
          source={{ uri: selfieImage }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      ) : (
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: "gray",
            opacity: 0.5,
          }}
        ></View>
      )}
      <Button title="Take Selfie" onPress={pickImage} />
      {nidImage ? (
        <Image
          source={{ uri: nidImage }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      ) : (
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: "gray",
            opacity: 0.5,
          }}
        ></View>
      )}
      <Button
        title="Take NID Image"
        onPress={pickNid}
        style={{ marginTop: 10 }}
      />
      {faceComparisonResult && <Text>{faceComparisonResult}</Text>}
      <Button
        title="Compare Faces And Extract Info"
        onPress={compareFaces}
        style={{ marginTop: 10 }}
      />
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
      <View>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
        <Text>{name}</Text>
        <Text style={{ fontWeight: "bold" }}>Dob</Text>
        <Text>{dob}</Text>
        <Text style={{ fontWeight: "bold" }}>Nid</Text>
        <Text>{nid}</Text>
      </View>
    </View>
  );
};

export default App;
