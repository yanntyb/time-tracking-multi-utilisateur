<div id="main">
<?php

use Yanntyb\App\Model\Classes\Entity\Item;
use Yanntyb\App\Model\Classes\Entity\Liste;

/**
 * @var Liste $liste
 */
foreach ($var["listes"] as $liste){?>
        <div class="list">
            <h1><?= $liste->getName() ?></h1>
            <div class="content">
                <div class="timer">
                    <div class="elapsed"><div><i class="far fa-clock"></i></div><span>00:00:00</span></div>
                    <div class="startedAt"><div><i class="far fa-calendar-alt"></i></div><span>Il ya </span></div>
                </div>
                <div class="work">
                    <?php
                    /**
                     * @var Item $item
                     */
                    foreach ($liste->getItems() as $item){?>
                        <div class="item">
                            <div>
                                <span><?= $item->getName() ?></span>
                            </div>
                            <div class="lastAction"></div>
                            <div class="time"><?= $item->getTimer() ?></div>
                            <i data-id="<?= $item->getId() ?>" class="timer fas fa-stopwatch"></i>
                            <i class="delete fas fa-trash">
                        </div><?php
                    }
                    ?>
                </div>
            </div>
            <div class="action"><i class="delete fas fa-trash"></i><i class="expand fas fa-eye"></i><span class="addWork">+ Ajouter une tâche</span></div>
        </div>
    <?php
    }
?>
</div>
<script src="build/js/main.js"></script>
<script src="https://kit.fontawesome.com/78e483bd6f.js" crossorigin="anonymous"></script>