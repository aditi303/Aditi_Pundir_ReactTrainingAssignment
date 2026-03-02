import React, { type MouseEventHandler } from 'react';

interface Props {
    fname:string;
    lname:string;
    deleteemployee:MouseEventHandler;
    editemployee:MouseEventHandler;
}
 
interface State {
    
}
 
class LIComponents extends React.Component<Props, State> {
    
    render() { 
        return (
            <>
                <td>{this.props.fname}</td>
                <td>{this.props.lname}</td>
                <td><button onClick={this.props.deleteemployee}>Remove</button></td>
                <td><button onClick={this.props.editemployee}>Edit</button></td>
            </>
        );
    }
}
 
export default LIComponents;