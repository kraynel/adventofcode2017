const _ = require("lodash");

const buildTree = input => {
  const lines = input.split(/\n/);
  const parseLine = /(.*?) \(([0-9]+)\)( -> (.*))?/;
  const nodeArray = lines.map(line => {
    const [total, name, value, ...rest] = parseLine.exec(line);
    const children = rest && rest[1] ? rest[1].split(", ") : [];

    return {
      name,
      value: parseInt(value),
      children
    };
  });

  const nodesByName = _.keyBy(nodeArray, "name");
  _.each(nodesByName, (node, nodeName) => {
    node.children = _.map(node.children, childName => {
      nodesByName[childName].parent = node;
      return nodesByName[childName];
    });
  });

  return nodesByName;
};

const getRootNode = input => {
  const nodesByName = buildTree(input);
  let currentNode = _.values(nodesByName)[0];
  while (currentNode.parent) {
    currentNode = currentNode.parent;
  }

  return currentNode.name;
};

const balanceTree = input => {
  const nodesByName = buildTree(input);
  const rootNodeName = getRootNode(input);

  const computeWeights = node => {
    const childrenWeight = _(node.children)
      .map(node => {
        const weight = computeWeights(node);
        node.weight = weight;
        return weight;
      })
      .reduce((accu, v) => v + accu, 0);
    return node.value + childrenWeight;
  };

  const isBalanced = node => {
    return _.every(
      node.children,
      child => child.weight === node.children[0].weight
    );
  };

  computeWeights(nodesByName[rootNodeName]);
  let node = nodesByName[rootNodeName];
  while (true) {
    const childrenStatus = node.children.map(isBalanced);
    if (_.every(childrenStatus)) {
      // All child trees are balanced. One of the child should be changed
      let expectedWeight = 0;
      let weightToCorrect = 0;
      let valueToCorrect = 0;
      _(node.children)
        .groupBy("weight")
        .forEach((children, weight) => {
          if (children.length > 1) {
            expectedWeight = children[0].weight;
          } else {
            valueToCorrect = children[0].value;
            weightToCorrect = children[0].weight;
          }
        });

      return valueToCorrect - (weightToCorrect - expectedWeight);
    }

    node =
      node.children[_.findIndex(childrenStatus, childStatus => !childStatus)];
  }
};
module.exports = { getRootNode, balanceTree };
