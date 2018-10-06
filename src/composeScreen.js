const colors = require('./colors.js');
const FontAwesome = require('react-fontawesome');
const TextareaAutosize = require('react-autosize-textarea').default;
const Transition = require('react-transition-group/Transition').default;

const remote = require('electron').remote;
const dialog = remote.dialog;

class ComposeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            markdownValue: '',
            attachment: [],
            dragOver: false
        }
    }

    focusTextArea() {
        ReactDOM.findDOMNode(this.refs.textarea).focus();
    }

    close() {
        this.setState({attachment: [], value: '', markdownValue: '', dragOver: false});
        this.props.closeComposeScreen();
    }

    onChangeText(event) {
        this.setState({value: event.target.value});
        if (event.target.value.match('(?:__|[*#])|\[(.*?)\]\(.*?\)')) {
            this.setState({markdownValue: event.target.value.replace(/\[([^\]]+)\][^\)]+\)/g, '$1')});
        } else {
            this.setState({markdownValue: event.target.value});
        }
    }

    addAttachment() {
        dialog.showOpenDialog(remote.getCurrentWindow(), {
            properties: ['openFile', 'multiSelections'],
            filters: [
                {name: 'Images', extensions: ['jpg', 'png', 'gif']},
                {name: 'All Files', extensions: ['*']}
            ]
        }, (files) => {
            if (files !== undefined) {
                let newAttachment = [...this.state.attachment, ...files]
                this.setState({attachment: newAttachment});
            }
        });
    }

    render() {
        return (
            <div 
                style={{
                    height: this.props.opened ? 103 : 0,
                    overflow: 'hidden',
                    color: colors.composeScreen.text,
                    borderBottom: '1px solid ' + colors.stream.separatorColor,
                    backgroundColor: this.state.dragOver ? colors.composeScreen.dragBackground : colors.composeScreen.background,
                    transition: 'height 250ms cubic-bezier(0.19, 1, 0.22, 1)'
                }}
                onDragEnter={() => {
                }}
                onDragLeave={() => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.setState({dragOver: false})
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.setState({dragOver: true})
                    event.dataTransfer.dropEffect = 'copy';
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    this.setState({dragOver: false});
                    
                    var newAttachment = this.state.attachment;
                    Array.from(event.dataTransfer.files).forEach(file => {
                        if (file.type.match(/image/)) {
                            newAttachment.push(file.path);
                        }
                    });
                    this.setState({attachment: newAttachment});
                }}
            >
                <div style={{
                    margin: 8
                }}>
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        padding: 4,
                        flexDirection: 'row'
                    }}>
                        <img
                            src='http://dummyimage.com/48x48'
                            style={{
                                width: 48,
                                height: 48,
                                marginRight: 12,
                                borderRadius: '100%'
                            }}
                        />
                        <textarea
                            ref='textarea'
                            style={{
                                flex: 1,
                                fontSize: '10pt',
                                border: 'none',
                                padding: 0,
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
                            onChange={(event) => this.onChangeText(event)}
                            rows={2}
                        />
                    </div>
                    {this.state.attachment.length ? <div style={{
                        display: 'flex',
                        flex: 1,
                        margin: '8px 0 4px 6px',
                        flexDirection: 'row',
                        justifyContent: '',
                        overflowY: 'scroll'
                    }}>
                        {this.state.attachment.map((item, key) => {
                            return (
                                <div 
                                    key={key}
                                    style={{
                                        position: 'relative',
                                        opacity: state == 'entered' || state == 'entering' ? 1 : 0,
                                        transition: 'opacity 500ms linear'
                                    }}
                                >
                                    <div
                                        style={{
                                            height: 48,
                                            width: 48,
                                            margin: '8px 16px 0 0',
                                            backgroundImage: 'url("' + item + '")',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 8,
                                            cursor: 'pointer',
                                            backgroundColor: colors.composeScreen.background,
                                            border: '1px solid ' + colors.composeScreen.background,
                                            borderRadius: '100%'
                                        }}
                                        onClick={() => {
                                            let newAttachment = this.state.attachment;
                                            newAttachment.splice(key, 1);
                                            this.setState({attachment: newAttachment})
                                        }}
                                    >
                                        <FontAwesome name='times-circle'/>
                                    </div>
                                </div>
                            );
                        })}
                    </div> : null}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        fontSize: '12px'
                    }}>
                        <div style={{
                            padding: 8,
                            color: colors.composeScreen.remainText
                        }}>
                            {256 - this.state.markdownValue.length}
                        </div>
                        <div style={{
                            color: colors.composeScreen.button.text
                        }}>
                            <ComposeScreenButton icon_name={'photo'} text={'+'} onClick={() => this.addAttachment()} />
                            <ComposeScreenButton icon_name={'times'} text={'Cancel'} onClick={() => this.close()}/>
                            <ComposeScreenButton icon_name={'paper-plane'} text={'Post'} />
                        </div>
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
                    padding: 8,
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