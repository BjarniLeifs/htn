# Vera
Vera is a home surveillance system that upcycles old smartphones as surveillance cameras. This project was created during [Hack The North 2017](https://hackthenorth.com/), and it won the [Pagerduty API](https://v2.developer.pagerduty.com/docs/events-api) challenge.

## How it works
Once every few seconds, the app takes a picture on the surveillance phone. It is compared to the previous picture using a change detection algorithm (we also compress the images to speed up processing time). If the change between the pictures is significant, then the (uncompressed) image is sent through the [Microsoft Computer Vision API](https://azure.microsoft.com/en-ca/services/cognitive-services/computer-vision/), which detects which categories the image falls under. If the "person" category is a likely category for the photo, then a signal is sent through the Pagerduty API and our personal backend server to send a notification to the user's primary device that a security breach has been detected.

## Technology
The back-end was created using Node.js and Postgres. We used OpenSSL to set up a well-encapsulated security system, and JSON web tokens (JWTs) to enforce secure connections with APIs. We also incorporated web sockets to allow for real-time interactions between our server and the personal/surveillance devices. The mobile front-end was built entirely in Android Studio, and the web front-end uses Angular 4. We used the Pagerduty API to manage incident notifications, as well as the Microsoft Cognitive Services API for image recognition.

## More info
For more info, see [our Devpost project submission](https://devpost.com/software/vera).
