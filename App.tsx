import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image, Vibration, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'react-native-image-picker';
import Sound from 'react-native-sound';

const Stack = createStackNavigator();

// Основной экран приложения
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to{"\n"}Korshunov Mobile App</Text>
      <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="gray" />
      <Button title="Press me" onPress={() => alert('Button pressed!')} />
      <View style={styles.button}>
        <Button title="Go to ToDo List" onPress={() => navigation.navigate('ToDoList')} />
      </View>
      <View style={styles.button}>
        <Button title="Go to Multimedia Screen" onPress={() => navigation.navigate('Multimedia')} />
      </View>
      <View style={styles.button}>
        <Button title="Go to Vibration Screen" onPress={() => navigation.navigate('Vibration')} />
      </View>
      <View style={styles.button}>
        <Button title="Go to Camera Screen" onPress={() => navigation.navigate('Camera')} />
      </View>
    </View>
  );
};

// Экран для управления ресурсами
const ToDoListScreen = () => {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    retrieveData();
  }, []);

  // Сохранение name в локальное хранилище
  const storeData = async () => {
    try {
      if (name.trim() === '') {
        alert('Please enter a valid name');
        return;
      }
      await AsyncStorage.setItem('name', name);
      setStoredName(name);
      alert('Data saved');
      setData(prevData => [
        ...(prevData || []),
        { id: (prevData || []).length + 1, title: name },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        setStoredName(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <TextInput
        style={styles.input}
        placeholder="..."
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />
      <Button title="Add" onPress={storeData} />
      <Text style={styles.item}>Stored action: {storedName}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
};

// Экран для работы с мультимедиа
const MultimediaScreen = () => {
  const [audio, setAudio] = useState(null);

// Инициализация звукового файла с обработкой ошибок
  useEffect(() => {
    const initAudio = async () => {
      const sound = new Sound('audio.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        setAudio(sound);
      });
    };

    initAudio();

    return () => {
      if (audio) {
        audio.release();
      }
    };
  }, []);

  // Воспроизведение аудио с проверкой на наличие объекта звука
  const playSound = () => {
    if (audio) {
      audio.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  // Пауза аудио с проверкой на наличие объекта звука
  const stopSound = () => {
    if (audio) {
      audio.pause();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multimedia Example</Text>
      <Image
        source={{ uri: 'https://www.dummyimage.co.uk/150x150/FFA30F/FFFFFF/A Perfect Circle - Passive/9' }}
        style={styles.image}
      />
      <View style={styles.button}>
        <Button title="Play Music" onPress={playSound} />
      </View>
      <View style={styles.button}>
        <Button title="Pause Music" onPress={stopSound} />
      </View>
    </View>
  );
};

// Экран для вибрации
const VibrationScreen = () => {
  const handleVibration = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(1000);
    } else {
      Vibration.vibrate([500, 500, 500]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vibration Example</Text>
      <Button title="Vibrate" onPress={handleVibration} />
    </View>
  );
};

// Экран для работы с камерой
const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const handleOpenCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      saveToPhotos: true,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Example</Text>
      <Button title="Open Camera" onPress={handleOpenCamera} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ToDoList" component={ToDoListScreen} options={{ title: 'ToDo List' }} />
        <Stack.Screen name="Multimedia" component={MultimediaScreen} options={{ title: 'Multimedia' }} />
        <Stack.Screen name="Vibration" component={VibrationScreen} options={{ title: 'Vibration' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '80%',
    color: 'white',
  },
  item: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    color: 'white',
  },
  button: {
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
});

export default App;
