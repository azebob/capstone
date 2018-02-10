import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

// authentication
import NotFound from './components/NotFound.jsx'

import Navbar from './Navbar'
import Footer from './Footer'
import LandingPage from './components/LandingPage'
import WriteSpace from './components/WriteSpace'
import AllStoryBranches from './components/AllStoryBranches'
import UserProfile from './components/UserProfile'
import SingleCard from './components/SingleCard'
import SingleStoryPage from './components/SingleStoryPage'
import Searchbar from './components/Searchbar'
import BranchStepper from './components/BranchStepper'
import AllUsers from './components/AllUsers'
import UserPage from './components/UserPage'
import StoryTree from './components/StoryTree'
import FullStory from './components/FullStory'

class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={LandingPage} />
<<<<<<< HEAD
            <Route exact path="/write" render={props => <WriteSpace isBranch={false} {...props} />} />
            <Route exact path="/write/:cardId" render={props => <WriteSpace isBranch={false} {...props} />} />
            <Route exact path="/write/continue/:storyBranch" render={props => <WriteSpace isBranch={false} {...props} />} />
            <Route exact path="/write/:rootId/:cardId/new_branch" render={props => <WriteSpace isBranch={true} {...props} />} />
            <Route exact path="/read" component={Searchbar} />
            <Route exact path="/read/full/:branchId" component={FullStory} />
            <Route exact path="/read/:branchId" component={SingleStoryPage} />
            <Route exact path="/read/:branchId/:cardId" component={BranchStepper} />
            <Route exact path="/story_tree/:branchId" component={StoryTree} />
=======
            <Route path="/write" component={WriteSpace} />
            <Route exact path="/read" component={AllStoryBranches} />
            <Route
              exact path="/read/story_branch/:branchId"
              render= {(props) => (
                // OB/FF: move the state down / in
                <SingleStoryPage
                  {...props}
                  handleCurrentStoryChange={this.handleCurrentStoryChange}
                  currentStoryBranch={this.state.currentStoryBranch} />
              )} />
            {/* OB/FF: consider shortening URL (drop story_branch part) */}
            <Route
              exact path="/read/story_branch/:branchId/:cardId"
              render={(props) => (
                <StoryBranchNav
                  {...props}
                  handleCurrentStoryChange={this.handleCurrentStoryChange}
                  currentStoryBranch={this.state.currentStoryBranch} />
              )} />
            {/* OB/FF: this is dead...... */}
            <Route path="/read/:id" component={StoryBranchNav} />
            <Route path="/search" component={Searchbar} />
>>>>>>> origin/code-review-comments
            <Route path="/userProfile" component={UserProfile} />
            <Route exact path="/allUsers" component={AllUsers} />
            <Route path="/allUsers/:id" component={UserPage} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Routes
