<?php

class NightSky {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function get() {
        $stmt = $this->pdo->query('SELECT * FROM night_sky ORDER BY id DESC LIMIT 1');
        return $stmt->fetch();
    }

    public function update($data) {
        $stmt = $this->pdo->prepare('INSERT INTO night_sky (cloud_level, moon_phase, precipitation, fog_level) VALUES (?, ?, ?, ?)');
        return $stmt->execute([$data['cloud_level'], $data['moon_phase'], $data['precipitation'], $data['fog_level']]);
    }
}
