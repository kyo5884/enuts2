const React = require('react');
const Header = require('./header.js');
const colors = require('./colors.js');

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div style={{
                    position: 'absolute',
                    top: 40,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: scroll,
                    backgroundColor: colors.background
                }}>

                </div>
            </div>
        );
    }
}

module.exports = App;