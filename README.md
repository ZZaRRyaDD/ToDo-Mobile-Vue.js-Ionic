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
For build install Android Studio and run:

```bash
ionic integrations enable capacitor
ionic build
ionic cap add android
ionic cap open android
```

After that select Build > Build Bundle(s) / APK(s) > Build APK(s). Project build will start.
APK file will be in ```./android/app/build/outputs/apk/debug```