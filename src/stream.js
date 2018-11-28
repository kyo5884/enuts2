const React = require('react');
const Post = require('./post.js');
const Store = require('electron-store');
const store = new Store();

class Stream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            since_id: 0
        }
    }

    componentDidMount() {
        this.update();
    }

    update() {
        fetch(this.props.url + `?since_id=${this.state.since_id}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + store.get('token') }
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(this.props.url, json);
            this.setState({
                data: [...json.data, ...this.state.data],
                since_id: json.meta.max_id
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.data.map((item, key) => {
                    return <Post data={item} key={key} />
                })}
            </div>
        );
    }
}

module.exports = Stream;