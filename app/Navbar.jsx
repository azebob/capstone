// react
import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import { connect } from 'react-redux'

// login
import WhoAmI from './components/WhoAmI'
import firebase from 'app/fire'
const auth = firebase.auth()

// drawer menu for Navbar
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

// icons for Navbar
import IconButton from 'material-ui/IconButton'
import List from 'material-ui/svg-icons/action/list'
import history from './history'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
<<<<<<< HEAD
=======
    // OB/FF: class arrow function syntax means you don't need the next two lines
    this.handleToggle = this.handleToggle.bind(this)
    this.handleLink = this.handleLink.bind(this)
>>>>>>> origin/code-review-comments
  }

  // handles the toggle of the left drawer menu
  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  handleLink = (e, type) => {
<<<<<<< HEAD
    history.push(`/${type}`)
=======
    // OB/FF: consider switch/case
    // OB/FF: also could just history.push('/' + type)
    if (type === 'home') {
      history.push(`/home`)
    } else if (type === 'read') {
      history.push(`/read`)
    } else if (type === 'write') {
      history.push(`/write`)
    } else if (type === 'search') {
      history.push(`/search`)
    } else if (type === 'userProf') {
      history.push(`/userProfile`)
    }
>>>>>>> origin/code-review-comments
    this.handleToggle()
  }

  render() {
    return (
      <AppBar
        title={<a href="/home" className="title-logo">Parallel Stories</a>}
        iconElementLeft={<IconButton><List/></IconButton>}
        onLeftIconButtonTouchTap={this.handleToggle}
        style={{boxShadow: 'none', fontFamily: 'Berkshire Swash, cursive', textAlign: 'center'}}>
        <Drawer open={this.state.open}>
          {/* OB/FF: could this accept an href? */}
          <MenuItem onClick={(e) => { this.handleLink(e, 'home') }}>Home</MenuItem>
          <MenuItem onClick={(e) => { this.handleLink(e, 'read') }}>Read Stories</MenuItem>
          <MenuItem onClick={(e) => { this.handleLink(e, 'write') }}>Write a Story</MenuItem>
          <MenuItem onClick={(e) => { this.handleLink(e, 'allUsers') }}>All Users</MenuItem>
          <MenuItem onClick={(e) => { this.handleLink(e, 'userProfile') }}>User Profile</MenuItem>
          <MenuItem onClick={this.handleToggle} className="close-drawer">Close</MenuItem>
        </Drawer>
        <WhoAmI auth={auth} />
      </AppBar>
    )
  }
}

export default Navbar
