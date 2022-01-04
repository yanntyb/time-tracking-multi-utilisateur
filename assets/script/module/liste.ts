import {Item} from "./item";

interface dataObj {
    title: string,
    child?: {
        name: string,
        timer: number,
        lastAction: Date,
    }[],
    startedAt: Date,
    initialized?: boolean,
}

class List{
    private readonly div: HTMLElement;
    private child: Item[];
    private id: number;

    constructor(private parentElement: HTMLDivElement, private data: dataObj, id: number) {
        this.div = document.createElement("div") as HTMLElement;
        this.child = [];
        this.id = id;
        if(this.data.initialized){
            this.data.startedAt = new Date(this.data.startedAt);
        }
        this.init();
    }

    //Create dom
    private createDom(){
        this.parentElement.appendChild(this.div);
        this.div.classList.add('list');
        this.div.innerHTML =
            `
            <h1>${this.data.title}</h1>
            <div class="content">
                <div class="timer">
                    <div class="elapsed"><div><i class="far fa-clock"></i></div><span>00:00:00</span></div>
                    <div class="startedAt"><div><i class="far fa-calendar-alt"></i></div><span>Il ya ${this.calculateStartedAt()} jours</span></div>
                </div>
                <div class="work"></div>
            </div>
            <div class="action"><i class="delete fas fa-trash"></i><i class="expand fas fa-eye"></i><span class="addWork">+ Ajouter une tâche</span></div>
            `;

        const workDiv = this.div.querySelector(".work") as HTMLElement;

        //Add item
        const add = this.div.querySelector(".addWork") as HTMLElement;
        add.addEventListener("click", () => {
            const item = new Item(workDiv,"",0, this.child.length,new Date,this.id);
            this.child.push(item);
            this.setTimer();
        })

        //Remove list
        const remove = this.div.querySelector(".delete") as HTMLElement;
        remove.addEventListener("click", () => {
            console.log(this.id);
            const req = new XMLHttpRequest();
            req.open("POST", "/removeList");
            req.onload = () => {
                for(let child of this.child){
                    child.div.remove();
                }
                this.div.remove();
            }
            req.send(JSON.stringify({"id": this.id}));
        })

        //Expand
        let expanded = false;
        const expand = this.div.querySelector(".expand") as HTMLElement;
        expand.addEventListener("click", () => {
            if(!expanded){
                this.div.id = "expand";
            }
            else{
                this.div.id = '';
            }
            expanded = !expanded;
        })
    }

    //Return day between started time and now
    private calculateStartedAt(){
        const now = (new Date()).getTime();
        const before = this.data.startedAt.getTime()
        return Math.ceil(Math.abs(now - before) / (1000 * 3600 * 24));
    }

    private setTimer(){
        for(let item of this.child){
            console.log(item);
            //Remove Event listener
            let timer = item.div.querySelector(".timer") as HTMLElement;
            const elClone = timer.cloneNode(true);
            const parentNode = timer.parentNode as HTMLElement;
            parentNode.replaceChild(elClone, timer);

            //Set event on timer click
            timer = item.div.querySelector(".timer") as HTMLElement;
            timer.addEventListener("click",(e: MouseEvent) => {
                this.event(e, this)
            });
        }
    }

    //Change dataset of child element to start the timer of this one
    private event(e: MouseEvent,_this: List){
        const target = e.currentTarget as HTMLElement;
        if(target.dataset.on === "true"){
            target.style.color = "green";
            target.dataset.on = "false";
            const timers = this.parentElement.querySelectorAll(".timer") as NodeListOf<HTMLElement>;
            for(let child of _this.child){
                for(let timer of timers){
                    //Set last action (new Date()) on triggered item
                    if(timer === target){
                        child.lastAction = new Date();
                        child.drawLastAction();
                        child.drawTime();
                    }
                }
            }
        }
        else {
            //Reset every timer
            const timers = this.parentElement.querySelectorAll(".timer") as NodeListOf<HTMLElement>;
            for(let child of _this.child){

                for(let timer of timers){
                    if(timer !== target){
                        timer.style.color = "green";
                        timer.dataset.on = "false"
                    }
                    //Set last action (new Date()) on triggered item
                    if(timer === target){
                        child.lastAction = new Date();
                        child.drawLastAction();
                        child.drawTime();
                    }
                }
            }
            target.style.color = "red";
            target.dataset.on = "true";

        }
    }

    //Interval to calculate the time of all item of the liste and draw it
    drawTimer(){
        const timerFunc = () => {
            window.setTimeout(() => {
                for(let item of this.child){
                    const timer = item.div.querySelector(".timer") as HTMLElement;
                    if(timer.dataset.on === "true"){
                        item.time += 1;
                    }
                }
                const timer = this.div.querySelector(".elapsed span") as HTMLElement;
                let allItemTime = 0;
                for(let item of this.child){
                    allItemTime += item.time;
                }

                let h = Math.floor(allItemTime / 3600).toString().padStart(2,'0'),
                    m = Math.floor(allItemTime % 3600 / 60).toString().padStart(2,'0'),
                    s = Math.floor(allItemTime % 60).toString().padStart(2,'0');
                if(parseInt(h) < 24){
                    timer.innerHTML = `${h}:${m}:${s}`;
                }
                else {
                    timer.innerHTML = `${h} H`;
                }

                let childObject: any[] = [];
                for(let child of this.child){
                    childObject.push({
                        name: child.title,
                        timer: child.time,
                        lastAction: child.lastAction
                    })
                }
                let currentStorage = JSON.parse(localStorage.getItem("listes") as string);
                currentStorage[this.id].child = childObject;
                localStorage.setItem("listes", JSON.stringify(currentStorage))

                timerFunc();
            },1000)
        }
        timerFunc();
    }

    private toStorage() {
        let currentStorage = JSON.parse(localStorage.getItem("listes") as string);
        const id = this.id
        if(currentStorage === null){
            currentStorage = {
                [this.id]: {
                    title: this.data.title,
                    child: {},
                    startedAt: this.data.startedAt
                }
            }
        }
        else{
            currentStorage[id] =
                {
                    title: this.data.title,
                    child: {},
                    startedAt: this.data.startedAt
                }
        }

        localStorage.setItem("listes", JSON.stringify(currentStorage));
    }

    init(){
        this.createDom();
        if(this.data.child){
            const workDiv = this.div.querySelector(".work") as HTMLElement;
            for(let child of this.data.child){
                const item = new Item(workDiv,child.name,child.timer, this.child.length,child.lastAction,this.id);
                this.child.push(item);
            }
            this.setTimer();
        }
        this.drawTimer();
    }
}

export {List};