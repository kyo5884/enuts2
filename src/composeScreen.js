const colors = require('./colors.js');
const FontAwesome = require('react-fontawesome');
const Textarea = require('react-textarea-autosize').default;

class ComposeScreen extends React.Component {

    focusTextArea() {
        ReactDOM.findDOMNode(this.refs.textarea).focus();
    }

    close() {
        this.props.toggleComposeScreen();
    }

    render() {
        return (
            <div style={{
                height: this.props.opened ? 'unset' : 0,
                padding: this.props.opened ? '8px': '0px 8px',
                overflow: 'hidden',
                transition: 'height 500ms cubic-bezier(0.19, 1, 0.22, 1), padding 500ms cubic-bezier(0.19, 1, 0.22, 1)',
                borderBottom: '1px solid ' + colors.stream.separatorColor,
                backgroundColor: colors.composeScreen.background
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <img
                        src='http://dummyimage.com/48x48'
                        style={{
                            width: 48,
                            height: 48,
                            marginRight: 6,
                            borderRadius: '100%'
                        }}
                    />
                    <Textarea
                        ref='textarea'
                        style={{
                            flex: 1,
                            fontSize: '10pt',
                            border: 'none',
                            resize: 'none',
                            outline: 0,
                            backgroundColor: 'transparent'
                        }}
                        placeholder='Say something...'
                        onKeyDown={(event) => {
                            if (event.keyCode == 27) { // ESC key
                                this.close();
                            }
                        }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginTop: 6,
                    fontSize: '9pt'
                }}>
                    <div style={{
                        padding: 6,
                        color: colors.composeScreen.remainText
                    }}>
                        256
                    </div>
                    <div style={{
                        color: colors.composeScreen.button.text
                    }}>
                        <ComposeScreenButton icon_name={'paperclip'} text={'Add Files'} />
                        <ComposeScreenButton icon_name={'times'} text={'Cancel'} onClick={() => this.close()}/>
                        <ComposeScreenButton icon_name={'paper-plane'} text={'Post'} />
                    </div>
                </div>
            </div>
        );
    }
}

class ComposeScreenButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    render() {
        return (
            <span
                onClick={this.props.onClick}
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}
                style={{
                    padding: 6,
                    backgroundColor: this.state.hover ? colors.composeScreen.button.hover : 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 500ms cubic-bezier(0.19, 1, 0.22, 1)'
                }}
            >
                <FontAwesome name={this.props.icon_name} />
                <span style={{
                    marginLeft: 3
                }}>
                    {this.props.text}
                </span>
            </span>
        )
    }
}

module.exports = ComposeScreen;