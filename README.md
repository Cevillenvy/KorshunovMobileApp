# О приложении
Автором данного приложения является студент Московского политехнического университета - Коршунов Даниил Владиславович (группа 211-322)

## Запуск приложения MacOS
Работа над приложением велась на операционной системе MacOS, поэтому инструкции будут для этой операционной системы.
Следуйте последующим шагам для настройки и запуска приложения

### 1 - Установка NodeJS
[Официальный сайт](https://nodejs.org/en/download/package-manager)

### 2 - Установка Watchman
Это инструмент для наблюдения за изменениями в файлах. Он рекомендуется, но не обязателен.
```brew install watchman```

### 3 - Установка React Native CLI
CLI инструмент для React Native.
```npm install -g react-native-cli```

### 4 - Установка Android Studio
[Официальный сайт](https://developer.android.com/studio)

### 5 - Установка JDK
Не следует устанавливать JDK, который не поддерживает Gradle
Узнать какие версии поддерживают Gradle можно здесь - [Gradle](https://docs.gradle.org/current/userguide/compatibility.html)
[Скачать JDK](https://www.oracle.com/java/technologies/downloads/#java21)

### 6 - Выбор версии Java
Проверить какие версии Java установлены на вашем устройстве можно командой в терминале
```/usr/libexec/java_home -V```
Для того чтобы сменить версию Java на интересующую вас, необходимо в файле .zshrc (или в другом файле конфигурации командной оболочки, который вы пользуетесь) ввести
```export JAVA_HOME=$(/usr/libexec/java_home -v 21.0.3)```
!Это пример для версии Java  21.0.3!
Не забудьте обновиться в терминале
```source ~/.zshrc```
И проверить версию Java
```java -version```

### 7 - Запуск проекта
Далее запустите эмулятор Android или iOS в Android Studio и выполните следующие команды из директории с проектом
(взято из стартовой README при инициализации проекта)

#### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

#### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

##### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

##### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```