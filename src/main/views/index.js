var ReactDOM = require('react-dom');
var React = require('react');
var $ = require('jquery');
var EventProxy = require("eventproxy");

const urlPrefix = "/users/hostUrl";
let eventProxy = new EventProxy();

class ResultDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayResult: [1, 2, 3]
        };
        let self = this;
        eventProxy.addListener("URLRECEIVED", function(data){
            self.setState({arrayResult: data});
        })
    }

    renderListItems() {
        let arrayItem = this.state.arrayResult.map(function (result) {
            return (<li>{result}</li>)
        });
        return arrayItem;
    }

    render() {
        return (
            <ul>
                {this.renderListItems()}
            </ul>
        )
    }
}

class SubmitBtn extends React.Component {
    handleClick() {
        var url = urlPrefix;
        $.post(url, {"hostUrl": "test"}, function (data) {
            console.log(data);
            eventProxy.emit("URLRECEIVED", JSON.parse(data));
        });
    }

    render() {
        return <button onClick={this.handleClick}>submit</button>
    }
}

class SubmitDiv extends React.Component {
    render() {
        return (
            <div>
                <input type={"text"} placeholder={"Please input the url"}></input>
                <SubmitBtn></SubmitBtn>
            </div>
        )
    }
}


const element = (
    <div>
        <SubmitDiv/>
        <ResultDiv/>
    </div>
);

ReactDOM.render(
    element,
    document.getElementById("example")
);
