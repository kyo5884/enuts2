const React = require('react');
const Header = require('./header.js');
const colors = require('./colors.js');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home'
        }
    }

    selectTab(name) {
        this.setState({selectedTab: name});
    }

    render() {
        return (
            <div>
                <Header
                    selectTab={(tabName) => this.selectTab(tabName)} 
                    selectedTab={this.state.selectedTab}
                />
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
                position: 'absolute',
                top: 40,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: scroll,
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