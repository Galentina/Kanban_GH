import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function CreateOrderModel(props) {
    const {status, services} = props;
    const {priority, toggle, modal} = props;
    const newStatus = ['--', ...status];

    const [newName, setNewName] = useState('');
    const [newService, setNewService] = useState('');
    const [upPrice, setUpPrice] = useState(0);
    const [upPayment, setUpPayment] = useState('');
    const [upAddress, setUpAddress] = useState('');
    const [upStatus, setUpStatus] = useState('--');
    const [upPriority, setUpPriority] = useState(1);

    const setPrice = (name) => {
        for (let i=0; i< services.length; i++) {
            if (services[i].name===name) {
                setUpPrice(services[i].price);
                return;
            }
        }
    }

    const addClient = () => {
       if  (upStatus==='--') alert('You have to choose order status');
       else {
           props.addTask(newName, newService, upPrice, upPayment, upAddress, upStatus, upPriority);
           setNewName('');
           setNewService('');
           setUpPrice(0);
           setUpPayment(0);
           setUpAddress('');
           setUpPriority(1);
           setUpStatus('--')
       }
    }

    return(
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode='X'>Create a new client</ModalHeader>
                    <ModalBody>
                        <table>
                            <tbody>
                            <tr><td>Client Name:</td>
                                <td><input className="input" type="text" value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder='Insert client name'/></td>
                            </tr>
                            <tr><td>Service:</td>
                                <td><select className="input175" value={newService} onChange={(e)=>setNewService(e.target.value)}>
                                    {services.map(el =><option>{el.name}</option>)}
                                </select>&nbsp;
                                    <button className='buttonUp' style={{verticalAlign: 'top'}} onClick={()=>setPrice(newService)}>Confirm</button>&nbsp;&nbsp;
                                    <span>Price:&nbsp; {upPrice}$</span>
                                </td>
                            </tr>
                            <tr><td>Paid:</td>
                                <td><input className="input155" type="number" value={upPayment} onChange={(e)=>setUpPayment(e.target.value)}/>&nbsp;$
                                    &nbsp;&nbsp;&nbsp;
                                    <span>Remained to pay:</span>&nbsp;{upPrice-upPayment}$
                                </td>
                            </tr>
                            <tr><td>Client address:</td>
                                <td><input className="input" type="text"  value={upAddress} onChange={(e)=>setUpAddress(e.target.value)} placeholder='Insert client address'/></td>
                            </tr>
                            <tr><td>Status:</td>
                                <td><select className="input" placeholder='Choose status:' value={upStatus} onChange={(e)=>setUpStatus(e.target.value)}>
                                {newStatus.map(el => <option>{el}</option>)}
                                 </select></td>
                            </tr>
                            <tr><td>Priority:</td>
                                <td><select className="input60" value={upPriority} onChange={(e)=>setUpPriority(e.target.value)}>
                                    {priority.map(el =><option>{el}</option>)}
                                </select></td>
                            </tr>
                        </tbody>
                        </table>
                    </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> addClient()}>Save</Button>{' '}
                    <Button color="primary" onClick={()=> {
                        addClient();
                        toggle()
                    }}>Save and close</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}