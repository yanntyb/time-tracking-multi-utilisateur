<?php

namespace Yanntyb\App\Model\Classes\Entity;


class Item extends Entity
{
    private string $startedAt;
    private int $timer;
    private int $liste_id;

    /**
     * @return string
     */
    public function getStartedAt(): string
    {
        return $this->startedAt;
    }

    /**
     * @param string $startedAt
     * @return Item
     */
    public function setStartedAt(string $startedAt): Item
    {
        $this->startedAt = $startedAt;
        return $this;
    }

    /**
     * @return int
     */
    public function getTimer(): int
    {
        return $this->timer;
    }

    /**
     * @param int $timer
     * @return Item
     */
    public function setTimer(int $timer): Item
    {
        $this->timer = $timer;
        return $this;
    }

    /**
     * @return int
     */
    public function getListeId(): int
    {
        return $this->liste_id;
    }

    /**
     * @param int $liste_id
     * @return Item
     */
    public function setListeId(int $liste_id): Item
    {
        $this->liste_id = $liste_id;
        return $this;
    }


}