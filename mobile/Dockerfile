FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/android

RUN ./gradlew assembleDebug

RUN cp app/build/outputs/apk/debug/app-debug.apk /usr/common-volume/app-debug.apk
