import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


export default function UpdateTaskModal(props) {
    const {toggle, modal, services} = props;
    const task = props.task;

    const [newName, setNewName] = useState(task.name);
    const [upService, setUpService] = useState(task.serv);
    const [upPrice, setUpPrice] = useState(task.price);
    const [upPayment, setUpPayment] = useState(task.payment);
    const [upAddress, setUpAddress] = useState(task.address);



    const setPrice = (name) => {
        for (let i=0; i< services.length; i++) {
            if (services[i].name===name) {
                setUpPrice(services[i].price);
                return;
            }
        }
    }

    const upToDateTask = (id) => {
            props.updateTask(id, newName, upService, upPrice, upPayment, upAddress);
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} charCode='X'>Update Card</ModalHeader>
            <ModalBody>
                <table>
                    <tbody>
                    <tr><td>Client Name:</td>
                        <td><input className="input" type="text" value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder={task.name}/></td>
                    </tr>
                    <tr><td>Service:</td>
                        <td><select className="input175" value={upService} onChange={(e)=>setUpService(e.target.value)}>
                            {services.map(el =><option>{el.name}</option>)}
                        </select>&nbsp;&nbsp;
                            <button className='buttonUp' style={{verticalAlign: 'top'}} onClick={()=>setPrice(upService)}>Confirm</button>
                            <span>Price:&nbsp; {upPrice} &nbsp;$</span>
                        </td>
                    </tr>
                    <tr><td>Paid:</td>
                        <td><input className="input155" type="number" value={upPayment} onChange={(e)=>setUpPayment(e.target.value)}/>&nbsp;$
                            &nbsp;&nbsp;&nbsp;
                            <span>Remained to pay:</span>&nbsp;{upPrice-upPayment}&nbsp;$
                        </td>
                    </tr>
                    <tr><td>Client address:</td>
                        <td><input className="input" type="text"  value={upAddress} onChange={(e)=>setUpAddress(e.target.value)}/></td>
                    </tr>
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{upToDateTask(task.id); toggle()}}>Update this card</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}