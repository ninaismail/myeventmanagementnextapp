import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/events-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage() {
  const router = useRouter();
  //when the page is first rendered we don't have the slug value (we don't have access to the url data yet)
    const filterData = router.query.slug;

  //the data is not loaded yet
    if (!filterData) {
      return <p className='center'>Loading...</p>;
    }
  //the second time it's rendered, we have access to the url data
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
  
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
  //if we don't have a valid year and vaid month
    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      return (
        <Fragment>
          <ErrorAlert>
            <p>Invalid filter. Please adjust your values!</p>
          </ErrorAlert>
          <div className='center'>
            <Button link='/events'>Show All Events</Button>
          </div>
        </Fragment>
      );
    }
  //if we do have a valid year and valid month
    const filteredEvents = getFilteredEvents({
      year: numYear,
      month: numMonth,
    });
    console.log({filteredEvents});
  //we check if fitered events is an empty array,
  //so we have a valid filter but we don't find an event for the chosen filter
    if (!filteredEvents || filteredEvents.length === 0) {
      return (
        <Fragment>
          <ErrorAlert>
            <p>No events found for the chosen filter!</p>
          </ErrorAlert>
          <div className='center'>
            <Button link='/events'>Show All Events</Button>
          </div>
        </Fragment>
      );
    }
  //now we know that we have valid events
    const date = new Date(numYear, numMonth - 1);

    return (
      <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </Fragment>
    );
  }
  
  export default FilteredEventsPage;