import React from 'react';
import { connect } from 'react-redux';
import { todoDelete, todoUpdateState } from './actions';

class ToDoTask extends React.Component {
	constructor(props){
		super(props)
		
		this.onStatusClick = this.onStatusClick.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}
	
	onStatusClick(e){
		e.preventDefault();
		
		fetch(`tasks/${this.props.task._id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				done: !this.props.task.done
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.status === 200){
				console.log('Updated');
				this.props.dispatch(todoUpdateState(this.props.task._id));
			}
			else{
				console.log('Not updated')
			}
		});
	}
	
	onDeleteClick(e){
		e.preventDefault();
		
		fetch(`tasks/${this.props.task._id}`, {
			method: 'DELETE'
		}).then((res) => {
			if (res.status === 200){
				console.log('Deleted');
				this.props.dispatch(todoDelete(this.props.task._id));
			}
			else{
				console.log('Not deleted')
			}
		});
	}
	
	render() {
		const { task } = this.props;
		return (
			<div className={`achievement ${task.done ? 'completed' : ''}`}>
				<button 
					className="delete-btn" 
					onClick={this.onDeleteClick}
					aria-label="Delete achievement"
				>
				<i className="fas fa-trash"></i>
				</button>
				<h3>{task.name}</h3>
				<p>{task.description}</p>
				<div className="achievement-actions">
					<button onClick={this.onStatusClick}>
						{task.done ? 'Uncomplete' : 'Complete'}
					</button>
				</div>
			</div>
	    );
	}
}

export default connect()(ToDoTask);
