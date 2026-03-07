import React, { Component } from 'react';
import Validation from './Validation';  
import LIComponents from './LIComponents';
interface IProps {
    
}

interface IEmp{
    fname: string;
    lname: string;
}

interface IState {
   emp : IEmp;
   emps : IEmp[];
   errors:{}
}
 
class Basics1 extends Component<IProps, IState> {
    state: IState = {
                        emp :  { fname: "", lname: "" },
                        emps : [],
                        errors : {}
                    };
    Change1 = () => {  
        this.setState({ emp: { ...this.state.emp, fname: "Jane" } });
    }

    removeEmployee = (index:number) => {
        let copyEmps = [...this.state.emps];
        copyEmps.splice(index, 1);
        this.setState({ emps: copyEmps });
    }

    editEmployee = (index:number) => {
        const empToEdit = this.state.emps[index];
        let copyEmps = [...this.state.emps];
        copyEmps.splice(index, 1);
        this.setState({ emps: copyEmps, emp: { ...empToEdit } });
    }

    OnTextChange=(args)=>{
            debugger;
            let copyEmp: IEmp =  { ...this.state.emp };
            copyEmp[args.target.name] = args.target.value;
            this.setState({ emp: copyEmp });

    }
    ValidationonData = () => {
        let errors = {};
        if (Validation.isEmpty(this.state.emp.fname)) {
            errors.fname = "First Name is required";
        }  
        if (Validation.isEmpty(this.state.emp.lname)) {
            errors.lname = "Last Name is required";
        }   
        this.setState({ errors: errors });
        if (Object.keys(errors).length > 0) {
            return false;
        }else {
            return true;
        }
    }
        
    Add = () => {
        debugger;
        if (!this.ValidationonData()) {  
            return;
        }
        let copyEmps: IEmp[] = [ ...this.state.emps ];
        copyEmps.push(this.state.emp);
        this.setState({ emps: copyEmps });
        this.setState({ emp: { fname: "", lname: "" } });
    }
    render() 
    {
        return (
            <div className="page-container">
                    <h2>Add Employee</h2>                    <hr />
                    First Name : <input className="input-field" type="text" value={this.state.emp.fname}
                                   onChange={this.OnTextChange} name='fname'></input>
                                   <span className="error">{this.state.errors.fname}</span><br></br><br></br>
                    Last Name : <input className="input-field" type="text" value={this.state.emp.lname} name='lname'
                                   onChange={this.OnTextChange}></input>
                                   <span className="error">{this.state.errors.lname}</span><br></br><br></br>

                    <button className="btn-primary" onClick={this.Add}>Add Employee</button><br></br><br></br>
                    <hr />
                    <h2>Employees</h2>             
                    <table border={1} cellPadding={10}>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Remove</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.emps.map((e, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <LIComponents
                                            fname={e.fname}
                                            lname={e.lname}
                                            deleteemployee={() => this.removeEmployee(index)}
                                            editemployee={() => this.editEmployee(index)}
                                        />
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

            </div>
                // </React.Fragment>
         );
    }
}
 

export default Basics1;