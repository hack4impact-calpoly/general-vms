import * as React from 'react';
import './Shifts.scss';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Dialog from './ShiftsDialog/ShiftsDialog';

import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const myEventsList =
  [
    {
      title: 'Shift 1',
      start: moment().toDate(),
      end: moment().add(1, 'hour'),
    },
    {
      title: 'Shift 2',
      start: moment().add(1, 'day').toDate(),
      end: moment().add(1, 'day').add(1, 'hour').toDate(),
    },
    {
      title: 'Shift 3',
      start: moment().add(2, 'day').toDate(),
      end: moment().add(2, 'day').add(3, 'hours').toDate(),
    },
    {
      title: 'Shift 4',
      start: moment().add(3, 'days').toDate(),
      end: moment().add(4, 'days').add(2, 'hours').toDate(),
    },
  ];

function Shifts() {
  const [open, setOpen] = React.useState(false);
  const [title, setEventTitle] = React.useState(String);
  const [start, setStart] = React.useState(String);
  const [end, setEnd] = React.useState(String);

  const handleClickOpen = (title: string, start: string, end: string) => {
    setOpen(true);
    setEventTitle(title);
    setStart(start);
    setEnd(end);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <main>
        <div >
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 700 }}
            defaultView='week'
            onSelectEvent={(e) => handleClickOpen(e.title, e.start.toISOString(), e.end.toISOString())}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            title={title}
            start={start}
            end={end}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Shifts;
