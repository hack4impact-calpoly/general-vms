import { Volunteer } from './ManageVolunteers';

function renderEventList(eventLst: string[]) {
  //   // This function will loop through the ManageVolProps list
  //   // and render each card
  const jsxList = [];
  for (let i = 0; i < eventLst.length; i++) {
    jsxList.push(
      <li>{eventLst[i]}</li>,
    );
  }
  return (
    jsxList
  );
}

export default function VolunteerCard(props: Volunteer) {
  return (
    <div>
      <h2>{props.firstName} {props.lastName}</h2>
      <ul>
        <li>User ID: {props.userID}</li>
        <li>Events Attending:</li>
        <ul>
          <li>{renderEventList(props.eventsAttending)}</li>
        </ul>
      </ul>
    </div>
  );
}
