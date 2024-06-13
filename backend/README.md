# Backend Nocnego Nieba

Ten projekt to backend do zarządzania obserwacjami nocnego nieba, w tym konstelacjami, gwiazdami i warunkami nocnego nieba. Jest zbudowany z użyciem PHP i MySQL, a także konteneryzowany za pomocą Dockera.


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

4. Uruchom skrypt SQL, aby skonfigurować bazę danych:

    ```bash
    docker exec -i <mysql-container-id> mysql -uuser -ppassword nocne_niebo < sql.sql
    ```

## Konfiguracja

Konfiguracja bazy danych znajduje się w pliku `src/config/database.php`:

```php
<?php
$host = 'db';
$db = 'nocne_niebo';
$user = 'user';
$pass = 'password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
```

## Punkty Końcowe API

### Gwiazdy

- `GET /stars`: Pobierz wszystkie gwiazdy.
- `GET /stars/{id}`: Pobierz konkretną gwiazdę według ID.
- `POST /stars`: Dodaj nową gwiazdę.
- `PUT /stars/{id}`: Zaktualizuj istniejącą gwiazdę.
- `DELETE /stars/{id}`: Usuń gwiazdę.
- `POST /stars/{id}/assign/{constellationId}`: Przypisz gwiazdę do konstelacji.
- `DELETE /stars/{id}/remove/{constellationId}`: Usuń gwiazdę z konstelacji.
- `POST /stars/{id}/toggle`: Przełącz status gwiazdy.
- `GET /stars/{id}/constellations`: Pobierz konstelacje dla konkretnej gwiazdy.

### Konstelacje

- `GET /constellations`: Pobierz wszystkie konstelacje.
- `GET /constellations/{id}`: Pobierz konkretną konstelację według ID.
- `POST /constellations`: Dodaj nową konstelację.
- `PUT /constellations/{id}`: Zaktualizuj istniejącą konstelację.
- `DELETE /constellations/{id}`: Usuń konstelację.
- `POST /constellations/{id}/toggle`: Przełącz status konstelacji.
- `GET /constellations/{id}/stars`: Pobierz gwiazdy dla konkretnej konstelacji.

### Nocne Niebo

- `GET /nightsky`: Pobierz aktualne warunki nocnego nieba.
- `POST /nightsky`: Zaktualizuj warunki nocnego nieba.

