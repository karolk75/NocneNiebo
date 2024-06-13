<?php
use PHPUnit\Framework\TestCase;

class ConstellationControllerTest extends TestCase {
    private $pdo;
    private $controller;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->exec("CREATE TABLE constellations (id INTEGER PRIMARY KEY, name TEXT, description TEXT, image_url TEXT)");

        $this->controller = new ConstellationController($this->pdo);
    }

    public function testAddConstellation() {
        $constellation = ['name' => 'Test Constellation', 'description' => 'A test constellation', 'image_url' => 'https://example.com/constellation.jpg'];
        $result = $this->controller->add($constellation);

        $this->assertTrue($result);

        $stmt = $this->pdo->query('SELECT * FROM constellations WHERE name = "Test Constellation"');
        $fetchedConstellation = $stmt->fetch();

        $this->assertEquals('Test Constellation', $fetchedConstellation['name']);
    }

    // Add more tests for other methods
}
