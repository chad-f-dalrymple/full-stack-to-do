import { useState, useEffect } from 'react'
import { getTodos } from './utils/utils'
import { Container } from '@chakra-ui/react'
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
    console.log('im fetching')
    setTodos(data);
    setHasUpdates(false)
  };

  return (
    <Container style={{width: '350px'}}>
      <ListFieldSet checkUpdates={setHasUpdates} />
      <ListComponent
        refreshList={fetchTodos}
        checkUpdates={setHasUpdates}
        listItems={toDos}
        setListItems={setTodos}
      />
    </Container>
  )
}

export default App
