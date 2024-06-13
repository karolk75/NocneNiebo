<?php
require_once __DIR__ . '/../models/Constellation.php';

class ConstellationController {
    private $model;

    public function __construct($pdo) {
        $this->model = new Constellation($pdo);
    }

    public function getAll() {
        return $this->model->getAll();
    }

    public function get($id) {
        return $this->model->get($id);
    }

    public function add($data) {
        return $this->model->add($data);
    }

    public function update($id, $data) {
        return $this->model->update($id, $data);
    }

    public function delete($id) {
        return $this->model->delete($id);
    }

    public function toggleConstellation($id, $status) {
        return $this->model->toggleConstellation($id, $status);
    }

    public function getStars($id) {
        return $this->model->getStars($id);
    }

    public function getConstellationStars($id) {
        return $this->model->getStars($id);
    }
}
