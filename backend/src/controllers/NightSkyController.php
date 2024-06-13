<?php
require_once __DIR__ . '/../models/NightSky.php';

class NightSkyController {
    private $model;

    public function __construct($pdo) {
        $this->model = new NightSky($pdo);
    }

    public function getNightSky() {
        return $this->model->get();
    }

    public function updateNightSky($data) {
        return $this->model->update($data);
    }
}
