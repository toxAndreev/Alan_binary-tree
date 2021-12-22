const minRange = -100;
const maxRange = 100;
const TREE_CONTAINER = document.getElementById('binary-tree-container');

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
		const newNode = new Node(data);
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
		} else if (node.right === null) {
			node.right = newNode;
			} else {
			this.insertNode(node.right, newNode);
			}
	}

	minNode(node) {
		while (node.left) {
			node = node.left;
		}
		return node;
	}

	remove(data) {
		this.root = this.removeNode(this.root, data);
	}

	renderTree(element, highlight, node = this.root) {
		if (node) {
			const leftDiv = document.createElement('div');
			leftDiv.classList.add('mainDiv');

			const rightDiv = document.createElement('div');
			rightDiv.classList.add('mainDiv');

			const nodeDiv = document.createElement('div');
			nodeDiv.innerHTML = `<div id="node-data">${node.data}</div>`;
			nodeDiv.classList.add('nodeDiv');
			if (node.data === highlight) {
				nodeDiv.classList.add('highlight');
			}

			element.appendChild(nodeDiv);
			element.appendChild(leftDiv);
			element.appendChild(rightDiv);

			this.renderTree(leftDiv, highlight, node.left);
			this.renderTree(rightDiv, highlight, node.right);
		}
	}

	removeNode(node, data) {
		if (node === null) {
			return null;
		}
		if (data < node.data) {
			node.left = this.removeNode(node.left, data);
			return node;
		}
		if (data > node.data) {
			node.right = this.removeNode(node.right, data);
			return node;
		}

		// node found
		if (node.left === null && node.right === null) {
			return null;
		}
			if (node.left === null) {
			return node.right;
		}
		if (node.right === null) {
			return node.left;
		}
		const newNode = this.minNode(node.right);
		node.data = newNode.data;
		node.right = this.removeNode(node.right, newNode.data);
		return node;
	}
}

let BST = new BinarySearchTree();
BST.insert(11);
BST.insert(7);
BST.insert(9);
BST.insert(15);
BST.insert(6);

console.log(BST);
BST.renderTree(TREE_CONTAINER);

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('keydown', (e) => {
  if (e.code == "Space") {
  	let num = getRandomNum(minRange, maxRange);
  	BST.insert(num);
  	TREE_CONTAINER.innerHTML = '';
  	BST.renderTree(TREE_CONTAINER, num);
  }
});

TREE_CONTAINER.addEventListener('click', (e) => {
	if (e.target.id == "node-data") {
	// 	e.target.classList.add('remove');
	// 	setTimeout(() => {
	// 		BST.remove(e.target.innerHTML);
	// 		TREE_CONTAINER.innerHTML = '';
	// 	  BST.renderTree(TREE_CONTAINER); ==============>>>>>> FOR REMOVE ANIMATION <<<<<<<===============
	// }, 1000);

		BST.remove(e.target.innerHTML);
		TREE_CONTAINER.innerHTML = '';
	  BST.renderTree(TREE_CONTAINER);
	}
});

