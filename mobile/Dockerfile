FROM reactnativecommunity/react-native-android:v12.0 as builder

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/android

RUN echo 'azerqsdf\nazerqsdf\nAlexandre Franquet\nArea\nEpitech\nNantes\nPaysDeLaLoire\nFR\nyes\n' | keytool -genkey -v -keystore area_key_name.keystore -alias area_key_alias -keyalg RSA -keysize 2048 -validity 10000

RUN ./gradlew assembleRelease

RUN mkdir -p /common-volume

RUN cp app/build/outputs/apk/release/app-release.apk /common-volume/app-release.apk

FROM alpine:3.19

COPY --from=builder /common-volume /common-volume

