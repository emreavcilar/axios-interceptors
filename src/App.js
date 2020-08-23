import React, { useState } from "react";
import { Container, Button, Toast } from "react-bootstrap";
import serviceManager from './service/serviceManager';

function App() {
  const [callStack, setCallStack] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false)

  const call = () => {
    const temp = [];
    temp.push("0");
    setCallStack(temp);
  }


  return (
    <div className="App">
      <div>arr {JSON.stringify(callStack)}</div>
      <Container>
        <section className="text-center">
          <h1>HTTP request and response handling with Axios interceptors</h1>

          <p>This example shows how to handle requests,responses and errors with <a href="https://github.com/axios/axios#interceptors" target="_blank" rel="noopener noreferrer" >Axios interceptors</a></p>

          <div>
            <Button
            className="mr-1"
              variant="success"
              onClick={() => {
                call();
              }
              }
            >
              Call Success
              </Button>

            <Button
            className="ml-1"
              variant="danger"
              onClick={() => {

              }}
            >
              Call Failure
              </Button>
          </div>

          <hr />

          <div>
            <Button
              className="mr-1"
              variant={isDisabled ? 'info' : 'secondary'}
              disabled={!isDisabled}
              onClick={() => {
                setIsDisabled(false)
              }}
            >
              Enable Handlers
            </Button>

            <Button
              className="ml-1"
              variant={!isDisabled ? 'info' : 'secondary'}
              disabled={isDisabled}
              onClick={() => {
                setIsDisabled(true)
              }}
            >
              Disable Handlers
            </Button>
          </div>

        </section>

      </Container>

      <section className="toast-container position-absolute">
        {callStack.map((call, i) => {
          return (
            <Toast
              key={i}
              onClose={() => {
                // setSuccess(false);
              }}
              show={callStack.length > 0}
            >
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Sending Request</strong>
                {/* <small>11 mins ago</small> */}
              </Toast.Header>
              <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
          )
        })}





      </section>
    </div>
  );
}

export default App;
