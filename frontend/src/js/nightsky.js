document.addEventListener('DOMContentLoaded', () => {
    const nightSkyForm = document.getElementById('nightSkyForm');

    // Pobierz i wyświetl ustawienia nocnego nieba
    fetch('/api/nightsky')
        .then(response => response.json())
        .then(data => {
            document.getElementById('cloudLevel').value = data.cloud_level;
            document.getElementById('moonPhase').value = data.moon_phase;
            document.getElementById('precipitation').value = data.precipitation;
            document.getElementById('fogLevel').value = data.fog_level;
            updateBackground(data);
        })
        .catch(error => console.error('Błąd podczas pobierania ustawień nocnego nieba:', error));

    // Zaktualizuj ustawienia nocnego nieba
    nightSkyForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(nightSkyForm);
        const nightSkyData = {
            cloud_level: formData.get('cloudLevel'),
            moon_phase: formData.get('moonPhase'),
            precipitation: formData.get('precipitation'),
            fog_level: formData.get('fogLevel')
        };

        if (nightSkyData.cloud_level == 0 && nightSkyData.precipitation) {
            alert('Przy czystym niebie nie mogą wystąpić opady!');
            return;
        }

        fetch('/api/nightsky', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nightSkyData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Nocne niebo zaktualizowane pomyślnie:', data);
                updateBackground(nightSkyData);
            })
            .catch(error => console.error('Błąd podczas aktualizacji nocnego nieba:', error));
    });
});

// Update background based on night sky settings
function updateBackground(data) {

    // Add cloud level
    setUpClouds(data.cloud_level)

    // Add moon phase
    switch (data.moon_phase) {
        case 'New Moon':
            setMoonRotation(0)
            break;
        case 'First Quarter':
            setMoonRotation(270)
            break;
        case 'Last Quarter':
            setMoonRotation(90)
            break;
        case 'Full Moon':
            setMoonRotation(180)
            break;
    }

    // Add fog level
    createFogArray(data.fog_level/10);

    switch(data.precipitation) {
        case '':
            stopRain()
            break;
        case 'rain':
            makeItRain()
            break;

    }
}

const setMoonRotation = deg => {
    document.querySelector('.divider').style.transform = `rotate3d(0, 1, 0, ${deg}deg)`

    const hemispheres = document.querySelectorAll('.hemisphere')

    if (deg < 180) {
        // Left
        hemispheres[0].classList.remove('dark')
        hemispheres[0].classList.add('light')

        hemispheres[1].classList.add('dark')
        hemispheres[1].classList.remove('light')
    } else {
        hemispheres[0].classList.add('dark')
        hemispheres[0].classList.remove('light')

        hemispheres[1].classList.remove('dark')
        hemispheres[1].classList.add('light')
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

var makeItRain = function() {
    stopRain()

    var increment = 0;
    var drops = "";

    while (increment < 100) {
        // couple random numbers to use for various randomizations
        // random number between 98 and 1
        var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
        // random number between 5 and 2
        var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
        // increment
        increment += randoFiver;
        // add in a new raindrop with various randomizations to certain CSS properties
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    document.querySelector('.rain.front-row').innerHTML = drops;
}

var stopRain = function() {
    // clear out everything
    document.querySelectorAll('.rain').forEach(function(rain) {
        rain.innerHTML = '';
    });
}

var setUpClouds = count => {
    var clouds = "";

    for (let i = 0; i < count; i++) {
        clouds += '<div class="cloud"></div>'
    }

    document.querySelector('.clouds').innerHTML = clouds

}

let canvas = document.getElementById("canvas");
class Fog {
    constructor(x, y, tamanho, direction, velocity, foglevel) {
        this.x = x;
        this.y = y;
        this.width = tamanho.w;
        this.height = tamanho.h;
        this.me = document.createElement("div");
        this.direction = direction;
        this.velocity = velocity;
        this.foglevel = foglevel;
    }
    create() {
        this.me.style.width = this.width + "px";
        this.me.style.height = this.height + "px";
        this.me.style.backgroundColor = "#b3b8bb";
        this.me.style.position = "absolute";
        this.me.style.opacity = this.foglevel;
        this.me.style.filter = "blur(40px)";
        canvas.appendChild(this.me);
        this.me.style.borderRadius = "120%";
    }
    animation() {
        this.me.style.left = this.x + "px";
        this.me.style.top = this.y + "px";
        switch (this.direction) {
            case 0:
                this.x -= this.velocity;
                if (this.x + this.width < 0) {
                    this.x = canvas.clientWidth + this.width;
                }
                break;
            case 1:
                this.x += this.velocity;
                if (this.x + this.width > canvas.width) {
                    this.me.style.left = -this.width + "px";
                }
                break;
        }
    }
}
let animationFrameId;

function CreateNeb() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    array?.forEach((ele) => {
        ele.create();
        ele.animation();
    });
    animationFrameId = requestAnimationFrame(CreateNeb);
}

let array = [];

function createFogArray(foglevel) {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }

    array = [
        new Fog(200, 200, { w: 200, h: 200 }, 0, 0.5, foglevel),
        new Fog(600, 120, { w: 100, h: 150 }, 0, 0.6, foglevel),
        new Fog(70, 140, { w: 230, h: 210 }, 0, 0.7, foglevel),
        new Fog(600, 20, { w: 40, h: 30 }, 0, 0.4, foglevel),
        new Fog(300, 200, { w: 200, h: 200 }, 0, 0.5, foglevel),
        new Fog(400, 120, { w: 70, h: 90 }, 0, 0.6, foglevel),
        new Fog(10, 140, { w: 230, h: 210 }, 0, 0.7, foglevel),
        new Fog(0, 20, { w: 100, h: 100 }, 0, 0.6, foglevel)
    ];
    CreateNeb();
}


