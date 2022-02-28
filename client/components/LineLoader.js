import React, {Component} from 'react';

class LineLoader extends Component {
    render() {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: 'fit-content'
            }}>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        );
    }
}

export default LineLoader;
