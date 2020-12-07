import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

class App extends Component {

  state = {
   todos: [
      /* {
        id: uuidv4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Dinner',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Meeting with boss',
        completed: false
      }*/

    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res=> this.setState({ todos:res.data}))
  }//axios is used to import all the todos from json placeholder
  //?_limit set the size of array to 10

  //Toggle Complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo =>{
      if(todo.id === id)
      {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }

  //Delete Todo
  delTodo = (id) =>{
     
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res=> this.setState({todos: [...this.state.todos.filter(todo=>todo.id != id)]}))
    
    //without using jsonplaceholder
    //this.setState({todos: [...this.state.todos.filter(todo=>todo.id != id)]})
  }//... -> spread operator to get all the elements of array



  //Add Todo
  addTodo = (title) => {
    
    //without using json placeholder
    /*const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    }*/

    //POST to server
    axios.post('https://jsonplaceholder.typicode.com/todos/',{
      title,
      completed: false
    })
    .then(res =>this.setState({todos: [...this.state.todos, res.data]}))
  }

  render(){
  return (
   <Router>
    <div className="App">
      <div className="container">
      <Header />
      <Route exact path="/" render={props => (
        <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
        </React.Fragment>
      )} />
      <Route path="/about" component={About} />
      </div>
    </div>
   </Router>
  );//"/"will route to AddTodo and todos
}
}

export default App;
