<div id="main">
</div>
<script>
    let listes = [];
    let items = [];
    <?php

    use Yanntyb\App\Model\Classes\Entity\Item;
    use Yanntyb\App\Model\Classes\Entity\Liste;

    /**
     * @var Liste $liste
     */
    foreach ($var["listes"] as $liste){
        ?>
        items = [];
        <?php
        /**
         * @var Item $item
         */
        foreach ($liste->getItems() as $item){?>
            items.push(
                {
                    name: "<?=$item->getName()?>",
                    timer: <?=$item->getTimer()?>,
                    lastAction: "<?=$item->getStartedAt()?>",
                    id: <?=$item->getRelativeId()?>
                }
            );
        <?php
        }
        ?>
        listes[<?= $liste->getId() ?>] =
            {
                title: "<?=$liste->getName()?>",
                child: items,
                startedAt: "<?=$liste->getStartedAt()?>",
                id: <?= $liste->getId() ?>
            };
    <?php
    }
    ?>
</script>
<script src="build/js/main.js"></script>
<script src="https://kit.fontawesome.com/78e483bd6f.js" crossorigin="anonymous"></script>