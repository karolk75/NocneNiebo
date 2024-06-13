document.addEventListener('DOMContentLoaded', () => {
    const starsDiv = document.getElementById('stars');
    const constellationsDiv = document.getElementById('constellations');
    const addStarForm = document.getElementById('addStarForm');
    const editStarForm = document.getElementById('editStarForm');
    const addConstellationForm = document.getElementById('addConstellationForm');
    const assignStarForm = document.getElementById('assignStarForm');
    const editStarTitle = document.getElementById('editStarTitle');
    const nightSkyForm = document.getElementById('nightSkyForm');

    // Fetch and display stars
    fetch('/api/stars')
        .then(response => response.json())
        .then(data => {
            data.forEach(star => {
                const starDiv = document.createElement('div');
                starDiv.className = star.is_on ? 'star active' : 'star inactive';

                starDiv.innerHTML = `
                    <h2><a href="star.html?id=${star.id}">${star.name}</a></h2>
                    <p>${star.description}</p>
                    <img src="${star.image_url}" alt="${star.name}">
                    <button onclick="editStar(${star.id}, '${star.name}', '${star.description}', '${star.image_url}')">Edytuj</button>
                    <button class="delete" onclick="deleteStar(${star.id})">Usuń</button>
                    <button onclick="toggleStar(${star.id}, ${star.is_on ? 0 : 1})">${star.is_on ? 'Wyłącz' : 'Włącz'}</button>
                    <button onclick="showAssignForm(${star.id})">Przypisz do konstelacji</button>
                `;
                starsDiv.appendChild(starDiv);
            });
        })
        .catch(error => console.error('Błąd podczas pobierania gwiazd:', error));

    // Fetch and display constellations
    fetch('/api/constellations')
        .then(response => response.json())
        .then(data => {
            data.forEach(constellation => {
                const constellationDiv = document.createElement('div');
                constellationDiv.className = constellation.is_on ? 'constellation active' : 'constellation inactive';
                constellationDiv.innerHTML = `
                    <h2>${constellation.name}</h2>
                    <p>${constellation.description}</p>
                    <img src="${constellation.image_url}" alt="${constellation.name}">
                    <button onclick="editConstellation(${constellation.id}, '${constellation.name}', '${constellation.description}', '${constellation.image_url}')">Edytuj</button>
                    <button class="delete" onclick="deleteConstellation(${constellation.id})">Usuń</button>
                    <button onclick="toggleConstellation(${constellation.id}, ${constellation.is_on ? 0 : 1})">${constellation.is_on ? 'Wyłącz' : 'Włącz'}</button>
                `;
                constellationsDiv.appendChild(constellationDiv);
            });
        })
        .catch(error => console.error('Błąd podczas pobierania konstelacji:', error));

    // Add new star with validation
    addStarForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(addStarForm);
        const starData = {
            name: formData.get('name'),
            description: formData.get('description'),
            image_url: formData.get('image_url')
        };

        if (!validateStarData(starData)) {
            alert('Proszę poprawnie wypełnić wszystkie pola.');
            return;
        }

        fetch('/api/stars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(starData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Gwiazda została pomyślnie dodana:', data);
                addStarForm.reset();
                location.reload();
            })
            .catch(error => console.error('Błąd podczas dodawania gwiazdy:', error));
    });

    // Add new constellation with validation
    addConstellationForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(addConstellationForm);
        const constellationData = {
            name: formData.get('name'),
            description: formData.get('description'),
            image_url: formData.get('image_url')
        };

        if (!validateConstellationData(constellationData)) {
            alert('Proszę poprawnie wypełnić wszystkie pola.');
            return;
        }

        fetch('/api/constellations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(constellationData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Konstelacja została pomyślnie dodana:', data);
                addConstellationForm.reset();
                location.reload();
            })
            .catch(error => console.error('Błąd podczas dodawania konstelacji:', error));
    });

    // Edit star
    editStarForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(editStarForm);
        const starData = {
            id: formData.get('id'),
            name: formData.get('name'),
            description: formData.get('description'),
            image_url: formData.get('image_url')
        };

        if (!validateStarData(starData)) {
            alert('Proszę poprawnie wypełnić wszystkie pola.');
            return;
        }

        fetch(`/api/stars/${starData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(starData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Gwiazda została pomyślnie zaktualizowana:', data);
                editStarForm.reset();
                editStarForm.classList.add('hidden');
                editStarTitle.classList.add('hidden');
                addStarForm.classList.remove('hidden');
                location.reload();
            })
            .catch(error => console.error('Błąd podczas edytowania gwiazdy:', error));
    });

    // Assign star to constellation
    assignStarForm.addEventListener('submit', event => {
        event.preventDefault();

        const starId = document.getElementById('assignStarId').value;
        const constellationId = document.getElementById('constellationSelect').value;

        fetch(`/api/stars/${starId}/assign/${constellationId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Gwiazda została pomyślnie przypisana do konstelacji:', data);
                assignStarForm.reset();
                document.getElementById('assignStarForm').classList.add('hidden');
                location.reload();
            })
            .catch(error => console.error('Błąd podczas przypisywania gwiazdy do konstelacji:', error));
    });
});

