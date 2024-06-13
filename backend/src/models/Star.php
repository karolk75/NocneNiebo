<?php

class Star {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query('SELECT * FROM stars');
        return $stmt->fetchAll();
    }

    public function get($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM stars WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function add($data) {
        $stmt = $this->pdo->prepare('INSERT INTO stars (name, description, image_url) VALUES (?, ?, ?)');
        return $stmt->execute([$data['name'], $data['description'], $data['image_url']]);
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare('UPDATE stars SET name = ?, description = ?, image_url = ? WHERE id = ?');
        return $stmt->execute([$data['name'], $data['description'], $data['image_url'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare('DELETE FROM stars WHERE id = ?');
        return $stmt->execute([$id]);
    }

    public function assignToConstellation($starId, $constellationId) {
        $stmt = $this->pdo->prepare('INSERT INTO constellation_star (star_id, constellation_id) VALUES (?, ?)');
        return $stmt->execute([$starId, $constellationId]);
    }

    public function removeFromConstellation($starId, $constellationId) {
        $stmt = $this->pdo->prepare('DELETE FROM constellation_star WHERE star_id = ? AND constellation_id = ?');
        return $stmt->execute([$starId, $constellationId]);
    }

    public function toggleStar($id, $status) {
        $stmt = $this->pdo->prepare('UPDATE stars SET is_on = ? WHERE id = ?');
        return $stmt->execute([$status, $id]);
    }

    public function getConstellations($id) {
        $stmt = $this->pdo->prepare('
        SELECT c.* FROM constellations c
        INNER JOIN constellation_star cs ON c.id = cs.constellation_id
        WHERE cs.star_id = ?
    ');
        $stmt->execute([$id]);
        return $stmt->fetchAll();
    }
}
