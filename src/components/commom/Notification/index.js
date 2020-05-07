import React from 'react';
import {Toast, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {hideToastAsync} from './actions';


const Notification = (props) =>{

  const toast = useSelector(state => state.toast);
  const dispatch = useDispatch();

  return (
    <Row>
      <Col>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "relative",
            minHeight: "100px",
          }}
        >
          <Toast
            onClose={() => dispatch(hideToastAsync())}
            show={toast.show}
            delay={3000}
            autohide
            style={{ position: "absolute", top: 10, right: 0 }}
            className="bg-success text-white"
          >
            <Toast.Header className="bg-success text-white">
              <strong className="mr-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        </div>
      </Col>
    </Row>
  );
};

export default Notification;
