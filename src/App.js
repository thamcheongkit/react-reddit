import React from 'react';
import UI from './ui/ui';
import redditApi from './redditApi';

export default class App extends React.Component {
  state = {
    data: [],
    loading: true
  }

  componentDidMount() {
    redditApi.get(this.props.location, data=>this.setState({ data: data, loading: false }));
  }

  componentDidUpdate(previousProps) {
    if (this.props.location.pathname !== previousProps.location.pathname ||
      this.props.location.search !== previousProps.location.search) {
      this.setState({ loading: true })
      redditApi.get(this.props.location, data=>this.setState({ data: data, loading: false }));
    }
  }

  render() {
    return (<UI {...this.props} {...this.state} />)
  }
}
