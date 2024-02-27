async function fetchJSON(filePath) {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    return jsonData;
  }
  
  function updateSpanTags(biographies) {
    for (const key in biographies) {
      const span = document.getElementById(key);
      if (span) {
        const biography = biographies[key].profile_bio;
        span.textContent = biography;
      }
    }
  }
  
  fetchJSON('assets/users.json')
    .then(data => {
      const keysArray = Object.keys(data);
      for (const key of keysArray) {
        const span = document.getElementById(key);
        if (span) {
          span.textContent = data[key];
        }
      }
      fetchJSON('assets/profile/abouts.json')
        .then(biographies => {
          updateSpanTags(biographies);
        });
    });
  