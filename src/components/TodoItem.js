import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component{
    
       
        getStyle = () =>{
            return{
                backgroundColor: '#f4f4f4',
                width: '100%',
                padding: '10px',
                borderBottom: '1px #ccc dotted',
                textDecoration: this.props.todo.completed ?
                'line-through' : 'none',

            }//if todo is completed then you will see a line through in the statement
        }


   render(){
        const { id, title } = this.props.todo;
        return(
            //for styling we can use <div style={{backgroundColor: '#f4f4f4'}} double braces of inine elements>
            //or we can use variables like <div style={itemStyle}>
            <div style={this.getStyle()}>
                <p>
                <input type="checkbox" onChange = {this.props.markComplete.bind(this, id)} />{' '}
                {title}
                <button style={btnStyle} onClick={this.props.delTodo.bind(this, id)}>x</button>
                </p>
            </div>
        )//to add space {' '} is used
    }
}

//PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

//itemStyle is declared here
//const itemStyle = {
//    backgroundColor: '#f4f4f4'
//}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '3px 0.5%',
    cursor: 'pointer',
    float: 'right',
    width: '3%'
}

export default TodoItem;