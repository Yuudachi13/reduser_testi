import React, { useReducer, useState } from 'react'
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'


const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':

      return [...state, { id: Date.now().toString(), text: action.payload }]
    case 'REMOVE_TODO':

      return state.filter(todo => todo.id !== action.payload)
    default:

      return state
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, [])
  const [text, setText] = useState('')

  const addTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text })
      setText('') // tyhjää
    }
  };

  const removeTodo = id => {
    dispatch({ type: 'REMOVE_TODO', payload: id })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Save" onPress={addTodo} />
        
      </View>

      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => removeTodo(item.id)}>
            <Text style={styles.todo}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    flex: 1,
    marginRight: 10,
  },
  todo: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default TodoApp