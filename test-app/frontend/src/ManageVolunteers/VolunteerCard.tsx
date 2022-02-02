import React from "react";

export interface Volunteer
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

export default function VolunteerCard (props: Volunteer)
{
    return (
        <div>
            <ul>
                <li>{props.firstName}</li>
                <li>{props.lastName}</li>
                <li>{props.userID}</li>
            </ul>
        </div>
    )

}
/* Questions: 
    Are we primarily creating function or class React components? - Or is it case by case? 
    Do I need to setup the schema for Volunteers? 
    How do I call it in App.tsx? 
*/
