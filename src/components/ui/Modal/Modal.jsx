import React, { Component } from 'react';

export default class Modal extends Component {
	render() {
		let {isModalOpen, closeModal, children} = this.props;
		return(
			<div className={isModalOpen ? 'is-open' : 'is-close' }>
				<div className="overlay" onClick={closeModal}/>
				<div className="modal">
					{children}
				</div>
			</div>
		)
	}
}