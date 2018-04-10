import React from 'react';

export default class SimpleTextInputField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <input type="text" onChange={this.handleChange} className="text-input" />
            </div>
        );
    }
}