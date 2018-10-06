const light = {
    header: {
        button: {
            active: '#fff',
            inactive: '#aaa'
        }
    },
    background: '#fff',
    foreground: '#000',
    composeScreen: {
        text: '#000',
        background: '#eee',
        dragBackground: '#ddd',
        button: {
            text: '#000',
            hover: '#ccc'
        },
        remainText: '#555'
    },
    stream: {
        fontSize: '10pt',
        separator: '#eee',
        text: '#000',
        link: '#999',
        name: {
            primary: '#000',
            secondary: '#999'
        },
        time: '#999'
    }
}

const dark = {
    header: {
        button: {
            active: '#fff',
            inactive: '#aaa'
        }
    },
    background: '#222',
    foreground: '#fff',
    composeScreen: {
        text: '#fff',
        background: 'rgba(255, 255, 255, 0.1)',
        dragBackground: 'rgba(255, 255, 255, 0.25)',
        button: {
            text: '#fff',
            hover: '#555'
        },
        remainText: '#ccc'
    },
    stream: {
        fontSize: '10pt',
        separator: '#333',
        text: '#fff',
        link: '#999',
        name: {
            primary: '#fff',
            secondary: '#777'
        },
        time: '#777'
    }
}

const colors = dark;

module.exports = colors;