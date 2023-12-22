FROM reactnativecommunity/react-native-android:latest as builder

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/android

# RUN ./gradlew assembleDebug

# RUN mkdir -p /common-volume

# RUN cp app/build/outputs/apk/debug/app-debug.apk /common-volume/app-debug.apk

RUN echo 'azerqsdf\nazerqsdf\nAlexandre Franquet\nArea\nEpitech\nNantes\nPaysDeLaLoire\nFR\nyes\n' | keytool -genkey -v -keystore area_key_name.keystore -alias area_key_alias -keyalg RSA -keysize 2048 -validity 10000

# RUN mv area_key_name.keystore /android/app

RUN ./gradlew assembleRelease

RUN mkdir -p /common-volume

RUN cp app/build/outputs/apk/release/app-release.apk /common-volume/app-release.apk

FROM scratch

COPY --from=builder /common-volume /common-volume

