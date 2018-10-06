const React = require('react');
const Header = require('./header.js');
const ComposeScreen = require('./composeScreen.js');
const Stream = require('./stream.js');
const colors = require('./colors.js');

const API_ROOT = 'https://api.pnut.io/v0';

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
            this.closeComposeScreen();
        } else {
            this.openComposeScreen();
        }
    }

    closeComposeScreen() {
        this.setState({composeScreenOpened: false});
    }

    openComposeScreen() {
        this.setState({composeScreenOpened: true});
        this.refs.composeScreen.focusTextArea();
    }

    render() {
        return (
            <div
                style={{
                    fontFamily: '-apple-system, sans-serif',
                    color: colors.foreground
                }}
                onDragOver={(event) => {
                    event.dataTransfer.dropEffect = 'none';
                    event.preventDefault();
                }}
                onDrop={(event) => {event.preventDefault()}}
            >
                <Header
                    selectTab={(tabName) => this.selectTab(tabName)} 
                    selectedTab={this.state.selectedTab}
                    toggleComposeScreen={() => this.toggleComposeScreen()}
                    composeScreenOpened={this.state.composeScreenOpened}
                />
                <ComposeScreen
                    ref='composeScreen'
                    opened={this.state.composeScreenOpened}
                    closeComposeScreen={() => this.closeComposeScreen()}
                />
                <div style={{
                    height: 'calc(100% - 40px)',
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
                            <Stream url={API_ROOT + '/posts/streams/global'} />
                        </TabPanel>
                        <TabPanel selected={this.state.selectedTab == 'User'}>
                            User
                        </TabPanel>
                        <TabPanel selected={this.state.selectedTab == 'Search'}>
                            Search
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
            }}>
                {this.props.children}
            </div>
        );
    }
}

class TabPanel extends React.Component {
    render() {
        return(
            <div style={{
                height: '100%',
                width: '100%',
                overflow: 'scroll',
                backgroundColor: colors.background,
                display: this.props.selected ? 'block' : 'none'
            }}>
                {this.props.children}
            </div>
        );
    }
}

module.exports = App;