# Projekt Nocne Niebo

Projekt Nocne Niebo to aplikacja webowa do zarządzania obserwacjami nocnego nieba, w tym konstelacjami, gwiazdami i warunkami nocnego nieba. Projekt składa się z backendu zbudowanego w PHP i MySQL oraz frontendu zbudowanego z użyciem HTML, CSS i JavaScript. Aplikacja jest konteneryzowana za pomocą Dockera.

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

3. Aplikacja będzie dostępna pod następującymi adresami:
    - Backend: `http://localhost:8080`
    - PhpMyAdmin: `http://localhost:8081`
    - Frontend: `http://localhost:8082`

4. Uruchom skrypt SQL, aby skonfigurować bazę danych:

    ```bash
    docker exec -i <mysql-container-id> mysql -uuser -ppassword nocne_niebo < backend/sql.sql
    ```

## Dokumentacja

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

## Licencja

Ten projekt jest licencjonowany na podstawie licencji MIT. Szczegóły znajdują się w pliku LICENSE.
