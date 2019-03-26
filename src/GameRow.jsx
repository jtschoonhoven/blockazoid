import React from 'react';


export default (props) => {
    const key = `y${props.y}`;
    return (
        <tr key={ key }>
            { props.children }
        </tr>
    );
}
