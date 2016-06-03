import React from 'react';

import {Link} from 'react-router';

class NotFoundView extends React.Component{
	render() {
		return (
			<div style={this.props.compStyle}>
				<h1>404</h1>
				<p>This is not the page you are looking for <br/> <br/>
					<Link to='/'>Go back Home</Link></p>
			</div>
		);
	}
}

NotFoundView.defaultProps = {
	compStyle : {
		textAlign: "center"
	}
}



export default NotFoundView;