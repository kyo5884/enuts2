const FontAwesome = require('react-fontawesome');
const colors = require('./colors.js');

class Header extends React.Component {

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
                <div style={{
                    
                }}>
                    <HeaderButton
                        icon_name='home'
                        active
                    />
                    <HeaderButton
                        icon_name='at'
                    />
                    <HeaderButton
                        icon_name='bullseye'
                    />
                    <HeaderButton
                        icon_name='globe'
                    />
                    <HeaderButton
                        icon_name='user'
                    />
                </div>
                <div style={{marginRight: '5px'}}>
                <HeaderButton
                    icon_name='pencil'
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
            <FontAwesome
                name={this.props.icon_name} 
                style={{
                    fontSize: '18px',
                    margin: 0,
                    padding: '5px',
                    color: this.props.active ? colors.button.active : colors.button.inactive
                }}
            />
        );
    }
}

module.exports = Header;