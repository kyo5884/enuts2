const FontAwesome = require('react-fontawesome');
const colors = require('./colors.js');

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                height: 40,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                WebkitAppRegion: 'drag'
            }}>
                <div style={{width: '56px', height: '100%'}} />
                <div>
                    <HeaderButton
                        icon_name='home'
                        tab_name='Home'
                        selectTab={this.props.selectTab}
                        selectedTab={this.props.selectedTab}
                    />
                    <HeaderButton
                        icon_name='at'
                        tab_name='Mentions'
                        selectTab={this.props.selectTab}
                        selectedTab={this.props.selectedTab}
                    />
                    <HeaderButton
                        icon_name='bullseye'
                        tab_name='Interactions'
                        selectTab={this.props.selectTab}
                        selectedTab={this.props.selectedTab}
                    />
                    <HeaderButton
                        icon_name='globe'
                        tab_name='Global'
                        selectTab={this.props.selectTab}
                        selectedTab={this.props.selectedTab}
                    />
                    <HeaderButton
                        icon_name='user'
                        tab_name='User'
                        selectTab={this.props.selectTab}
                        selectedTab={this.props.selectedTab}
                    />
                </div>
                <div style={{marginRight: '5px'}} onClick={() => this.props.toggleComposeScreen()}>
                    <FontAwesome
                        name={'pencil'} 
                        style={{
                            fontSize: '18px',
                            margin: 0,
                            padding: '5px',
                            color: this.props.composeScreenOpened ? colors.header.button.active : colors.header.button.inactive,
                            transform: this.props.composeScreenOpened ? 'rotate(-30deg)' : 'rotate(0)',
                            transition: 'color 500ms cubic-bezier(0.19, 1, 0.22, 1), transform 500ms cubic-bezier(0.19, 1, 0.22, 1)'
                        }}
                    />
                </div>
            </div>
        );
    }
}

class HeaderButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a onClick={() => this.props.selectTab(this.props.tab_name)}>
                <FontAwesome
                    name={this.props.icon_name} 
                    style={{
                        fontSize: '18px',
                        margin: 0,
                        padding: '5px',
                        color: this.props.selectedTab == this.props.tab_name ? colors.header.button.active : colors.header.button.inactive,
                        transition: 'color 500ms cubic-bezier(0.19, 1, 0.22, 1)'
                    }}
                />
            </a>
        );
    }
}

module.exports = Header;