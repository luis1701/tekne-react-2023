import { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';

// hooks
// useState => modificar estados de un componente
// useEffect =>  interactuar con los estados del ciclo de vida de un componente
// useCallback => guardar funciones en memoria, nos ayuda con el performance

function fetchTasks() {
  return [
    {
      id: 1,
      state: 'NEW',
      name: 'Maketar frontend'
    },
    {
      id: 2,
      state: 'NEW',
      name: 'Implementar endpoints de backend'
    },
    {
      id: 3,
      state: 'TODO',
      name: 'Implementacion de login'
    },
    {
      id: 4,
      state: 'TODO',
      name: 'Implementacion de Menu'
    },
    {
      id: 5,
      state: 'FINISH',
      name: 'Responsive'
    },

  ]
}

function Home() {

  const [tasksState, setTasksState] = useState([])
  const [loading, setLoading] = useState(true)

  console.log(tasksState, ' tasksState')

  useEffect(() => {
    console.log('on mount')
    setTimeout(() => {
      const tasks = fetchTasks() // "servicio de backend que me retorna tareas"
      setTasksState(tasks)
      setLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
    console.log('componente se esta actualizando')
  }, [tasksState])

  if (loading) {
    return 'Cargando...'
  }

  return (
    <div className="Home">
      {tasksState.map((value, index) => {
        return (
          <TaskCard taskInfo={value} key={index}/>
        )
      })}
    </div>
  );
}

export default Home;
