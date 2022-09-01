<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220831134748 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment ADD user_id INT NOT NULL, ADD location_id INT NOT NULL, DROP user');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F84464D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('CREATE INDEX IDX_FE38F844A76ED395 ON appointment (user_id)');
        $this->addSql('CREATE INDEX IDX_FE38F84464D218E ON appointment (location_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844A76ED395');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F84464D218E');
        $this->addSql('DROP INDEX IDX_FE38F844A76ED395 ON appointment');
        $this->addSql('DROP INDEX IDX_FE38F84464D218E ON appointment');
        $this->addSql('ALTER TABLE appointment ADD user VARCHAR(255) NOT NULL, DROP user_id, DROP location_id');
    }
}
