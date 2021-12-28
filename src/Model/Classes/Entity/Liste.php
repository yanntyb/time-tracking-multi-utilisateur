<?php

namespace Yanntyb\App\Model\Classes\Entity;

class Liste extends Entity
{
    private User $user;
    private array $items;

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return Liste
     */
    public function setUser(User $user): Liste
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return array
     */
    public function getItems(): array
    {
        return $this->items;
    }

    /**
     * @param array $items
     * @return Liste
     */
    public function setItems(array $items): Liste
    {
        $this->items = $items;
        return $this;
    }



}