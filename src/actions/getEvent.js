import reqGetEvent from '../requests/userRequests/reqGetEvent';

const GetEvent = (id, editevent) => dispatch => {

      reqGetEvent(id, dispatch).then((data) => {

        const event = data.event;

        if (event === null) {
          editevent.setState({eventLoad: "impossible"});
        }

        const editable = {
          name: event.name,
          description: event.description,
          importance: event.importance,
          dateEnd: new Date(event.date_end),
          dateStart: new Date(event.date_start),
          address: event.place,
          id: event._id
        };

        dispatch({type: 'SET_EDITABLE_EVENT', payload: editable});

        editevent.setState({eventLoad: "yes"});

      });
}

export default GetEvent;
