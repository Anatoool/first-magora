const request = (id) => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/api/user/events/' + id);

        xhr.onload = () => resolve(xhr.responseText, xhr.status);
        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
  });
}

const GetEvent = (id, editevent) => dispatch=> {
      request(id).then( (resolve) => {
          const data = JSON.parse(resolve);

          const event = data.event;
          console.log(event);

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
      }, (reject) => {
        console.log(reject);
      });
}

export default GetEvent;
