import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'app/fire'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
// tagging imports
import ChipInput from 'material-ui-chip-input'
// html parser
import ReactHtmlParser from 'react-html-parser'
// react components
import Reviews from './Reviews'
import history from '../history'

export default class SingleStoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStoryBranch: {
        published: false,
        storyCards: [],
        storyRoot: [],
        tags: {},
        userId: ''
      },
      tags: [],
      storyCards: [{
        branchTitle: '',
        branches: {},
        nextCard: '',
        prevCard: '',
        published: false,
        rootTitle: [],
        text: '',
        userId: ''
      }]
    }
  }

  componentDidMount() {
    firebase.database().ref(`storyBranch/${this.props.match.params.branchId}`).once('value')
    .then(snap => {
      const branchObj = snap.val()
      if (!branchObj.published) history.push('/404')
      else {
        this.setState({currentStoryBranch: branchObj})
        return branchObj.storyCards
      }
    })
    .then(cardArr => Promise.all(cardArr.map(cardId => firebase.database().ref(`storyCard/${cardId}`).once('value'))))
    .then(promisedCardsArr => {
      const resolvedCardsArr = promisedCardsArr.map(snap => snap.val())
      this.setState({storyCards: resolvedCardsArr})
    })
    this.tagsListener = firebase.database().ref(`storyBranch/${this.props.match.params.branchId}/tags`)
    this.tagsListener.on('value', snap => {
      const tags = snap.val()
      if (tags) this.setState({tags: Object.keys(tags)})
    })
  }

  componentWillUnmount() {
    if (this.tagsListener) this.tagsListener.off()
  }

  handleAddTag = (newTag) => {
    // data sent to firebase cannot contain . # $ [ ]
    if (newTag.includes('.')||newTag.includes('#')||newTag.includes('$')||newTag.includes('[')||newTag.includes(']')) {
      alert(`tags cannot contain '.', '#', '$', '[', or ']' `)
    } else {
      this.setState({
        tags: [...this.state.tags, newTag]
      })
      // add to tags db
      firebase.database().ref('tags').child(newTag).child(this.props.match.params.branchId).set(true)
      // add to tags in story db
      firebase.database().ref('storyBranch').child(this.props.match.params.branchId).child('tags').child(newTag).set(true)
    }
  }

  handleDeleteTag = (deleteMe) => {
    this.setState({
      tags: this.state.tags.filter(tag => tag !== deleteMe)
    })

    // remove from tags db
    firebase.database().ref('tags').child(deleteMe).child(this.props.match.params.branchId).remove()
    // remove this tag from story db
    firebase.database().ref('storyBranch').child(this.props.match.params.branchId).child('tags').child(deleteMe).remove()
  }

  render() {
    const storyBranchId = this.props.match.params.branchId
    const storyBranch = this.state.currentStoryBranch

    const getStoryRootTitle = () => {
      const roots = _.isEmpty(storyBranch) ? [] : storyBranch.storyRoot
      return roots.length > 1 ? roots[roots.length - 1].replace(/"/g, '') : storyBranchId.replace(/"/g, '')
    }

    return (
      <div className="container-fluid">
        <div className="story-container row">
          <div className="story-container col-lg-6 col-md-6 col-sm-6">
            <h2 className="align-center">{storyBranchId}</h2>
            <h4 className="align-center">Root:{' '}<a href={`/read/${getStoryRootTitle()}`}>"{getStoryRootTitle()}"</a></h4>
            <div className="start-read">
              {
                !_.isEmpty(this.state.storyCards[0].text) &&
                this.state.storyCards.map(storyCard => ReactHtmlParser(storyCard.text))
              }
            </div>
          </div>

          <div className="start-read col-lg-6 col-md-6 col-sm-6">
            <p></p>
            <ChipInput
              value={this.state.tags}
              fullWidth={true}
              hintText="Add a Tag"
              onRequestAdd={(chip) => this.handleAddTag(chip)}
              onRequestDelete={(chip) => this.handleDeleteTag(chip)}
              />
          </div>
        </div>
        <hr />
        <Reviews storyId={storyBranchId}/>
      </div>
    )
  }
}