// Show assign form
function showAssignForm(starId) {
    document.getElementById('assignStarId').value = starId;
    document.getElementById('assignStarForm').classList.remove('hidden');
    document.getElementById('assignStarTitle').classList.remove('hidden');

    document.getElementById('addStarForm').classList.add('hidden');
    document.getElementById('addStarLabel').classList.add('hidden');

    // Fetch constellations for dropdown
    fetch('/api/constellations')
        .then(response => response.json())
        .then(data => {
            const constellationSelect = document.getElementById('constellationSelect');
            constellationSelect.innerHTML = ''; // Clear previous options
            data.forEach(constellation => {
                const option = document.createElement('option');
                option.value = constellation.id;
                option.textContent = constellation.name;
                constellationSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Błąd podczas pobierania konstelacji:', error));
}

// Validate star data
function validateStarData(data) {
    return data.name && data.description && isValidUrl(data.image_url);
}

// Validate constellation data
function validateConstellationData(data) {
    return data.name && data.description && isValidUrl(data.image_url);
}

// Validate URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

// Edit star function
function editStar(id, name, description, imageUrl) {
    document.getElementById('editStarId').value = id;
    document.getElementById('editStarName').value = name;
    document.getElementById('editStarDescription').value = description;
    document.getElementById('editStarImageUrl').value = imageUrl;

    document.getElementById('editStarForm').classList.remove('hidden');
    document.getElementById('editStarTitle').classList.remove('hidden');
    document.getElementById('addStarForm').classList.add('hidden');
    document.getElementById('addStarLabel').classList.add('hidden');
}

function cancelAddStar() {
    document.getElementById('addStarForm').reset();
}

// Cancel edit function
function cancelEditStar() {
    document.getElementById('editStarForm').reset();
    document.getElementById('editStarForm').classList.add('hidden');
    document.getElementById('editStarTitle').classList.add('hidden');
    document.getElementById('addStarForm').classList.remove('hidden');
    document.getElementById('addStarLabel').classList.remove('hidden');
}

function cancelAssignStar() {
    document.getElementById('assignStarForm').reset();
    document.getElementById('assignStarForm').classList.add('hidden');
    document.getElementById('assignStarTitle').classList.add('hidden');
    document.getElementById('addStarForm').classList.remove('hidden');
    document.getElementById('addStarLabel').classList.remove('hidden');
}

// Delete star function
function deleteStar(id) {
    const isConfirmed = confirm("Czy na pewno chcesz usunąć tę gwiazdę?");
    if (isConfirmed) {
        fetch(`/api/stars/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Gwiazda została pomyślnie usunięta:', data);
                location.reload();
            })
            .catch(error => console.error('Błąd podczas usuwania gwiazdy:', error));
    } else {
        console.log('Usunięcie gwiazdy zostało anulowane.');
    }
}

// Toggle star function
function toggleStar(id, status) {
    fetch(`/api/stars/${id}/toggle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_on: status })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Status gwiazdy został pomyślnie zaktualizowany:', data);
            location.reload();
        })
        .catch(error => console.error('Błąd podczas przełączania stanu gwiazdy:', error));
}

// Toggle constellation function
function toggleConstellation(id, status) {
    fetch(`/api/constellations/${id}/toggle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_on: status })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Status konstelacji został pomyślnie zaktualizowany:', data);
            location.reload();
        })
        .catch(error => console.error('Błąd podczas przełączania stanu konstelacji:', error));
}

// Edit constellation function
function editConstellation(id, name, description, imageUrl) {
    document.getElementById('editConstellationId').value = id;
    document.getElementById('editConstellationName').value = name;
    document.getElementById('editConstellationDescription').value = description;
    document.getElementById('editConstellationImageUrl').value = imageUrl;

    document.getElementById('editConstellationForm').classList.remove('hidden');
    document.getElementById('editConstellationTitle').classList.remove('hidden');
    document.getElementById('addConstellationForm').classList.add('hidden');
    document.getElementById('addConstellationLabel').classList.add('hidden');
}

function cancelAddConstellation() {
    document.getElementById('addConstellationForm').reset();
}

function cancelEditConstellation() {
    document.getElementById('editConstellationForm').reset();
    document.getElementById('editConstellationForm').classList.add('hidden');
    document.getElementById('editConstellationTitle').classList.add('hidden');
    document.getElementById('addConstellationForm').classList.remove('hidden');
    document.getElementById('addConstellationLabel').classList.remove('hidden');
}

// Delete constellation function
function deleteConstellation(id) {
    const isConfirmed = confirm("Czy na pewno chcesz usunąć tę konstelację?");
    if (isConfirmed) {
        fetch(`/api/constellations/${id}/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({is_on: status})
        })
            .then(response => response.json())
            .then(data => {
                console.log('Status konstelacji został pomyślnie zaktualizowany:', data);
                location.reload();
            })
            .catch(error => console.error('Błąd podczas przełączania stanu konstelacji:', error));
    } else {
        console.log('Usunięcie konstelacji zostało anulowane.');
    }
}

const getStar = () => {
    const x = Math.round(Math.random() * 100)
    const y = Math.round(Math.random() * 100)

    return `
    radial-gradient(circle at ${x}% ${y}%, 
    rgba(255,255,255,1) 0%, 
    rgba(11,14,58,1) 3px, 
    rgba(11,14,58,0) 5px, 
    rgba(11,14,58,0) 100%) no-repeat border-box
  `
}

document.body.style.background = [...Array(100)].map(() => getStar()).join(', ')


