document.addEventListener('DOMContentLoaded', function () {
    // Execute code after the DOM is fully loaded

    const fetchProgramsButton = document.getElementById('fetchProgramsButton');

    fetchProgramsButton.addEventListener('click', function () {
        // Make a GET request to the backend endpoint
        fetch('/api/fitness-programs') // Assuming your backend API endpoint
            .then(response => response.json())
            .then(data => {
                updateFrontend(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    function updateFrontend(data) {
        const programsList = document.getElementById('programsList');
        programsList.innerHTML = '';

        data.forEach(program => {
            const listItem = document.createElement('li');
            listItem.textContent = program.name;
            programsList.appendChild(listItem);
        });
    }
});
