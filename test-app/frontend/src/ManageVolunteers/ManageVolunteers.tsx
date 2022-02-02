import exp from "constants";
import React, { Component } from "react";
import { domainToASCII } from "url";
import VolunteerCard from "./VolunteerCard";

interface ManageVolunteerProps
{
    volunteers: Volunteer[]
}

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

export default function ManageVolunteers (props: ManageVolunteerProps)
{
    return (
        <div>
            <h1>Volunteer List</h1>
            {for(let i = 0; i < props.length; i++){
                <VolunteerCard item={item} key={key}/>
            }}


            {props.map((item, key) => {
              <VolunteerCard item={item} key={key}/>
            })}
        </div>
    )

}