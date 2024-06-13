<?php
use PHPUnit\Framework\TestCase;

class StarControllerTest extends TestCase {
    private $pdo;
    private $controller;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->exec("CREATE TABLE stars (id INTEGER PRIMARY KEY, name TEXT, description TEXT, image_url TEXT)");

        $this->controller = new StarController($this->pdo);
    }

    public function testAddStar() {
        $star = ['name' => 'Test Star', 'description' => 'A test star', 'image_url' => 'https://example.com/star.jpg'];
        $result = $this->controller->addStar($star);

        $this->assertTrue($result);

        $stmt = $this->pdo->query('SELECT * FROM stars WHERE name = "Test Star"');
        $fetchedStar = $stmt->fetch();

        $this->assertEquals('Test Star', $fetchedStar['name']);
    }

    // Add more tests for other methods
}
