import React from 'react';


export default class GameTile extends React.Component {
    state = {
        isActive: false,
    }

    constructor({ x, y }) {
        super();
        this.x = x;
        this.y = y;
    }

    render() {
        const key = `x${this.props.x}y${this.props.y}`;
        return (
            <td
                key={ key }
                className={ this.state.isActive ? 'bz-active' : '' }
                onMouseOver={ this.props.onmouseover }
            />
        );
    }
}
