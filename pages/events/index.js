import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/events-list';

function AllEventsPage() {
  const events = getAllEvents();
    return (
      <EventList items={events} />
    )
  }
  export default AllEventsPage;
  