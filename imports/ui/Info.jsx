import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';
import { Meteor } from 'meteor/meteor';

class Info_ALT extends Component {
  render() {
    const links = this.props.links.map(
      link => this.makeLink(link)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ links }</ul>
      </div>
    );
  }

  makeLink(link) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }
}

const Info = ({ links = [], ready = false }) => (
  ready ? 
  <div>
    <h2>Learn Meteor!</h2>
    <ul>{ links.map(link => (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    )) }</ul>
  </div> :
  <h2>Wird geladen</h2>
)

export default withTracker(() => {
  const handle = Meteor.subscribe('links');
  return {
    ready: handle.ready(),
    links: Links.find().fetch(),
  };
})(Info);
