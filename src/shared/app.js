import React, { Component } from 'react';
import { connect } from 'react-redux';

const App = ({ list }) => {
	return (
		<div>
			<h1>Echo JS</h1>
			<ul>
				{list.map(item => (
					<li key={item.id}>
						<a href={item.url}>{item.title}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

function mapStateToProps({ list }) {
	return { list };
}

export default connect(mapStateToProps)(App);
