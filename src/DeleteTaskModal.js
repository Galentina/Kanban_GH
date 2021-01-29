import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


export default function DeleteTaskModal(props) {
    const {toggle, modal, task} = props;

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} charCode='X'>Deleting Card</ModalHeader>
            <ModalBody>
                <div>
                    <div>
                        Do you really want to delete this card?
                    </div>

                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>props.deleteTask(task.id)}>Delete this card</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}