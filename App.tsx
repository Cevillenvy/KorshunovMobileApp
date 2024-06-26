import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Основной экран приложения (экран из Лабораторной работы №2)
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to{"\n"}Korshunov Mobile App</Text>
      <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="gray" />
      <Button title="Press me" onPress={() => alert('Button pressed!')} />
      <View style={styles.button}>
        <Button title="Go to Resource Management" onPress={() => navigation.navigate('ResourceManagement')} />
      </View>
    </View>
  );
};

// Экран для управления ресурсами (экран из Лабораторной работы №3)
const ResourceManagementScreen = () => {
  const [name, setName] = React.useState('');
  const [data, setData] = React.useState([]);
  const [storedName, setStoredName] = React.useState('');

  // Хук useEffect для получения данных из API при монтировании компонента
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.error(error));
  }, []);

  // Хук useEffect для получения данных из локального хранилища при монтировании компонента
  React.useEffect(() => {
    retrieveData();
  }, []);

  // Функция для сохранения имени в локальное хранилище
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      setStoredName(name);
      alert('Data saved');

      // Обновление состояния data с добавлением нового имени
      setData(prevData => [
        ...prevData,
        { id: prevData.length + 1, title: name },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // Функция для получения имени из локального хранилища
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
      <Text style={styles.title}>Resource Management Example</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save Name" onPress={storeData} />
      <Text style={styles.item}>Stored Name: {storedName}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
};

// Создаем stack navigator
const Stack = createStackNavigator();

// Основной компонент приложения, содержащий навигацию
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ResourceManagement" component={ResourceManagementScreen} options={{ title: 'Resource Management' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Объект стилей для компонентов
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
  }
});

export default App;
