import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import DeleteTaskModal from "./DeleteTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";


export default function Task(props) {
    const {services} = props;

    const task = props.task;

    const [modalUpdate, setModalUpdate] = useState(false);
    const toggle2 = () => setModalUpdate(!modalUpdate);

    const [modalDel, setModalDel] = useState(false);
    const toggle1 = () => setModalDel(!modalDel);


    return(
        <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{task.number}</h5>
                    <p className="card-text">Client: &nbsp;{task.name}</p>
                    <p className="card-text">Address: &nbsp;{task.address}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Priority: {task.priority}&nbsp;&nbsp;
                        <button className="arrow" onClick={()=>props.changePriority(task.id, '-')}>↑</button>&nbsp;
                        <button className='arrow' onClick={()=>props.changePriority(task.id, '+')}>↓</button>
                    </li>
                    <li className="list-group-item">Service: {task.serv}</li>
                    <li className="list-group-item">Price: {task.price+ ' $'} &nbsp;&nbsp;<span style={{color: '#221300'}}>&#127760;</span>&nbsp;&nbsp; {'Paid : ' + task.payment + ' $'}</li>
                </ul>
                <div className="card-body">
                    <button className="arrow" onClick={()=>props.changeStatus(task.id, '-')}>←</button>&nbsp;
                    <button className="buttonUp" onClick={()=>setModalUpdate(!modalUpdate)}>Update</button>&nbsp;
                    <UpdateTaskModal toggle={toggle2} modal={modalUpdate} task={task} updateTask={props.updateTask} services={services} />
                    <button className="arrow" onClick={()=>props.changeStatus(task.id, '+')}>→</button>&nbsp;
                    <button style={{borderColor: "red"}} className="buttonDel" onClick={()=>setModalDel(!modalDel)}>Delete</button>&nbsp;
                    <DeleteTaskModal toggle={toggle1} modal={modalDel} task={task} deleteTask={props.deleteTask}/>
                </div>
        </div>

    );

}