import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Column from "./Column";
import './App.css';
import CreateOrderModel from './CreateOrderModel'
import {v4 as uuid4v} from 'uuid';


function App() {
    const [tasks, setTasks] = useState([])
    const [order, setOrder] = useState(0);
    const [services, setServices] = useState([
        {name: '--', price: 0},
        {name: 'Antiviral prophylaxis', price: 150},
        {name: 'Installing Windows 7, 8, 10', price: 100},
        {name: 'Motherboard replacing', price: 50},
        {name: 'Power supply replacing', price: 80},
        {name: 'Video card replacing', price: 120},
        {name: 'Hard drive replacing', price: 130}
        ]);

    const status = ['Received from client', 'In processing', 'On verification', 'Ready for delivery', 'Delivered', 'Received by client'];
    const priority = [1, 2, 3, 4, 5];

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const deleteTask = (id) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                if (tasks[i].price !== tasks[i].payment) {
                    alert("This task is not possible to delete, because task payment is not complete");
                    return;
                } else if (tasks[i].status !== 'Received by client') {
                    alert("Update client's status");
                    return;
                }
                const newTasks = tasks.filter(el => el.id !== id);
                setTasks(newTasks);
            }
        }
    }

    const updateTask = (id, newName, newService, upPrice, upPayment, upAddress) => {
        const newTasks = [...tasks];
        newTasks.map(el => {
            if (el.id === id) {
                el.name = newName;
                el.serv = newService;
                el.price = Number(upPrice);
                el.payment = Number(upPayment);
                el.address = upAddress;
            }
        });
        setTasks(newTasks);
    }


    const addTask = (name, service, price, paid, address, status, prior) => {
        const newTasks = [...tasks];
        const newOrder = order + 1;
        newTasks.push({
            id: uuid4v(),
            number: newOrder,
            name: name,
            serv: service,
            price: Number(price),
            payment: Number(paid),
            address: address,
            status: status,
            priority: +prior
        })
        setTasks(newTasks);
        setOrder(newOrder);
    }

    const changeStatus = (id, arrow) => {
        const newTasks = [...tasks];
        newTasks.map(el => {
            if (el.id === id) {
                for (let i = 0; i < status.length; i++) {
                    if (el.status === status[i]) {
                        switch (arrow) {
                            case '+': {
                                el.status = (i !== status.length - 1) ? status[i + 1] : el.status;
                                return;
                            }
                            case '-': {
                                el.status = (i !== 0) ? status[i - 1] : el.status;
                                return;
                            }
                        }
                    }
                }
            }
        });
        setTasks(newTasks);
    }

    const changePriority = (id, arrow) => {
        const newTasks = [...tasks];
        newTasks.map(el => {
            if (el.id === id) {
                for (let i = 0; i < priority.length; i++) {
                    if (el.priority === priority[i]) {
                        switch (arrow) {
                            case '+': {
                                el.priority = (i !== priority.length - 1) ? priority[i + 1] : el.priority;
                                return el.priority;
                            }
                            case '-': {
                                el.priority = (i !== 0) ? priority[i - 1] : el.priority;
                                return el.priority;
                            }
                        }
                    }
                }
            }
        });
        setTasks(newTasks);
    }

    // const addService =() => {
    //
    // }

    return (
        <div className="App">
            <h1>Kanban board</h1>
            <button type="button" onClick={() => setModal(!modal)} className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                Insert New Client
            </button>
            <CreateOrderModel priority={priority} status={status} tasks={tasks} services={services}
                              addTask={addTask} modal={modal}
                              toggle={toggle} setServices={setServices}/>

            <hr/>
            <div className="row">
                {status.map((el, i) =>
                    <Column
                        status={el}
                        tasks={tasks}
                        key={i}
                        deleteTask={deleteTask}
                        changeStatus={changeStatus}
                        changePriority={changePriority}
                        updateTask={updateTask}
                        services={services}
                        setServices={setServices}
                    />)}
            </div>
        </div>
    );
}


export default App;
