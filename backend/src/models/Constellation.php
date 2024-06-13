<?php

class Constellation {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query('SELECT * FROM constellations');
        return $stmt->fetchAll();
    }

    public function get($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM constellations WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function add($data) {
        $stmt = $this->pdo->prepare('INSERT INTO constellations (name, description, image_url) VALUES (?, ?, ?)');
        return $stmt->execute([$data['name'], $data['description'], $data['image_url']]);
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare('UPDATE constellations SET name = ?, description = ?, image_url = ? WHERE id = ?');
        return $stmt->execute([$data['name'], $data['description'], $data['image_url'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare('DELETE FROM constellations WHERE id = ?');
        return $stmt->execute([$id]);
    }

    public function toggleConstellation($id, $status) {
        $stmt = $this->pdo->prepare('UPDATE constellations SET is_on = ? WHERE id = ?');
        return $stmt->execute([$status, $id]);
    }

    public function getStars($id) {
        $stmt = $this->pdo->prepare('
            SELECT s.* FROM stars s
            INNER JOIN constellation_star cs ON s.id = cs.star_id
            WHERE cs.constellation_id = ?
        ');
        $stmt->execute([$id]);
        return $stmt->fetchAll();
    }
}
