import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Начать тест
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Вы собираетесь начать тест "{props.testName}". Вы уверены, что хотите продолжить?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onTestStart}>Да, начать тест</Button>
        </Modal.Footer>
      </Modal>
    );
  }



export function NotificationModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Продолжить тест
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            У вас есть незавершенный тест "{props.testName}"
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onTestStart}>Продолжить тест</Button>
        </Modal.Footer>
      </Modal>
    );
  }