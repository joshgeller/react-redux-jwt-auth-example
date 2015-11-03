import React                              from 'react';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router'

import 'styles/core.scss';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  render () {
    return (
<div>
     <nav className="navbar navbar-default">
       <div className="container">
         <div className="navbar-header">
           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
             <span className="sr-only">Toggle navigation</span>
             <span className="icon-bar"></span>
             <span className="icon-bar"></span>
             <span className="icon-bar"></span>
           </button>
           <a className="navbar-brand" href="#">React Redux Auth Example</a>
         </div>
         <div id="navbar" className="navbar-collapse collapse">
           <ul className="nav navbar-nav navbar-right">
             <li><Link to="/protected">Protected Content</Link></li>
             <li><Link to="/login">Login</Link></li>
           </ul>
         </div>
       </div>
     </nav>
     <div className='container'>
       <div className='row'>
     <div className='col-xs-12'>
     {this.props.children}
   </div>
   </div>
 </div>
 </div>

    );
  }
}
