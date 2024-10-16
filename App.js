import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, Keyboard, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultadoIMC, setResultadoIMC] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = () => {
    const pesoFloat = parseFloat(peso);
    let alturaFloat = parseFloat(altura);

    if (!pesoFloat || !alturaFloat || pesoFloat <= 0 || alturaFloat <= 0) {
      Alert.alert("Erro", "Por favor, insira valores válidos para peso e altura.");
      return;
    }

    Keyboard.dismiss();

    if (alturaFloat > 3) {
      alturaFloat = alturaFloat / 100;
    }

    const imc = pesoFloat / (alturaFloat * alturaFloat);
    setResultadoIMC(imc.toFixed(2));
    setClassificacao(classificarIMC(imc));
  };

  const classificarIMC = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    else if (imc >= 18.5 && imc < 24.9) return 'Peso normal';
    else if (imc >= 25 && imc < 29.9) return 'Sobrepeso';
    else if (imc >= 30 && imc < 34.9) return 'Obesidade';
    else return 'Obesidade grave';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <Image source={require('./assets/balanca.png')} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Digite seu peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={(text) => setPeso(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={(text) => setAltura(text)}
      />

      <Button title="Calcular IMC" onPress={calcularIMC} color="green" />

      {resultadoIMC && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Seu IMC: {resultadoIMC}</Text>
          <Text style={styles.resultText}>{classificacao}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, 
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: height * 0.04, 
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: height * 0.02,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.25, 
    height: width * 0.25,
    marginBottom: height * 0.02,
  },
  resultContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  resultText: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    marginTop: height * 0.02,
  },
});

export default App;
