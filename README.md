# Face Comparison and NID Text Extraction App

This React Native app allows users to take a selfie and an image of a National ID (NID), upload these images to a server, compare the face in both images using AWS Rekognition, and extract text from the NID image using AWS Textract. The app provides feedback on whether the faces match and displays extracted information such as name, date of birth, and NID number.

## Features

- **Selfie Capture**: Take a selfie using the device camera.
- **NID Image Capture**: Capture an image of your National ID using the device camera.
- **Image Upload**: Upload both the selfie and NID images to a server.
- **Face Comparison**: Compare the faces in the selfie and NID images using AWS Rekognition.
- **Text Extraction**: Extract name, date of birth, and NID number from the NID image using AWS Textract.
- **Loading Indicator**: Display a loading indicator while the app is processing images or extracting text.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the App**:

   ```bash
   npm start
   ```

   Use Expo Go to scan the QR code and launch the app on your device.

## Usage

1. **Take a Selfie**: Tap the "Take Selfie" button to capture a selfie using your device's camera.
2. **Capture NID Image**: Tap the "Take NID Image" button to capture an image of your National ID.
3. **Compare Faces and Extract Info**: Tap the "Compare Faces And Extract Info" button to upload both images to the server, compare the faces using AWS Rekognition, and extract text from the NID image using AWS Textract.
4. **View Results**: The app will display the face comparison result, and if successful, it will also show the extracted name, date of birth, and NID number.

## Dependencies

- **React Native**: Framework for building mobile applications using React.
- **Expo**: Set of tools and services for React Native development.
- **AWS Rekognition**: Service for comparing faces.
- **AWS Textract**: Service for extracting text from images.

## API Endpoints

- **Upload Selfie**: `POST /uploadSelfie`
- **Upload NID**: `POST /uploadNid`
- **Compare Faces**: `POST /compareFace`
- **Detect Text**: `POST /detectText`

## Notes

- Ensure your API endpoints are correctly set up and accessible.
- Update the `BASE_URL` variable in your code with your server's base URL.

## Contributing

Feel free to fork this project and contribute by submitting a pull request. Any contributions to enhance the app are welcome!

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, feel free to reach out or open an issue on GitHub.

---

I hope this app helps you easily compare faces and extract information from NID images. If you have any questions or feedback, feel free to open an issue or contribute to the project. Happy coding!
