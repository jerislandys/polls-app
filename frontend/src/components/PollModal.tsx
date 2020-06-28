import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPoll } from '../flux/actions/pollActions';
import { IPollReduxProps, IPollModal, ITarget } from '../types/interfaces';

const PollModal = ({ isAuthenticated, addPoll }: IPollModal) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e: ITarget) => setName(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const newPoll = {
      name
    };

    // Add item via addItem action
    addPoll(newPoll);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {/* {isAuthenticated ? ( */}
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Poll
        </Button>
       {/* ) : ( */}
         {/* <h4 className="mb-3 ml-4">Please log in to manage polls</h4> */}
       {/* )} */}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add Polls To List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="poll">Poll</Label>
              <Input
                type="text"
                name="name"
                id="poll"
                placeholder="Add poll"
                onChange={handleChangeName}
              />

              
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Poll
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IPollReduxProps) => ({
  poll: state.poll,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addPoll })(PollModal);
