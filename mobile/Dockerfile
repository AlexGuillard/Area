FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/android

RUN ./gradlew assembleDebug

RUN mkdir -p /common-volume

RUN cp app/build/outputs/apk/debug/app-debug.apk /common-volume/app-debug.apk
