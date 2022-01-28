import shift from '/shift-interface';
import app from '../server'; 
import isUserAdmin from "../middleware";

app.post('/api/event', isUserAdmin, async (req, res) => {
    console.log("POST: Creating Calendar Event...");

    const { start, end, maxVolunteers, title, description,  eventAdmin} = req.body;

    if (!title) {
        res.status(403).json({
            message: 'Must include title',
        });    return;
    }

    if (start >= end){
        res.status(403).json({
            message: 'Start date must come before end date',
        });    return;
    }

    if(maxVolunteers <= 0){
        res.status(403).json({
            message: 'Max Volunteers must be greater than 0',
        });    return;
    }

    const newShift = {
    start: start,
    end: end,
    maxVolunteers: maxVolunteers,
    title: title,
    description: description,
    eventAdmin: eventAdmin,
    };
    const eventCreated = await Database.saveShift(newShift);

    res.status(201).json({
        message: 'New shift successfully created',
    });    return;

  });