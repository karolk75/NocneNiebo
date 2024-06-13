<?php
require_once 'config/database.php';
require_once 'controllers/StarController.php';
require_once 'controllers/ConstellationController.php';
require_once 'controllers/NightSkyController.php';

header('Content-Type: application/json');

$starController = new StarController($pdo);
$constellationController = new ConstellationController($pdo);
$nightSkyController = new NightSkyController($pdo);

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

error_log("Request method: $request_method, Request URI: $request_uri");

switch ($request_method) {
    case 'GET':
        if (preg_match('/\/stars\/?$/', $request_uri)) {
            $stars = $starController->getAllStars();
            echo json_encode($stars);
        } elseif (preg_match('/\/stars\/(\d+)$/', $request_uri, $matches)) {
            $star = $starController->getStar($matches[1]);
            echo json_encode($star);
        } elseif (preg_match('/\/stars\/(\d+)\/constellations$/', $request_uri, $matches)) {
            $constellations = $starController->getStarConstellations($matches[1]);
            echo json_encode($constellations);
        } elseif (preg_match('/\/constellations\/?$/', $request_uri)) {
            $constellations = $constellationController->getAll();
            echo json_encode($constellations);
        } elseif (preg_match('/\/constellations\/(\d+)$/', $request_uri, $matches)) {
            $constellation = $constellationController->get($matches[1]);
            echo json_encode($constellation);
        } elseif (preg_match('/\/constellations\/(\d+)\/stars$/', $request_uri, $matches)) {
            $stars = $constellationController->getStars($matches[1]);
            echo json_encode($stars);
        } elseif (preg_match('/\/nightsky\/?$/', $request_uri)) {
            $nightSky = $nightSkyController->getNightSky();
            echo json_encode($nightSky);
        }
        break;

    case 'POST':
        if (preg_match('/\/stars\/?$/', $request_uri)) {
            $data = json_decode(file_get_contents('php://input'), true);
            $starController->addStar($data);
            echo json_encode(['message' => 'Star added successfully']);
        } elseif (preg_match('/\/constellations\/?$/', $request_uri)) {
            $data = json_decode(file_get_contents('php://input'), true);
            $constellationController->add($data);
            echo json_encode(['message' => 'Constellation added successfully']);
        } elseif (preg_match('/\/stars\/(\d+)\/assign\/(\d+)$/', $request_uri, $matches)) {
            $starController->assignToConstellation($matches[1], $matches[2]);
            echo json_encode(['message' => 'Star assigned to constellation']);
        } elseif (preg_match('/\/stars\/(\d+)\/toggle$/', $request_uri, $matches)) {
            $data = json_decode(file_get_contents('php://input'), true);
            $starController->toggleStar($matches[1], $data['is_on']);
            echo json_encode(['message' => 'Star status updated']);
        } elseif (preg_match('/\/constellations\/(\d+)\/toggle$/', $request_uri, $matches)) {
            $data = json_decode(file_get_contents('php://input'), true);
            $constellationController->toggleConstellation($matches[1], $data['is_on']);
            echo json_encode(['message' => 'Constellation status updated']);
        } elseif (preg_match('/\/nightsky\/?$/', $request_uri)) {
            $data = json_decode(file_get_contents('php://input'), true);
            $nightSkyController->updateNightSky($data);
            echo json_encode(['message' => 'Night sky updated successfully']);
        }
        break;

    case 'PUT':
        if (preg_match('/\/stars\/(\d+)$/', $request_uri, $matches)) {
            $data = json_decode(file_get_contents('php://input'), true);
            $starController->updateStar($matches[1], $data);
            echo json_encode(['message' => 'Star updated successfully']);
        } elseif (preg_match('/\/constellations\/(\d+)$/', $request_uri, $matches)) {
            $data = json_decode(file_get_contents('php://input'), true);
            $constellationController->update($matches[1], $data);
            echo json_encode(['message' => 'Constellation updated successfully']);
        }
        break;

    case 'DELETE':
        if (preg_match('/\/stars\/(\d+)$/', $request_uri, $matches)) {
            $starController->deleteStar($matches[1]);
            echo json_encode(['message' => 'Star deleted successfully']);
        } elseif (preg_match('/\/constellations\/(\d+)$/', $request_uri, $matches)) {
            $constellationController->delete($matches[1]);
            echo json_encode(['message' => 'Constellation deleted successfully']);
        } elseif (preg_match('/\/stars\/(\d+)\/remove\/(\d+)$/', $request_uri, $matches)) {
            $starController->removeFromConstellation($matches[1], $matches[2]);
            echo json_encode(['message' => 'Star removed from constellation']);
        }
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
