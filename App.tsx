import React from 'react';  // Импортируем React для создания компонентов
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';  // Импортируем необходимые компоненты из React Native

// Основной компонент приложения
const App = () => {
  return (
    // Основной контейнер
    <View style={styles.container}>
      {/* Текстовый компонент с приветствием */}
      <Text style={styles.title}>Welcome to{"\n"}Korshunov Mobile App</Text>
      {/* Текстовое поле для ввода */}
      <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="gray" />
      {/* Кнопка, при нажатии на которую появляется уведомление */}
      <Button title="Press me" onPress={() => alert('Button pressed!')} />
    </View>
  );
};

// Объект стилей для компонентов
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Занимает всю доступную площадь
    justifyContent: 'center',  // Центрирует по вертикали
    alignItems: 'center',  // Центрирует по горизонтали
    backgroundColor: '#191919',  // Устанавливает цвет фона

  },
  title: {
    fontSize: 24,  // Размер текста
    marginBottom: 20,  // Нижний отступ
    color: 'white', // Устанавливает цвет текста
  },
  input: {
    height: 40,  // Высота текстового поля
    borderColor: 'gray',  // Цвет границы
    borderWidth: 1,  // Ширина границы
    marginBottom: 20,  // Нижний отступ
    paddingLeft: 10,  // Внутренний отступ слева
    width: '80%',  // Ширина текстового поля
  },
});

// Экспортируем основной компонент
export default App;
