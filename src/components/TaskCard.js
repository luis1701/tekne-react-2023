import { useEffect, useState } from 'react';

// const obj1 = {
//     name: "pepe",
//     age: 12
// }

// const { name, age } = obj1;


function TaskCard(props) {

    const { taskInfo, onPressButtonTask, onPressAddComment, deleteOnPressButton } = props;

    const [newComment, setNewComment] = useState("")

    return (
        <div style={{ background: 'grey', margin: '15px' }}>
            <p>Name: {taskInfo?.name}</p>
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
            <button onClick={() => onPressButtonTask(taskInfo)}>NEXT</button>
            <div>
                <button
                    onClick={()=> deleteOnPressButton(taskInfo)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskCard;