const _ = require("lodash");

const buildTree = input => {
  const tree = {};
  input.split(/\n/).forEach(line => {
    const [left, right] = line.split(" <-> ");
    right.split(", ").forEach(rightValue => {
      addNode(left, tree);
      addNode(rightValue, tree);
      union(tree[left], tree[rightValue]);
    });
  });
  return tree;
};

const countConnected = input => {
  const tree = buildTree(input);
  let rootNode = tree["0"];
  while (rootNode.parent != rootNode) rootNode = rootNode.parent;

  const isConnected = node => {
    if (node.value === rootNode.value) return true;
    if (node.parent == node) return false;
    return isConnected(node.parent);
  };

  return _.filter(tree, isConnected).length;
};

const countGroups = input => {
  const tree = buildTree(input);
  const getRoot = node => {
    let rootNode = node;
    while (rootNode.parent != rootNode) rootNode = rootNode.parent;
    return rootNode;
  };

  return _(tree)
    .groupBy(value => getRoot(value).value)
    .keys()
    .value().length;
};

const addNode = (x, tree) => {
  if (tree[x]) return;
  tree[x] = {
    value: x,
    rank: 0
  };
  tree[x].parent = tree[x];
};

const find = x => {
  if (x.parent != x) x.parent = find(x.parent);
  return x.parent;
};

const union = (x, y) => {
  xRoot = find(x);
  yRoot = find(y);

  if (xRoot === yRoot) return;

  if (xRoot.rank < yRoot.rank) {
    xRoot.parent = yRoot;
  } else if (xRoot.rank > yRoot.rank) {
    yRoot.parent = xRoot;
  } else {
    yRoot.parent = xRoot;
    xRoot.rank++;
  }
};

module.exports = {
  addNode,
  union,
  buildTree,
  countConnected,
  countGroups
};
