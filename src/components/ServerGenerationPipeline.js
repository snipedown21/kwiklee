import React from 'react';
import { Steps } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setupServer } from '../actions';

const STEP_1 = 'Generate Project Directory',
  STEP_2 = 'Initialize with NPM',
  STEP_3 = 'Server Mobilization',
  STEP_4 = 'Database creation',
  STEP_5 = 'Startup the server';

const DESC_1 = 'Create a directory with the name of your server.',
  DESC_2 = 'initialize the directory with npm controls.',
  DESC_3 = 'get the json-server package.',
  DESC_4 = 'Create a file db.json and plugin the artifact.',
  DESC_5 = 'Turn the engine on - The cool stuff.';

const { Step } = Steps;

class ServerGenerationPipeline extends React.Component {
  beginExecution = () => {
    this.props.setupServer(
      localStorage.getItem('serverName'),
      localStorage.getItem('artifactName')
    );
  }

  render() {
    const beginExecutionEnabled = this.props.current > 0 ? 'disabled': '';

    return (
      <div style={{ marginLeft: '30%', marginTop: '10%' }}>
        <Steps direction="vertical" current={this.props.current}>
          <Step title={STEP_1} description={DESC_1} />
          <Step title={STEP_2} description={DESC_2} />
          <Step title={STEP_3} description={DESC_3} />
          <Step title={STEP_4} description={DESC_4} />
          <Step title={STEP_5} description={DESC_5} />
        </Steps>
        <button onClick={this.beginExecution} className={`waves-effect waves-light btn btn-theme ${beginExecutionEnabled}`}><i className="material-icons left">power_settings_new</i>Begin</button>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.serverPipeline.current
  }
};

export default withRouter(connect(mapStateToProps, { setupServer })(ServerGenerationPipeline));
