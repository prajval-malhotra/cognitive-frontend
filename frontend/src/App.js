import { useState } from 'react';

import { loadModels } from './helpers/faceApi';
import { createFaLibrary } from './helpers/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import Camera from './components/Camera/Camera';
import Dictaphone from './speech';
import React, { Component, Button } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => {
          this.setState({ todoList: res.data });
          console.log(res);
      })
      .catch((err) => console.log(err));

    axios
      .get('/api/todos')
      .then(function (response) {
        console.log(response);
      })
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>faxios
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;





//import React, { useState } from 'react';
//
//import { loadModels } from './helpers/faceApi';
//import { createFaLibrary } from './helpers/icons';
//
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Switch from 'react-switch';
//import Camera from './components/Camera/Camera';
//import Dictaphone from './speech';
//
//import './App.css';
//createFaLibrary();
//loadModels();
//function App() {
//  const [mode, setMode] = useState(false); //true = photo mode; false = video mode
//
//  return (
//    <div className="App">
//      <header>
//        <div className="App__header">
//          <h1>
//            <span>APADS</span>
//          </h1>
//          <div className="App__switcher">
//            <FontAwesomeIcon icon="camera" color={mode ? '#007c6c' : '#cccccc'} />
//            <Switch
//              onChange={() => setMode(!mode)}
//              uncheckedIcon={false}
//              checkedIcon={false}
//              checked={!mode}
//              className="App__switcher-switch"
//            />
//            <FontAwesomeIcon icon="video" color={!mode ? '#007c6c' : '#cccccc'} />
//          </div>
//        </div>
//          <Dictaphone />
//      </header>
//      <Camera photoMode={mode} />
//      {/* <p>
//        MADE WITH{' '}
//        <span role="img" aria-label="heart-emoji">
//          ❤️
//        </span>{' '}
//        BY CPG179.
//      </p> */}
//    </div>
//  );
//}
//
//export default App;
