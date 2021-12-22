class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
	    let newNode = new Node(data);
	    if (this.root === null) {
	        this.root = newNode;
	    } else {
	        this.insertNode(this.root, newNode);
	    }
		}
		insertNode(node, newNode) {
		    if (newNode.data < node.data) {
		        if (node.left === null) {
		            node.left = newNode;
		        } else {
		            this.insertNode(node.left, newNode);
		        }
		    } else {
		        if (node.right === null) {
		            node.right = newNode;
		        } else {
		            this.insertNode(node.right, newNode);
		        }
		    }
		}

		minNode(node) {
	    if (node.left === null)
	        return node;
	    else
	        return this.findMinNode(node.left);
		}
		remove(data) {
		  this.root = this.removeNode(this.root, data);
		}
		removeNode(node, data) {
	    if (node === null) {
	        return null;
	    } else if (data < node.data) {
	        node.left = this.removeNode(node.left, data);
	        return node;
	    } else if (data > node.data) {
	        node.right = this.removeNode(node.right, data);
	        return node;
	    } else {
	        if (node.left === null && node.right === null) {
	            node = null;
	            return node;
	        }
	        if (node.left === null) {
	            node = node.right;
	            return node;
	        } else if(node.right === null) {
	            node = node.left;
	            return node;
	        }
	        let newNode = this.minNode(node.right);
	        node.data = newNode.data;
	        node.right = this.removeNode(node.right, newNode.data);
	        return node;
	    }
		}
}

