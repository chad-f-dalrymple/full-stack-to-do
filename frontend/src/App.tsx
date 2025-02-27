import React, { useState, useEffect } from 'react'
import { getTodos } from './utils/utils'
import { Container, Flex } from '@chakra-ui/react'
import ListComponent from './components/list'
import ListFieldSet from './components/field'
import './App.css'


function App() {
  const [toDos, setTodos] = useState([])
  const [hasUpdates, setHasUpdates] = useState(false)

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [hasUpdates])

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
    setHasUpdates(false)
  };

  return (
    <Container style={{width: '350px', padding: '12px'}} className='bg-gray-200 rounded-md'>
      <Flex direction="column" gap="8">
        <ListFieldSet checkUpdates={setHasUpdates} listItems={toDos} />
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
