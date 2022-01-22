import exp from "constants";
import React, { Component } from "react";

type Volunteer = 
{
    /*
    Mock schema for a volunteer
    to be displayed when rendering all 
    the volunteers. 
    */ 
    firstName: string;
    lastName: string;
    userID: string;

}

class ManageVolunteers extends React.Component<Volunteer[]>
{
    constructor(props: Volunteer[])
    {
        super(props);
    }

    render(): React.ReactNode 
    {
        return (
            <div>
                <ul>
                    <li>{this.props[0].firstName}</li>
                    <li>{this.props[1].firstName}</li>
                </ul>
            </div>
        )
    }

}


export default ManageVolunteers;

/* Questions: 
    Are we primarily creating function or class React components? - Or is it case by case? 
    Do I need to setup the schema for Volunteers? 
    How do I call it in App.tsx? 
*/