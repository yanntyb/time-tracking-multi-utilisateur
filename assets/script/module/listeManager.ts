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

    public constructor(private child: Array<List>){
        this.div = document.querySelector("#main") as HTMLDivElement;
        this.data = this.getData();
        this.init();
    }

    private addChild(data: list,toLocalStorage: boolean) :void{
        this.removeChildEvent();
        this.child.push(new List(this.div, data,this.child.length,toLocalStorage))
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
                this.addChild({
                    title: input.value,
                    startedAt: new Date()
                },true);
            }
        })
    }

    private removeChildEvent() :void{
        const addChild = this.div.querySelector("#addList");
        if(null !== addChild){
            addChild.remove();
        }
    }

    private getData(): dataObj[] | {}{
        return JSON.parse(localStorage.getItem("listes") as string);
    }

    private init(){
        if(this.data){
            if(Object.keys(this.data).length > 0){
                const keys = Object.keys(this.data);
                let data = this.data as dataObj;
                for(let key of keys){
                    let dataList = data[parseInt(key)] as list;
                    dataList.initialized = true;
                    this.addChild(dataList,false);
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