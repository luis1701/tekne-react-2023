import { useEffect, useState } from 'react';

// const obj1 = {
//     name: "pepe",
//     age: 12
// }

// const { name, age } = obj1;


function TaskCard(props) {

    const { taskInfo, onPressButtonTask } = props;

    return (
        <div style={{ background: 'grey', margin: '15px' }}>
            <p>Name: {taskInfo?.name}</p>
            <p>Id: {taskInfo?.id}</p>
            <p>State: {taskInfo?.state}</p>
            <button onClick={() => onPressButtonTask(taskInfo)}>NEXT</button>
        </div>
    )
}

export default TaskCard;