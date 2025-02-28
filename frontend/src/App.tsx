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
  const [category, setCategory] = useState([''])
  const [copy, setCopy] = useState([])
  const [addState, setAddState] = useState(false)

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos(category[0]);
  }, []);

  useEffect(() => {
    fetchTodos(category[0]);
  }, [hasUpdates])

  const fetchTodos = async (category) => {
    const data = await getTodos();
    setCopy(Array.from(data))
    if (category[0] !== 'All' || category[0] !== '') {
      setTodos(data.filter(object => object.category === category))
    }
    if (category === '' || category === 'All') {
      setTodos(data)
    }
    setHasUpdates(false)
  };

  return (
    <Container style={{width: '550px', padding: '12px'}} className='bg-white rounded-md shadow-lg'>
      <Flex direction="column" gap="4">
        {toDos.length > 0 && <ListNameInput listItems={copy} setCategory={setCategory} setHasUpdates={setHasUpdates} />}
        <ListFieldSet setAddState={setAddState} checkUpdates={setHasUpdates} listItems={toDos} category={category} />
        <ListComponent
          addState={addState}
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
