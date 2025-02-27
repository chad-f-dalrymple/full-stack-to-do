import React, { useState, useEffect } from 'react'
import { getTodos } from './utils/utils'
import { Container, Flex } from '@chakra-ui/react'
import ListComponent from './components/list'
import ListFieldSet from './components/field'
import './App.css'
import ListNameInput from './components/list_name_input'


function App() {
  const [toDos, setTodos] = useState([])
  const [hasUpdates, setHasUpdates] = useState(false)
  const [listName, setListName] = useState([''])
  const [copy, setCopy] = useState([])

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos(listName[0]);
  }, []);

  useEffect(() => {
    fetchTodos(listName[0]);
  }, [hasUpdates])

  const fetchTodos = async (listName) => {
    const data = await getTodos();
    setCopy(Array.from(data))
    if (listName[0] !== '') {
      setTodos(data.filter(object => object.name === listName))
    }
    if (listName === '') {
      setTodos(data)
    }
    setHasUpdates(false)
  };

  return (
    <Container style={{width: '350px', padding: '12px'}} className='bg-gray-200 rounded-md'>
      <ListNameInput listItems={copy} setListName={setListName} setHasUpdates={setHasUpdates} />
      <Flex direction="column" gap="8">
        <ListFieldSet checkUpdates={setHasUpdates} listItems={toDos} listName={listName} />
        <ListComponent
          refreshList={fetchTodos}
          checkUpdates={setHasUpdates}
          listItems={toDos}
          setListItems={setTodos}
        />
      </Flex>
    </Container>
  )
}

export default App
