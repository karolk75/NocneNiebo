document.addEventListener('DOMContentLoaded', () => {
    const starDetailsDiv = document.getElementById('starDetails');
    const params = new URLSearchParams(window.location.search);
    const starId = params.get('id');

    if (starId) {
        fetch(`/api/stars/${starId}`)
            .then(response => response.json())
            .then(star => {
                const starDiv = document.createElement('div');
                starDiv.innerHTML = `
                    <h2>${star.name}</h2>
                    <p>Opis: ${star.description}</p>
                    <img src="${star.image_url}" alt="${star.name}">
                `;
                starDetailsDiv.appendChild(starDiv);

                // Pobierz i wyświetl konstelacje związane z gwiazdą
                fetch(`/api/stars/${starId}/constellations`)
                    .then(response => response.json())
                    .then(star_constellations => {
                        let constellationInfo = document.createElement('div');
                        constellationInfo.className = 'constellation-info';
                        if (star_constellations.length > 0) {
                            constellationInfo.innerHTML = "<p>Przypisane do konstelacji:</p><ul>";
                            star_constellations.forEach(constellation => {
                                constellationInfo.innerHTML += `<li>${constellation.name}</li>`;
                            });
                            constellationInfo.innerHTML += "</ul>";
                        } else {
                            constellationInfo.innerHTML = '<p>Nie przypisano do żadnej konstelacji</p>';
                        }

                        starDetailsDiv.appendChild(constellationInfo);
                    })
                    .catch(error => console.error('Błąd podczas pobierania konstelacji gwiazdy:', error));
            })
            .catch(error => console.error('Błąd podczas pobierania szczegółów gwiazdy:', error));
    } else {
        starDetailsDiv.innerHTML = '<p>Nie wybrano gwiazdy.</p>';
    }
});
