import {List} from "./liste";

interface item {
    name: string,
    timer: number,
    lastAction: Date,
}

interface list {
    title: string,
    child?: item[],
    startedAt: Date,
    initialized?: boolean
}

interface dataObj {
    [index: number]:list
}

class ListeManager{
    private readonly div: HTMLDivElement;
    private data: dataObj | {};
    private child: list[];
    
    public constructor(data: dataObj){
        this.div = document.querySelector("#main") as HTMLDivElement;
        this.data = data;
        this.child = [];
        this.init();
    }

    private addChild(data: list) :void{
        this.removeChildEvent();
        // @ts-ignore
        this.child.push(new List(this.div, data,data.id))
        this.addChildEvent();
    }

    private addChildEvent() :void {
        const divAdd = document.createElement("div") as HTMLDivElement;
        this.div.appendChild(divAdd);
        divAdd.className = "list";
        divAdd.id = "addList";
        divAdd.innerHTML = `<div id="formAdd"><div><input type="text" placeholder="title"></div><div><input type="submit" value="add"></div></div>`

        const input = divAdd.querySelector("input[type=text]") as HTMLInputElement;
        divAdd.addEventListener("click", () => {
            if(input.value !== ""){
                const req = new XMLHttpRequest();
                req.open("POST", "/addList");
                req.onload = () => {
                    this.addChild({
                        title: input.value,
                        startedAt: new Date()
                    });
                }
                req.send(JSON.stringify({"title": input.value}));
            }
        })
    }

    private removeChildEvent() :void{
        const addChild = this.div.querySelector("#addList");
        if(null !== addChild){
            addChild.remove();
        }
    }


    private init(){
        if(this.data){
            if(Object.keys(this.data).length > 0){
                const keys = Object.keys(this.data);
                let data = this.data as dataObj;
                for(let key of keys){
                    let dataList = data[parseInt(key)] as list;
                    dataList.initialized = true;
                    this.addChild(dataList);
                }
            }
            else{
                this.addChildEvent();
            }
        }
        else{
            this.addChildEvent();
        }
    }
}

export {ListeManager};