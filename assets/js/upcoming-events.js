// Function to fetch upcoming events data from URL
async function fetchUpcomingEventsData() {
  try {
    const response = await fetch(window.origin+'/upcomings.txt');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Function to create and populate the table
function createUpcomingEventsTable(events) {
  const table = document.createElement('table');
  table.classList.add('upcoming-events-table');

  const headerRow = table.insertRow();
  const headers = ['Organizer', 'Weight', 'Title', 'URL'];

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  events.forEach(event => {
    const row = table.insertRow();
    const { organizers, weight, title, url } = event;

    const organizerCell = row.insertCell();
    organizerCell.textContent = organizers[0]?.name || '';

    const weightCell = row.insertCell();
    weightCell.textContent = weight || '';

    const titleCell = row.insertCell();
    titleCell.textContent = title || '';

    const urlCell = row.insertCell();
    const urlLink = document.createElement('a');
    urlLink.href = url || '#';
    urlLink.textContent = url || 'N/A';
    urlCell.appendChild(urlLink);
  });

  return table;
}

// Fetch upcoming events data and populate the table
fetchUpcomingEventsData()
  .then(events => {
    const upcomingEventsContainer = document.getElementById('upcoming-events');
    if (!upcomingEventsContainer) {
      console.error("Element with ID 'upcoming-events' not found.");
      return;
    }

    const table = createUpcomingEventsTable(events);
    upcomingEventsContainer.appendChild(table);
  });
