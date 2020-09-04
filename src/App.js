import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import VanillaToasts from 'vanillatoasts';
import axios from 'axios';


function App() {
  const [isHandlerEnabled, setIsHandlerEnabled] = useState(true);
  const isFirstRun = useRef(true);
  const timeout = 4000;
  const [modalOptions, setModalOptions] = useState({ state: false, description: null })
  const axiosInstance = axios.create({
    baseURL: 'https://www.mocky.io/',
    withCredentials: true,
    headers: {
      common: {
        'Accept-Language': 'tr-TR',
      },
    },
  });

  axiosInstance.interceptors.request.use(
    config => {
      if (config.isHandlerEnabled) {
        VanillaToasts.create({
          title: 'Sending request',
          text: `Sending request to: ${config.url}`,
          type: 'info',
          timeout: timeout
        })
      }
      return config;
    }
  );

  axiosInstance.interceptors.response.use(
    response => {
      if (response.config.isHandlerEnabled) {
        // VanillaToasts.create({
        //   title: 'Request succeeded!',
        //   text: `Request done successfully: ${response.config.url}`,
        //   type: 'success',
        //   timeout: timeout
        // });

        setModalOptions({
          state: true,
          description: `Request done successfully: ${response.config.url}`,
          title: 'Request succeeded!'
        })
      }
      return response;
    },
    error => {
      if (error.config.isHandlerEnabled) {
        // VanillaToasts.create({
        //   title: `Request failed: ${error.response.status}`,
        //   text: `Unfortunately error happened during request: ${error.config.url}`,
        //   type: 'error',
        //   timeout: timeout
        // });

        setModalOptions({
          state: true,
          description: `Unfortunately error happened during request: ${error.config.url}`,
          title: `Request failed: ${error.response.status}`
        })
      }
      return Promise.reject({ ...error });
    }
  );

  useEffect(() => {
    if (isFirstRun.current === false) {
      VanillaToasts.create({
        title: `Handlers ${isHandlerEnabled ? 'enabled' : 'disabled'}`,
        text: `Handlers are now ${isHandlerEnabled ? 'enabled' : 'disabled'}. ${isHandlerEnabled ? 'You\'ll see request notifications.' : 'You won\'t see request notifications.'}`,
        type: 'warning', // // success, info, warning, error
        timeout: timeout
      });
    }
    else {
      isFirstRun.current = false;
    }
  }, [isHandlerEnabled]);

  const successCall = () => {
    const options = { isHandlerEnabled }
    axiosInstance.get('/v3/a0f86361-d139-4ea8-baf0-50bca53b33df?mocky-delay=1000ms', options);
  }

  const failureCall = () => {
    const options = { isHandlerEnabled }
    axiosInstance.get("/v3/28240b23-acdd-4a13-b315-10dc4599b8fe?mocky-delay=1000ms", options);
  }

  return (
    <div className="App">

      <Container className="mt-5">
        <section className="text-center">
          <h1>HTTP request and response handling with Axios interceptors</h1>

          <p>This example shows how to handle requests,responses and errors with <a href="https://github.com/axios/axios#interceptors" target="_blank" rel="noopener noreferrer" >Axios interceptors</a></p>

          <div>
            <Button
              className="mr-1"
              variant="success"
              onClick={() => {
                successCall();
              }}
            >
              Call Success
              </Button>

            <Button
              className="ml-1"
              variant="danger"
              onClick={() => {
                failureCall();
              }}
            >
              Call Failure
              </Button>
          </div>

          <hr />

          <div>
            <Button
              className="mr-1"
              variant={isHandlerEnabled ? 'secondary' : 'info'}
              disabled={isHandlerEnabled}
              onClick={() => {
                setIsHandlerEnabled(true);
                // toggleHandler(false);
              }}
            >
              Enable Handlers
            </Button>

            <Button
              className="ml-1"
              variant={isHandlerEnabled ? 'info' : 'secondary'}
              disabled={!isHandlerEnabled}
              onClick={() => {
                setIsHandlerEnabled(false);
                // toggleHandler(true);
              }}
            >
              Disable Handlers
            </Button>
          </div>

        </section>
      </Container>

      <Modal
        show={modalOptions.state}
        onHide={() => {
          setModalOptions({ state: null, description: null, title: null })
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalOptions.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{modalOptions.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setModalOptions({ state: null, description: null, title: null })
            }}>
            Close
            </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default App;
