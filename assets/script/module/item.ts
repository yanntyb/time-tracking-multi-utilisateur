class Item{
    public div: HTMLElement;
    title: string;
    public time: number;
    public id: number;
    lastAction: Date;
    private parentId: any;

    constructor(public parent: HTMLElement,title: string, time: number, id: number, lastAction: Date, listId: number){
        this.div = document.createElement("div") as HTMLElement;
        this.title = title;
        this.time = time;
        this.id = id;
        this.parentId = listId;
        if(this.title === ""){
            this.lastAction = new Date();
        }
        else{
            this.lastAction = new Date(lastAction);
        }
        this.createDom();
    }

    //Create dom
    private createDom(){
        this.parent.appendChild(this.div);
        this.div.className = "item";
        if(this.title === ""){
            this.div.innerHTML =
                `
            <div>
                <input type="text" class="title" placeholder="titre">
                <input type="submit" value="accepter">
            </div>
            <div class="lastAction"></div>
            <div class="time"></div>
            <i data-id="${this.id}" class="timer fas fa-stopwatch"></i>
            <i class="delete fas fa-trash">
            `;

            const title = this.div.querySelector(".title") as HTMLInputElement;
            const submit = this.div.querySelector("input[type=submit]") as HTMLButtonElement;

            submit.addEventListener("click", () => {
                if(title.value !== ""){
                    this.title = title.value;
                    const req = new XMLHttpRequest();
                    req.open("POST", "/addItem");
                    req.onload = () => {
                        const value = this.title;
                        const span = document.createElement("span");
                        title.remove();
                        const div = this.div.querySelector("div") as HTMLElement;
                        div.prepend(span);
                        span.innerHTML = value;
                        submit.remove();
                    }
                    req.send(JSON.stringify( {"listeId": this.parentId,"title": this.title, "id": this.id}));
                }
            })
        }
        else{
            this.div.innerHTML =
                `
            <div>
                <span>${this.title}</span>
            </div>
            <div class="lastAction"></div>
            <div class="time"></div>
            <i data-id="${this.id}" class="timer fas fa-stopwatch"></i>
            <i class="delete fas fa-trash">
            `;
            this.drawLastAction();
        }

        //Delete
        const remove = this.div.querySelector(".delete") as HTMLElement;
        remove.addEventListener("click", () => {
            console.log(this.id, this.parentId);
            const req = new XMLHttpRequest();
            req.open("POST","/removeItem");
            req.onload = () => {
                this.div.remove();
            }
            req.send(JSON.stringify({"id": this.id, "listeId": this.parentId}));
        })
    }

    drawLastAction() {
        const lastAction = this.div.querySelector(".lastAction") as HTMLElement;
        lastAction.innerHTML = this.lastAction.toLocaleString('fr-FR', {
            weekday: 'short', // long, short, narrow
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'long', // numeric, 2-digit, long, short, narrow
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
            second: 'numeric', // numeric, 2-digit
        })
    }

    drawTime(){
        const time = this.div.querySelector(".time") as HTMLElement;
        let h = Math.floor(this.time / 3600).toString().padStart(2,'0'),
            m = Math.floor(this.time % 3600 / 60).toString().padStart(2,'0'),
            s = Math.floor(this.time % 60).toString().padStart(2,'0');
        if(parseInt(h) < 24){
            time.innerHTML = `${h}:${m}:${s}`;
        }
        else {
            time.innerHTML = `${h} H`;
        }

    }
}

export {Item};