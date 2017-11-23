import React from 'react';
import UI from './ui/ui';
import redditApi from './redditApi';

export default class App extends React.Component {
  state = {data: []}

  componentDidMount() {
    redditApi.get(this.props.location, data=>this.setState({data: data})
    );
  }

  componentDidUpdate(previousProps) {
    if (this.props.location.pathname !== previousProps.location.pathname ||
      this.props.location.search !== previousProps.location.search) {
      redditApi.get(this.props.location, data=>this.setState({data: data})
      );
    }
  }

  render() {
    return (<UI {...this.props} {...this.state} />)
  }
}
