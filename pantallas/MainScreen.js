import { Text, StyleSheet, Pressable, View, Alert } from 'react-native';
import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import ListaEstudiantes from '../components/ListaEstudiantes';

const estudiantesEjemplo = [
  { id: "1", nombre: "Ana García", correo: "ana.garcia@correo.com" },
  { id: "2", nombre: "Luis Zuluaga", correo: "luis.zuluaga@correo.com" },
  { id: "3", nombre: "María Pérez", correo: "maria.perez@correo.com" },
  { id: "4", nombre: "Carlos Gómez", correo: "carlos.gomez@correo.com" },
  { id: "5", nombre: "Sofía Ramírez", correo: "sofia.ramirez@correo.com" },
];


export default function App() {
  const [estudiantes, setEstudiantes] = useState(estudiantesEjemplo)
  const [seleccionados, setSeleccionados] = useState([])

  const toggleSeleccion = (id) => {
    if (seleccionados.includes(id)) {
      //Si ya esta seleccionado se quita
      setSeleccionados (seleccionados.filter((item) => item !== id));
    }
    else {
      //En caso de no estar seleccionado se pone
      setSeleccionados ([...seleccionados, id]);
    }
  }

  const enviarCorreo = () => {
    if (seleccionados.length === 0) {
      Alert.alert("No has seleccionado ningun estudiante", "Selecciona un estudiante");
    } else {
      //Alert.alert("Enviar correo", `Correos a: ${seleccionados.join(", ")}`);
      
      const seleccionadosInfo = estudiantes
        .filter((est) => seleccionados.includes(est.id))
      
      const nombreCorreo = seleccionadosInfo
        .map((est) => `${est.nombre} - ${est.correo}`) 
        .join("\n");

      Alert.alert("Enviar correo", `Correos a: \n${nombreCorreo}`);
    }
  };


  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Impresion de lista de estudinates.
      </Text>
      
      <Card style={{borderWidth: 1, borderColor: 'black', backgroundColor: '#d4d6d9'}}>
        <ListaEstudiantes 
        data={estudiantes} 
        seleccionados = {seleccionados}
        onToggleSelect = {toggleSeleccion}/>
      </Card>

      <Pressable style={styles.boton} onPress={enviarCorreo}>
      <Text style={styles.botonTexto}>Enviar correo</Text>
      </Pressable>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    marginTop: 20,
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
