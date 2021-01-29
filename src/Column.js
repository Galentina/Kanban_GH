import React from 'react';
import Task from "./task";

export default function Column(props) {
    const{services} = props;
    const status = props.status;
    const tasks = props.tasks;

    return (
        <div className="col-sm">
            <h5>{status}</h5>
            {tasks.filter(el => el.status===status).sort((a, b) => a.priority - b.priority).map((el, index) =>
                <Task
                    task={el}
                    key={index}
                    id={el.id}
                    deleteTask={props.deleteTask}
                    changeStatus={props.changeStatus}
                    changePriority={props.changePriority}
                    updateTask = {props.updateTask}
                    services={services}
                    setServices={props.setServices}
                />)}
        </div>

    );
}