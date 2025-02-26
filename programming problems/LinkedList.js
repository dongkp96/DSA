class Node{

    constructor(){
        this.value = null;
        this.nextNode = null;
    }
    
    get value(){
        return this._value;
    }
    
    set value(new_val){
        this._value = new_val;
    }
    
    get nextNode(){
        return this._nextNode;
    }
    
    set nextNode(node){
        this._nextNode = node;
    }
}


class LinkedList{
    head = "";
    tail = "";
    
    constructor(){
    }
    
    get head(){
        return this.head;
    }
    
    set head(node){
        this._head = node;
    }
    
    get tail(){
        return this.tail;
    }
    
    set tail(node){
        this._tail = node; 
    }
    
    append(value){
        const newNode = new Node();
        newNode.value = value;
        if (!this.head){
            this.head = newNode;
            this.head.nextNode = newNode;
        }
        
        if(!this.tail){
            this.tail = newNode;
        }else{
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }
    
    prepend(value){
        if(!this.head){
            this.append(value);
        }else{
            const newNode = new Node();
            newNode.value = value;
            newNode.nextNode = this.head;
            this.head = newNode;
        }
    }
    
    size(){
        let n = 1;
        let currentNode = this.head;
        while(currentNode.nextNode != null){
            currentNode = currentNode.nextNode;
            n++;
        }
        return n;
    }
    
    at(index){
        if(index === 0){
            return this.head;
        }else{
            let n = 0;
            let currentNode = this.head;
            while(n<index){
                currentNode = currentNode.nextNode;
                n++;
            }
            return currentNode; 
        }
    }
    
    pop(){
        let n = this.size()-2;
        let currentNode = this.head;
        for(let i = 0; i<n; i++){
            currentNode = currentNode.nextNode;
        }
        this.tail = currentNode;
        this.tail.nextNode = null;
    }
    
    contains(value){
        let n = 1;
        let m = this.size();
        let contains = false;
        if(this.head.value === value){
            contains = true;
            return contains;
        }else{
            let currentNode = this.head;
            while(n<m){
                currentNode = currentNode.nextNode;
                if(currentNode.value === value){
                    contains = true;
                    return contains;
                }
                n++;
            }
        }
        return contains
    }
    
    find(value){
        let n = 1;
        let currentNode = this.head;
        if (this.head.value === value){
            return 0;
        }else{
            while(n< this.size()){
                currentNode = currentNode.nextNode;
                if(currentNode.value === value){
                    return n;
                }
                n++;
            }
        }
    }
    
    toString(){
        let string = `(${this.head.value}) -> `;
        let currentNode = this.head;
        
        while(currentNode.nextNode != null){
            currentNode = currentNode.nextNode;
            let addedString = `(${currentNode.value}) -> `
            string += addedString;
        }
        string += "null"
        return string;
        
    }
    
    insertAt(value, index){
        let oldNode = this.at(index);
        if(oldNode === this.tail){
            this.append(value);
        }else if (index === 0){
            this.prepend(value);
        }else{
            const newNode = new Node();
            newNode.value = value;
            let prevNode = this.at(index-1);
            prevNode.nextNode = newNode;
            newNode.nextNode = oldNode;

            
        }
    }
    
    removeAt(index){
        let removedNode = this.at(index);
        if(index === 0){
            this.head = this.head.nextNode;
        }else if(removedNode === this.tail){
            this.pop();
        }else{
            let prevNode = this.at(index-1);
            let nextNode = this.at(index+1);
            prevNode.nextNode = nextNode;
        }
    }
    
}

const list = new LinkedList();