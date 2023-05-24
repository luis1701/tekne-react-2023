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
      state: 'ON_PROGRESS',
      name: 'Maketar frontend'
    },
    {
      id: 2,
      state: 'ON_PROGRESS',
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
    // NOTE: Simulate fetch data from some backend.
    // setTimeout(() => {
    //   const tasks = fetchTasks() // "servicio de backend que me retorna tareas"
    //   setTasksState(tasks)
    // }, 5000)
    const tasks = fetchTasks() // "servicio de backend que me retorna tareas"
    setTasksState(tasks)
    setLoading(false)
  }, [])

  // useEffect(() => {
  //   console.log('componente se esta actualizando')
  // }, [tasksState])

  const filterDataByState = (state) => {
    const filterTasks = tasksState.filter((value) => {
      return value.state === state
    });
    return filterTasks;
  }

  const setNewStateForTask = (newState, task) => {
    const filterOtherTasks = tasksState.filter((value) => {
      return value.id !== task.id
    })
    task.state = newState;
    filterOtherTasks.push(task);
    setTasksState(filterOtherTasks);
  }

  const onPressButtonTask = (task) => {
    switch (task.state) {
      case 'TODO':
        setNewStateForTask('ON_PROGRESS', task)
        break;

      case 'ON_PROGRESS':
        setNewStateForTask('FINISH', task)
        break;

      case 'FINISH':
        setNewStateForTask('DELIVERY', task)
        break;
    
      default:
        break;
    }
  }

  if (loading) {
    return 'Cargando...'
  }

  return (
    <div className="Home" style={{ 
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center'
     }}>
      <div>
        TODO
        {filterDataByState('TODO').map((value, index) => {
          return (
            <TaskCard taskInfo={value} key={index} onPressButtonTask={onPressButtonTask}/>
          )
        })}
      </div>
      <div>
        ON_PROGRESS
        {filterDataByState('ON_PROGRESS').map((value, index) => {
          return (
            <TaskCard taskInfo={value} key={index } onPressButtonTask={onPressButtonTask}/>
          )
        })}
      </div>
      <div>
        FINISH
        {filterDataByState('FINISH').map((value, index) => {
          return (
            <TaskCard taskInfo={value} key={index} onPressButtonTask={onPressButtonTask}/>
          )
        })}
      </div>
    </div>
  );
}

export default Home;
