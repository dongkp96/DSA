class Node{
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
    
    get value(){
        return this._value;
    }
    
    set value(value){
        this._value = value;
    }
    
    get key(){
        return this._key;
    }
    
    set key(key){
        this._key = key;
    }
}

class HashMap{
    capacity = 16;
    loadFactor = 0.75;
    
    constructor(){
        const array = [];
        for(let i = 0; i<this.capacity; i++){
            array.push(null);
        }
        this.buckets = array;
    }
    
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i <key.length; i++){
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        hashCode = Math.abs(hashCode) % this.capacity; 
        return hashCode
    }
    
    set(key, value){
        const hashCode = this.hash(key)
        console.log(hashCode);
        if(!this.buckets[hashCode]){
            const newNode = new Node(key, value);
            this.buckets[hashCode] = newNode;
        }else{
            if(this.buckets[hashCode].key === key){
                this.buckets[hashCode].value = value;
            }else{
                console.log("Collision!");
            }
        }
        
        this.grow();
    }
    
    get(key){
        const hashCode = this.hash(key);
        if(this.buckets[hashCode] === null){
            return null;
        }else{
            if(this.buckets[hashCode].key === key){
                return this.buckets[hashCode].value;
            }else{
                return null;
            }
        }
    }
    
    has(key){
        const hashCode = this.hash(key);
        if(this.buckets[hashCode] === null){
            return false;
        }else{
            if(this.buckets[hashCode].key === key){
                return true;
            }else{
                return false;
            }
        }
    }
    
    remove(key){
        const hashCode = this.hash(key);
        if(this.buckets[hashCode] === null){
            return false;
        }else{
            if(this.buckets[hashCode].key === key){
                this.buckets[hashCode] = null;
                return true;
            }else{
                return false;
            }
        }
    }
    
    length(){
        let n = 0;
        for (let i = 0; i<this.buckets.length; i++){
            if(this.buckets[i] != null){
                n++;
            }
        }
        return n;
    }
    
    clear(){
        for (let i = 0; i<this.buckets.length; i++){
            this.buckets[i] = null;
        }
    }
    
    keys(){
        const keysArray = [];
        for (let i = 0; i<this.buckets.length; i++){
            if(this.buckets[i] != null){
                keysArray.push(this.buckets[i].key)
            }
        }
        return keysArray;
    }
    
    values(){
        const valuesArray = [];
        for (let i = 0; i<this.buckets.length; i++){
            if(this.buckets[i] != null){
                valuesArray.push(this.buckets[i].value)
            }
        }
        return valuesArray;
        
    }
    
    entries(){
        const entriesArray = [];
        for (let i = 0; i<this.buckets.length; i++){
            if(this.buckets[i] != null){
                let entry = [this.buckets[i].key, this.buckets[i].value]
                entriesArray.push(entry);
            }
        }
        return entriesArray;
    }
    
    grow(){
        let load = this.length();
        let indicator = this.capacity * this.loadFactor;
        if(load >= indicator){
            this.capacity *= 2;
            const newMap = [];
            for(let i = 0; i<this.capacity; i++){
                newMap.push(null);
            }
            const entries = this.entries();
            this.buckets = newMap;
            entries.forEach(entry =>{
                this.set(entry[0], entry[1]);
            });
    
            
        }
    }
}