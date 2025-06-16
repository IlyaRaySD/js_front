import React from 'react';
import ToDoTask from './ToDoTask';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class ToDoList extends React.Component {	
	render(){
		return (
			<div className="App">
				<NavLink to='/add'б className='add-task-btn'>
					Add achivement
				</NavLink>
				<ul>
				{
					this.props.tasks.map((task) => {
						return (
							<ToDoTask task={task} key={task._id} />
						)
					})
				}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		tasks: [...state.tasks]
	}
}

export default connect(mapStateToProps)(ToDoList);
