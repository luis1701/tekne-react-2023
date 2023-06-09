import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context';

// const obj1 = {
//     name: "pepe",
//     age: 12
// }

// const { name, age } = obj1;


function TaskCard(props) {

    const [userInfo, setUserInfo] = useState()
    const [theme, setTheme] = useState()

    const { theme: themeFromContext } = useContext(AppContext)

    useEffect(() => {
        const userInfoFromLocalStorage = localStorage.getItem("userInfo");
        const themeFromLocalStorage = localStorage.getItem("theme");
        if (userInfoFromLocalStorage) {
            setUserInfo(JSON.parse(userInfoFromLocalStorage))
        }
        if (themeFromLocalStorage) {
            setTheme(themeFromLocalStorage)
        }
    }, [])

    const { taskInfo, onPressButtonTask, onPressAddComment, deleteTask, setNewNameForTask } = props;

    const [newComment, setNewComment] = useState("")
    const [currentTaskName, setCurrentTaskName] = useState(taskInfo?.name)

    return (
        <div style={{ background: themeFromContext === 'dark' ? 'grey' : 'white', margin: '15px' }}>
            <p>Theme from local storage: {theme}</p>
            <p>Theme from context: {themeFromContext}</p>
            {userInfo && <p>Asignation: {userInfo?.name}</p>}
            <p>Name: {taskInfo?.name}</p>
            <p>
                <input type= "text" value={currentTaskName} onChange={(event) => setCurrentTaskName(event.target.value)} />
                <button onClick={() => setNewNameForTask(currentTaskName, taskInfo)}>Update</button>
            </p>
            <p>Id: {taskInfo?.id}</p>
            <p>State: {taskInfo?.state}</p>
            {taskInfo.comments && taskInfo.comments.length > 0 && <div>
                Comments:
                {taskInfo.comments.map((comment, index) => {
                    return (
                        <p key={index}>{comment}</p>
                    )
                })}
            </div>}
            <div>
                <strong>Add comment:</strong>
                <input type='text' value={newComment} onChange={(event) => setNewComment(event.target.value)} ></input>
                <button onClick={() => {
                    onPressAddComment(taskInfo, newComment)
                    setNewComment('')
                }}>Add</button>
            </div>
            <button onClick={() => deleteTask(taskInfo)}>DELETE</button>
            <button onClick={() => onPressButtonTask(taskInfo)}>NEXT</button>
        </div>
    )
}

export default TaskCard;