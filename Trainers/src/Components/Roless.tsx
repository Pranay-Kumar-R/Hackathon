import React from "react";
import "./Roles.css";
import { User, staticUsers } from "./Data";
import  { useState } from 'react';



interface Course {
    name: string;
}

const PECourses: Course[] = [
    { name: "HTML" },
    { name: "CSS" },
    { name: "JavaScript" },
    { name: "jQuery" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "C#" }
];

const BACourses: Course[] = [
    {name:"Sql"}
,{name:"powerBi"},];

const QACourses: Course[] = [
    {name:"testing"},{name:"automation teesting"},{name:"manual testing"},{name:"java"}
];

interface UserDetailsDialogProps {
    user: User;
    onClose: () => void;
}
import  { Component } from 'react';

interface IAssignesCourses {
    selectedCourses: string[];
}

interface UserDetailsDialogProps {
    onClose: () => void;
}

class UserDetailsDialog extends Component<UserDetailsDialogProps, IAssignesCourses> {
    constructor(props: UserDetailsDialogProps) {
        super(props);
        this.state = {
            selectedCourses: []
        };
    }

    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, courseName: string) => {
        const isChecked = event.target.checked;
        const { selectedCourses } = this.state;
        if (isChecked) {
            this.setState({
                selectedCourses: [...selectedCourses, courseName]
            });
        } else {
            this.setState({
                selectedCourses: selectedCourses.filter(course => course !== courseName)
            });
        }
    };

    assignCourses = () => {
        console.log(this.state.selectedCourses)
    }

    render() {
        let courses: Course[] = [];
        switch (this.props.user.role) {
            case "PE":
                courses = PECourses;
                break;
            case "BA":
                courses = BACourses;
                break;
            case "QA":
                courses = QACourses;
                break;
            default:
                break;
        }

        return (
            <div className="user-details-popup">
                <div className="user-details">
                    <span className="closedsd" onClick={this.props.onClose}>×</span>
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {this.props.user.name}</p>
                    <p><strong>Username:</strong> {this.props.user.username}</p>
                    <p><strong>Email:</strong> {this.props.user.mail}</p>
                    <p><strong>Role:</strong> {this.props.user.role}</p>
                    <p><strong>Courses:</strong></p>
                    <ul>
                        {courses.map(course => (
                            <li key={course.name}>
                                <label className="d-flex courses">
                                    <input
                                        className="px-2"
                                        type="checkbox"
                                        onChange={(event) => this.handleCheckboxChange(event, course.name)}
                                    />
                                    <div>
                                        {course.name}
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={this.assignCourses}>Assign Courses</button>
                </div>
            </div>
        );
    }
}


//




//

interface State {
    selectedRole: string | null;
    selectedUser: User | null;
    isDialogOpen: boolean;
    selectedCourses: Course[];
}

class Roles extends React.Component<{}, State> {
    state: State = {
        selectedRole: null,
        selectedUser: null,
        isDialogOpen: false,
        selectedCourses: []
    };

    handleRoleClick = (role: string) => {
        this.setState(prevState => ({
            selectedRole: prevState.selectedRole === role ? null : role,
        }));
    };

    handleUserClick = (user: User) => {
        this.setState({ selectedUser: user, isDialogOpen: true });
    };

    handleCloseDialog = () => {
        this.setState({ isDialogOpen: false });
    };

    handlePlusIconClick = (role: string) => {

        let courses: Course[] = [];
        switch (role) {
            case "PE":
                courses = PECourses;
                break;
            case "BA":
                courses = BACourses;
                break;
            case "QA":
                courses = QACourses;
                break;
            default:
                break;
        }
        this.setState({ selectedCourses: courses, isDialogOpen: true });
    };



    renderCoursesDialog = () => {
        const { selectedCourses } = this.state;
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.handleCloseDialog}>&times;</span>
                    <h2>Select Courses</h2>
                    {selectedCourses.map(course => (
                        <div key={course.name}>
                            <input type="checkbox" id={course.name} />
                            <label htmlFor={course.name}>{course.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    render() {
        const { selectedRole, selectedUser, isDialogOpen } = this.state;
        return (
            <div>
                <div className="Addcontainer px-5 mt-2 charts">
                    <div className="test">
                        <div className="AddFresher d-flex justify-content-end pie-chart chart ">
                            <div key="PE">
                                <button
                                    className="role-button"
                                    onClick={() => this.handleRoleClick("PE")}
                                >
                                    Project Engineer
                                </button>
                            </div>
                        </div>
                        {selectedRole === "PE" && this.renderUsersByRole("PE")}
                    </div>
                    <div className="test">
                        <div className="AddFresher d-flex justify-content-end pie-chart chart">
                            <div key="BA">
                                <button
                                    className="role-button"
                                    onClick={() => this.handleRoleClick("BA")}
                                >
                                    Business Analyst
                                </button>
                            </div>
                        </div>
                        {selectedRole === "BA" && this.renderUsersByRole("BA")}
                    </div>
                    <div className="test">
                        <div className="AddFresher d-flex justify-content-end pie-chart chart">
                            <div key="QA">
                                <button
                                    className="role-button"
                                    onClick={() => this.handleRoleClick("QA")}
                                >
                                    Quality Assurance
                                </button>
                            </div>
                        </div>
                        {selectedRole === "QA" && this.renderUsersByRole("QA")}
                    </div>
                </div>
                {isDialogOpen && selectedUser && (
                    <UserDetailsDialog
                        user={selectedUser}
                        onClose={this.handleCloseDialog}
                    />
                )}
                {isDialogOpen && !selectedUser && this.renderCoursesDialog()}
            </div>
        );
    }

    renderUsersByRole = (role: string) => {
        const users = staticUsers.filter(user => user.role === role);

        return (
            <div className="users-list">
                {users.map(user => (
                    <div key={user.username} className="d-flex border user justify-content-between px-2" onClick={() => this.handleUserClick(user)}>
                        <div className="my-1 p-1">
                            <div>Name: {user.name}</div>
                            <div>Username: {user.username}</div>
                            <div>Email: {user.mail}</div>
                        </div>
                        <div className="add-Task d-flex" >
                           
                            <i onClick={() => this.handlePlusIconClick(role)} className="fa-solid fa-plus plus-icon pt-3 pe-2"></i>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
}

export default Roles;
