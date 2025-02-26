class Node{
    left = null;
    right = null;
    
    constructor(data){
        this.data = data;
    }
    
    get data(){
        return this._data;
    }
    
    set data(value){
        this._data = value;
    }
    
    get left(){
        return this._left;
    }
    
    set left(node){
        this._left = node;
    }

    get right(){
        return this._right;
    }
    
    set right(node){
        this._right = node;
    }
}


class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }
    
    buildTree(array){
        if(array.length === 0){
            return null;
        }
        const sortedArray = array.sort((a,b) => a-b);
        let middle = + Math.floor(array.length/2);
        const rootNode = new Node(sortedArray[middle]);
        const leftArray = sortedArray.slice(0, middle);
        const leftNode = this.buildTree(leftArray);
        const rightArray = sortedArray.slice(middle+1, sortedArray.length);
        const rightNode = this.buildTree(rightArray);
        
        rootNode.left = leftNode;
        rootNode.right = rightNode;
        
        return rootNode;
    }

    insert(value){
        if(this.root === null){
            const newNode = new Node(value);
            this.root = newNode;
            return;
        }
        
        const insertNode = (node, value) =>{
            if(node.data > value){
                if(node.left === null){
                    const newNode = new Node(value);
                    node.left = newNode;
                }else{
                    insertNode(node.left, value);
                }
            }else{
                if(node.right === null){
                    const newNode = new Node(value);
                    node.right = newNode;            
                }else{
                    insertNode(node.right, value);
                }
            }
            
        }
        insertNode(this.root, value);
    }

    deleteItem(value){
        if(this.root === null){
            return "There is no existing tree and such nothing to delete."
        }
        
        let currentNode = this.root;
        let parentNode = null;
        while(true){
            if(currentNode.data === value){
                break;
            }else if(currentNode.data > value){
                if(currentNode.left === null){
                    console.log("This value does not exist. There is no node to delete");
                    break;
                }else if(currentNode.left.data === value){
                    parentNode = currentNode;
                    currentNode = currentNode.left;
                    break;
                }else{
                    parentNode = currentNode;
                    currentNode = currentNode.left;
                }
            }else if(currentNode.data < value){
                if(currentNode.right === null){
                    console.log("This value does not exist. There is no node to delete");
                    break;
                }else if (currentNode.right.data === value){
                    parentNode = currentNode;
                    currentNode = currentNode.right;
                    break;
                }else{
                    parentNode = currentNode;
                    currentNode = currentNode.right;
                }
            }
        }
        

        /*Code that is used to find the node that corresponds to the value and if not then
        currentNode variable does not change. Finds parent Node and the desired node to
        allow for deletion*/
        
        if(currentNode.left === null && currentNode.right === null){
            /*Checks if the for if the root Node is childless or checks if the desired
            deletion is a leaf*/
            if(currentNode.data === this.root.data){
                this.root = null
                /*Checks if the current Node is the root and then deletes root node*/
            }else{
                if(parentNode.left !== null && parentNode.left.data === currentNode.data){
                    parentNode.left = null;

                }else if(parentNode.right !== null && parentNode.right.data === currentNode.data){
                    parentNode.right = null;
                }
            }
        }else if(currentNode.left !== null && currentNode.right === null){
            /*If node only has 1 child scenario*/
            if(currentNode.data === this.root.data){
                this.root = currentNode.left;
            }else if(parentNode.left.data === currentNode.data){
                parentNode.left = currentNode.left;
            }else if(parentNode.right.data === currentNode.data){
                parentNode.right = currentNode.left
            }
        }else if(currentNode.left === null && currentNode.right !== null){
            /*If node only has 1 child scenario*/
            if(currentNode.data === this.root.data){
                this.root = currentNode.right;
            }else if(parentNode.left.data === currentNode.data){
                parentNode.left = currentNode.right;
            }else if(parentNode.right.data === currentNode.data){
                parentNode.right = currentNode.right;
            }
        }else{
            /*This code is for nodes with 2 children*/
             let replacementNode = currentNode.right;
             parentNode = currentNode;
             console.log("Parent 2", parentNode);
             while(true){
                 if(replacementNode.left === null){
                     currentNode.data = replacementNode.data;
                     if(replacementNode.right !== null){
                        parentNode.right = replacementNode.right; 
                     }else{
                         if(parentNode.left === replacementNode){
                             parentNode.left = null
                         }else{
                             parentNode.right = null;
                         }
                     }
                     break;
                 }else{
                     parentNode = replacementNode;
                     replacementNode = replacementNode.left;
                 }
                 console.log("Parent 3", parentNode);
                 console.log("replacement", replacementNode);
             }
        }


    /* Chat GPT's version with simplified logic
    deleteItem(value) {
    if (this.root === null) {
        console.log("There is no existing tree and nothing to delete.");
        return;
    }
    
    let currentNode = this.root;
    let parentNode = null;

    // Locate the node to delete and its parent
    while (currentNode !== null && currentNode.data !== value) {
        parentNode = currentNode;
        if (value < currentNode.data) {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
    }

    if (currentNode === null) {
        console.log("This value does not exist. There is no node to delete.");
        return;
    }

    // Case 1: Node to delete is a leaf node (Reason I didn't do it this way was because I was not sure if references were equal, but based on this; they are.)
    if (currentNode.left === null && currentNode.right === null) {
        if (currentNode === this.root) {
            this.root = null;
        } else if (parentNode.left === currentNode) {
            parentNode.left = null;
        } else {
            parentNode.right = null;
        }
    }

    
    // Case 2: Node to delete has only one child
    else if (currentNode.left === null || currentNode.right === null) {
        const childNode = currentNode.left !== null ? currentNode.left : currentNode.right;
        
        if (currentNode === this.root) {
            this.root = childNode;
        } else if (parentNode.left === currentNode) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }
    }

    // Case 3: Node to delete has two children
    else {
        let replacementNode = currentNode.right;
        let replacementParent = currentNode;

        // Find the in-order successor (leftmost node in the right subtree)
        while (replacementNode.left !== null) {
            replacementParent = replacementNode;
            replacementNode = replacementNode.left;
        }

        // Replace the data of the current node with the in-order successor's data
        currentNode.data = replacementNode.data;

        // Fix the parent's link to the replacement node
        if (replacementParent.left === replacementNode) {
            replacementParent.left = replacementNode.right;
        } else {
            replacementParent.right = replacementNode.right;
        }
    }
}

    */ 
    }

    find(value){
        if(this.root === null){
            return "There is no existing tree and such nothing to delete."
        }
        
        let currentNode = this.root;
        while(true){
            if(currentNode.data === value){
                break;
            }else if(currentNode.data > value){
                if(currentNode.left === null){
                    return null
                }else if(currentNode.left.data === value){
                    currentNode = currentNode.left;
                    break;
                }else{
                    currentNode = currentNode.left;
                }
            }else if(currentNode.data < value){
                if(currentNode.right === null){
                    return null
                }else if (currentNode.right.data === value){
                    currentNode = currentNode.right;
                    break;
                }else{
                    currentNode = currentNode.right;
                }
            }
        }
        return currentNode;
    }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
 };
const test = new Tree([1,2,3,4,5,7,8,9])
/*
-Need to work on finishing delete method when the child has two children and the child's right node has children.
-Need to work on what happens if the value equals the original node (might want to do this first and then you could probs carry it
over with the children node.)
*/