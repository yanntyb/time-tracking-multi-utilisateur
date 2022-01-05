<?php

namespace Yanntyb\App\Model\Classes\Entity;

/**
 * Every entity that need id and name in database should extend this classe
 */
class Entity
{
    private int $id;
    private string $name;
    private int $relativeId;

    /**
     * @return int
     */
    public function getRelativeId(): int
    {
        return $this->relativeId;
    }

    /**
     * @param int $relativeId
     * return $this
     */
    public function setRelativeId(int $relativeId): self
    {
        $this->relativeId = $relativeId;
        return $this;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return $this
     */
    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return self
     */
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

}