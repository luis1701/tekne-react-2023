import { useEffect, useState, useContext } from 'react';
import TaskCard from '../components/TaskCard';
import { AppContext } from '../context';

// hooks
// useState => modificar estados de un componente
// useEffect =>  interactuar con los estados del ciclo de vida de un componente
// useCallback => guardar funciones en memoria, nos ayuda con el performance

function fetchTasks() {
  return [
    {
      id: 5,
      state: 'FINISH',
      name: 'Responsive',
      comments: []
    },
    {
      id: 1,
      state: 'ON_PROGRESS',
      name: 'Maketar frontend',
      comments: ["Hola, no se entiende la tarea"]
    },
    {
      id: 2,
      state: 'ON_PROGRESS',
      name: 'Implementar endpoints de backend',
      comments: []
    },
    {
      id: 3,
      state: 'TODO',
      name: 'Implementacion de login',
      comments: []
    },
    {
      id: 4,
      state: 'TODO',
      name: 'Implementacion de Menu',
      comments: []
    },
  ]
}

function fetchUserInfo() {
  return {
    name: "Luis Delgado",
    role: "Developer",
    team: "Tekne"
  }
}

function Home() {

  const [tasksState, setTasksState] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState('')
  const [checkedLocalStorage, setCheckedLocalStorate] = useState(false)
  const [checkedContext, setCheckedContext] = useState(false)

  const { modifyTheme, testFunction } = useContext(AppContext)

  useEffect(() => {
    console.log('on mount')
    // NOTE: Simulate fetch data from some backend.
    // setTimeout(() => {
    //   const tasks = fetchTasks() // "servicio de backend que me retorna tareas"
    //   setTasksState(tasks)
    // }, 5000)
    const tasks = fetchTasks() // "servicio de backend que me retorna tareas"
    const userInfo = fetchUserInfo();
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("theme", 'light');
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

  const setNewNameForTask = (newName, task) => {
    const filterOtherTasks = tasksState.filter((value) => {
      return value.id !== task.id
    })
    task.name = newName;
    filterOtherTasks.push(task);
    setTasksState(filterOtherTasks);
  }

  const deleteTask = (task) => {
    const filterOtherTasks = tasksState.filter((value) => {
      return value.id !== task.id
    })
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

  const onPressAddComment = (task, comment) => {
    const tasksUpdated = tasksState.map((currentTask) => {
      if (currentTask.id === task.id) {
        currentTask.comments.push(comment)
      }
      return currentTask;
    })
    setTasksState(tasksUpdated);
  }

  if (loading) {
    return 'Cargando...'
  }

  const getNewId = () => {
    const maxValueId = tasksState.reduce((acc, value, index) => {
      if (value.id >= acc) {
        return value.id
      }
      return acc
    }, 0)
    return maxValueId + 1;
  }

  const onPressAddNewTaks = () => {
    const buildTask = {
      id: getNewId(),
      state: 'TODO',
      name: newTask,
      comments: []
    }
    setTasksState([...tasksState, buildTask])
    setNewTask('')
  }

  return (
    <div>
      <div style={{ padding: '60px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          Local Storage(Check enable dark mode): <input checked={checkedLocalStorage} type="checkbox" onClick={() => {
            const newStateForCheckLocalStorage = !checkedLocalStorage;
            setCheckedLocalStorate(newStateForCheckLocalStorage)
            // if (newStateForCheckLocalStorage) {
            //   localStorage.setItem("theme",  'dark');
            // } else {
            //   localStorage.setItem("theme",  'light');
            // }
            localStorage.setItem("theme", newStateForCheckLocalStorage ? 'dark' : 'light');
          }} />
        </div>
        <div>
          Context(Check enable dark mode): <input checked={checkedContext} type="checkbox" onClick={() => {
            setCheckedContext(!checkedContext)
            modifyTheme()
            testFunction('checked button pressed')
          }} />
        </div>
      </div>
      <div className="Home" style={{ 
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div>
            Add new task
            <input value={newTask} type='text' onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={() => onPressAddNewTaks()}>Add +</button>
          </div>
        </div>
        <div>
          TODO
          {filterDataByState('TODO').map((value, index) => {
            return (
              <TaskCard
                taskInfo={value}
                key={value.id}
                onPressButtonTask={onPressButtonTask}
                onPressAddComment={onPressAddComment}
                deleteTask={deleteTask}
                setNewNameForTask={setNewNameForTask}
              />
            )
          })}
        </div>
        <div>
          ON_PROGRESS
          {filterDataByState('ON_PROGRESS').map((value, index) => {
            return (
              <TaskCard
                taskInfo={value}
                key={value.id }
                onPressButtonTask={onPressButtonTask}
                onPressAddComment={onPressAddComment}
                deleteTask={deleteTask}
                setNewNameForTask={setNewNameForTask}

              />
            )
          })}
        </div>
        <div>
          FINISH
          {filterDataByState('FINISH').map((value, index) => {
            return (
              <TaskCard
                taskInfo={value}
                key={value.id}
                onPressButtonTask={onPressButtonTask}
                onPressAddComment={onPressAddComment}
                deleteTask={deleteTask}
                setNewNameForTask={setNewNameForTask}

              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
