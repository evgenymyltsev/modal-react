import React, { Component }    from 'react';
import Modal    from '../ui/Modal/Modal';
import Button   from '../ui/Button/Button';

export default class HomePage extends Component{
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
			isInnerModalOpen: false
		};

		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);

	}

	closeModal() {
		this.setState({
			isModalOpen: false
		})
	}

	openModal() {
		this.setState({
			isModalOpen: true
		})
	}

	render() {
		return (
			<div className="ui container">
				<Header />
				<h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
					Главная страница
				</h1>
				<button className="modal-button" onClick={this.openModal}>Open modal</button>
				<Modal
					isModalOpen={this.state.isModalOpen}
					closeModal={this.closeModal}>

					<img width="100%" src="https://source.unsplash.com/random"/>

					<Button theme="blue" onClick={this.closeModal}>Закрыть!</Button>

				</Modal>

			</div>
		);
	}
}
