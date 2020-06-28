import React, { useState , useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button, FormGroup, Input, Label} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPolls, deletePoll } from '../flux/actions/pollActions';
import { IPollReduxProps, IPollsList } from '../types/interfaces';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";


const PollsList = ({
    getPolls,
    poll,
    isAuthenticated,
    deletePoll
  }: IPollsList) => {
    useEffect(() => {
      getPolls();
    }, [getPolls]);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [pollSelected, setPollSelected] = useState('');
    const [showResult, setShowResult] = useState(false);
  
    const handleDelete = (id: string) => {
      deletePoll(id);
    };

    const handleToggle = (title: string) => {
      setIsMenuOpened(!isMenuOpened);
      setPollSelected(title);
      setShowResult(false);
    };

    const handleToggleResult = () => setShowResult(!showResult);
  
    const { polls } = poll;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="poll-list">
            {polls.map(({ _id, title }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem onClick={() => handleToggle(title)}>
                  {isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(_id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {title}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>

        <OffCanvas
          width={300}
          transitionDuration={300}
          effect={"parallax"}
          isMenuOpened={isMenuOpened}
          position={"right"}
        >
        <OffCanvasBody
          className="bodyClass"
          style={{ fontSize: "30px" }}
        >
        </OffCanvasBody>
          <OffCanvasMenu className="menuClass">
            <Container>
              <legend>{pollSelected}</legend>
              {!showResult ? (
                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" />{' '}
                      Option one 
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" />{' '}
                      Option two 
                    </Label>
                  </FormGroup>
                </FormGroup>
                ) : (
                  <FormGroup check>
                    <Label check>
                      Resultado
                    </Label>
                  </FormGroup>
                )
              }
              <FormGroup>
                <Button color="dark" style={{ marginTop: '2rem' }} block onClick={handleToggleResult}>
                  View Result
                </Button>
              </FormGroup>
            </Container>
          </OffCanvasMenu>
        </OffCanvas>
      </Container>
    );
  };

const mapStateToProps = (state: IPollReduxProps) => ({
    poll: state.poll,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getPolls, deletePoll })(PollsList);
  
// class PollsList extends React.Component {

//     // handleAddPoll() {
//     //     this.props.addPoll();
//     // }

//     // handleEditPoll(pollId) {
//     //     this.props.editPoll(pollId);
//     // }

//     // handleVotePoll(pollId) {
//     //     this.props.votePoll(pollId);
//     // }

//     // handleDeletePoll(pollId) {
//     //     this.props.deletePoll(pollId);
//     // }

//     render() {
//         const {user, polls} = this.props;
//         let listStuff;
//         if (polls.length > 0) {
//             listStuff = (
//                 <table className="polls">
//                     <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {polls.map(poll => {
//                         let userButtons = "";
//                         if (poll.editable) {
//                             userButtons = (
//                                 <div>
//                                     <button className="btn btn-primary m-1"
//                                             // onClick={this.handleEditPoll.bind(this, poll.id)}
//                                             >
//                                         Edit
//                                     </button>
//                                     <button className="btn btn-primary m-1"
//                                             // onClick={this.handleDeletePoll.bind(this, poll.id)}
//                                             >
//                                         Delete
//                                     </button>
//                                 </div>
//                             );
//                         }
//                         return (
//                             <tr key={poll.id}>
//                                 <td className="m-1">
//                                     <a 
//                                     // onClick={this.handleVotePoll.bind(this, poll.id)} href="#"
//                                     >
//                                         {poll.title}
//                                     </a>
//                                 </td>
//                                 <td className="m-1">
//                                     {userButtons}
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                     </tbody>
//                 </table>
//             );
//         } else {
//             listStuff = <p>There are no any polls to show. Add new one.</p>;
//         }

//         return (
//             <div className="polls-list">
//                 {user === undefined ? (<h3>List of Polls</h3>) : (<h3>Polls created by {user.name}.</h3>)}
//                 {/* <h3>Polls created by {user.name}.</h3> */}
//                 {listStuff}
//                 <button className="btn btn-primary"
//                         // onClick={this.handleAddPoll.bind(this)}
//                         >
//                     Add new poll
//                 </button>
//             </div>);
//     }
// }

// PollsList.propTypes = {
//     polls: PropTypes.array.isRequired,
//     user: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired
//     }).isRequired,
//     // addPoll: PropTypes.func.isRequired,
//     // editPoll: PropTypes.func.isRequired,
//     // votePoll: PropTypes.func.isRequired,
//     // deletePoll: PropTypes.func.isRequired
// };


// export default PollsList;