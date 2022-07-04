import React, { ReactElement, ReactNode, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';

type reusableModal =
{ children: ReactNode; 
  show: boolean; 
  handleClose: () => void;
  modalTitle: string;
}

const ModalReusable:React.FC<reusableModal> = ({...props}):ReactElement => 
{
  return <Fragment>
          {ReactDOM.createPortal(
            <Modal show={props.show} onHide={props.handleClose} centered>
              <Modal.Header closeButton className="text-center">
                <Modal.Title className='w-100'>{props.modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {props.children}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
              </Modal.Footer>
            </Modal>,
            document.getElementById('modal-root')!
          )}
        </Fragment>
}

export default ModalReusable