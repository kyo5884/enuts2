const React = require('react');
const Header = require('./header.js');
const ComposeScreen = require('./composeScreen.js')
const colors = require('./colors.js');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
            composeScreenOpened: false
        }
    }

    selectTab(name) {
        this.setState({selectedTab: name});
    }

    toggleComposeScreen() {
        if (this.state.composeScreenOpened) {
            this.setState({composeScreenOpened: false});
        } else {
            this.setState({composeScreenOpened: true});
            this.refs.composeScreen.focusTextArea();
        }
    }

    render() {
        return (
            <div>
                <Header
                    selectTab={(tabName) => this.selectTab(tabName)} 
                    selectedTab={this.state.selectedTab}
                    toggleComposeScreen={() => this.toggleComposeScreen()}
                    composeScreenOpened={this.state.composeScreenOpened}
                />
                <ComposeScreen
                    ref='composeScreen'
                    opened={this.state.composeScreenOpened}
                    toggleComposeScreen={() => this.toggleComposeScreen()}
                />
                <div style={{
                    height: 'calc(100% - 40px)',
                    overflow: 'scroll'
                }}>
                    <Tab>
                        <TabPanel selected={this.state.selectedTab == 'Home'}>
                            Home
                        </TabPanel>
                        <TabPanel selected={this.state.selectedTab == 'Mentions'}>
                            Mentions
                        </TabPanel>
                        <TabPanel selected={this.state.selectedTab == 'Interactions'}>
                            Interactions
                        </TabPanel>
                        <TabPanel selected={this.state.selectedTab == 'Global'}>
                            Global
                        </TabPanel>
                        <TabPanel selected={this.state.selectedTab == 'User'}>
                            User
                        </TabPanel>
                    </Tab>
                </div>
            </div>
        );
    }
}

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{
                height: '1000px',
                width: '100%',
                backgroundColor: colors.background
            }}>
                {this.props.children}
            </div>
        );
    }
}

class TabPanel extends React.Component {
    render() {
        return(
            <div>{this.props.selected ? this.props.children : null}</div>
        );
    }
}

module.exports = App;