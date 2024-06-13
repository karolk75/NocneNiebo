## Instalacja

### Wymagania

- Docker
- Docker Compose

### Kroki

1. Sklonuj repozytorium:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Zbuduj i uruchom kontenery Dockera:

    ```bash
    docker-compose up -d
    ```

3. Aplikacja będzie dostępna pod adresem `http://localhost:80`.

## Pliki i Katalogi

- `src/index.html`: Strona główna aplikacji.
- `src/nightsky.html`: Strona z ustawieniami nocnego nieba.
- `src/star.html`: Strona z detalami gwiazdy.
- `src/css/`: Katalog z plikami CSS dla różnych stron.
- `src/js/`: Katalog z plikami JavaScript obsługującymi logikę frontendu.

## Konfiguracja

Konfiguracja serwera NGINX znajduje się w pliku `nginx.conf`: