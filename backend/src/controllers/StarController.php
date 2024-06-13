<?php
require_once __DIR__ . '/../models/Star.php';

class StarController {
    private $model;

    public function __construct($pdo) {
        $this->model = new Star($pdo);
    }

    public function getAllStars() {
        return $this->model->getAll();
    }

    public function getStar($id) {
        return $this->model->get($id);
    }

    public function addStar($data) {
        return $this->model->add($data);
    }

    public function updateStar($id, $data) {
        return $this->model->update($id, $data);
    }

    public function deleteStar($id) {
        return $this->model->delete($id);
    }

    public function assignToConstellation($starId, $constellationId) {
        return $this->model->assignToConstellation($starId, $constellationId);
    }

    public function removeFromConstellation($starId, $constellationId) {
        return $this->model->removeFromConstellation($starId, $constellationId);
    }

    public function toggleStar($id, $status) {
        return $this->model->toggleStar($id, $status);
    }

    public function getStarConstellations($id) {
        return $this->model->getConstellations($id);
    }
}
