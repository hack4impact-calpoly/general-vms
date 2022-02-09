import VolunteerCard from './VolunteerCard';

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
  eventsAttending: string[];

}

interface ManageVolunteerProps
{
  volunteers: Volunteer[]
}

function renderCards(volCardLst: Volunteer[]) {
  // This function will loop through the ManageVolProps list
  // and render each card
  const jsxList = [];
  for (let i = 0; i < volCardLst.length; i++) {
    jsxList.push(
      <VolunteerCard {...volCardLst[i]}/>,
    );
  }
  return (
    jsxList
  );
}

export default function ManageVolunteers(props: ManageVolunteerProps) {
  return (
    <div>
      <h1>Volunteer List</h1>
      <ul>
        {renderCards(props.volunteers)}
      </ul>
    </div>
  );
}
