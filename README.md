# ToDo Application

## Install and run
Before start install dependencies you should install Node.js.
For this you should run these commands:

```bash
sudo apt update
sudo apt install npm
npm cache clean -f
npm install -g n
sudo n stable
```

For start project set your access token from mapbox for the card to work correctly in ```.env``` file and run:

```bash
npm i -g @ionic/cli
npm i
ionic serve
```

## Build

### Android Studio
For build install Android Studio and run:

```bash
ionic integrations enable capacitor
ionic build
ionic cap add android
ionic cap open android
```

After that select Build > Build Bundle(s) / APK(s) > Build APK(s). Project build will start.
APK file will be in ``./android/app/build/outputs/apk/debug``

### Gradle CLI

If you want build with Gradle CLI you should install Java and Gradle:

```bash
sudo apt update
sudo apt install openjdk-19-jdk
```

Check, that java right installed:

```bash
java -version
```

After that run:

```bash
VERSION=7.4.2
wget https://services.gradle.org/distributions/gradle-${VERSION}-bin.zip -P /tmp
sudo unzip -d /opt/gradle /tmp/gradle-${VERSION}-bin.zip
sudo ln -s /opt/gradle/gradle-${VERSION} /opt/gradle/latest
sudo nano /etc/profile.d/gradle.sh
```

Insert in file this:

```
export GRADLE_HOME=/opt/gradle/latest
export PATH=${GRADLE_HOME}/bin:${PATH}
```

After insert data, run next:

```bash
sudo chmod +x /etc/profile.d/gradle.sh
source /etc/profile.d/gradle.sh
```

Check, that Gradle right installed:

```bash
gradle -v
```

After that, open ``android`` folder and run:

```bash
source /etc/profile.d/gradle.sh
gradle
gradle assemble
```

If you have ``SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties``
run this in ``android`` directory, where username - name of your user:

```bash
echo 'sdk.dir=/home/username/Android/Sdk' > local.properties
```

If you have other path to Android sdk, please set it.

APK files will be in ``./android/app/build/outputs/apk/debug`` and ``./android/app/build/outputs/apk/release``