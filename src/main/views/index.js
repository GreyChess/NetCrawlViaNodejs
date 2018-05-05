var ReactDOM = require('react-dom');
var React = require('react');
var $ = require('jquery');
const urlPrefix = "/users/hostUrl";

class SubmitBtn extends React.Component {
    handleClick(){
        var url = urlPrefix;
        $.post(url, {"hostUrl": "test"}, function(data){
            console.log(data)
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

const element = <SubmitDiv/>

ReactDOM.render(
    element,
    document.getElementById("example")
);
