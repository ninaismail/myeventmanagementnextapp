import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/events-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();
  //we need a function to call the onSearch function/prop
  //this function takes the same 2 parameters 
  //and returns the path to be executed when the form is submitted 
  //and we extracted our input/selected values
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    //go to a diffrent page
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;