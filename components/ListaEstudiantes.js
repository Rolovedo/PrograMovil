import { Text, View, StyleSheet, Image, FlatList, Pressable } from 'react-native';


export default function ListaEstudiantes({data, seleccionados, onToggleSelect}) {

  const Estudiante = ({item}) =>{
    const estaSeleccionado = seleccionados.includes(item.id);

    return(
      <Pressable onPress={() => onToggleSelect(item.id)}>
        <View style={[styles.item, estaSeleccionado && styles.itemSeleccionado]}>
          <Text>{item.nombre} {estaSeleccionado && "(Seleccionado)"}</Text>
          <Text>{item.correo}</Text>
        </View>
      </Pressable>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
      data={data}
      renderItem={Estudiante}
      keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  item: {
    backgroundColor: '#97b1fc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  itemSeleccionado: {
    backgroundColor: '#6fffa3',
  },
});
