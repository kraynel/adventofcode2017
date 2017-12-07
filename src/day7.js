const _ = require("lodash");

const getRootNode = input => {
  const lines = input.split(/\n/);
  const parseLine = /(.*?) \(([0-9]+)\)( -> (.*))?/;
  const nodeArray = lines.map(line => {
    const [total, name, value, ...rest] = parseLine.exec(line);
    const children = rest && rest[1] ? rest[1].split(", ") : [];

    return {
      name,
      value,
      children
    };
  });

  const nodesByName = _.keyBy(nodeArray, "name");
  _.each(nodesByName, (node, nodeName) => {
    _.map(node.children, childName => {
      nodesByName[childName].parent = node;
      return nodesByName[childName];
    });
  });

  let currentNode = _.values(nodesByName)[0];
  while (currentNode.parent) {
    currentNode = currentNode.parent;
  }

  return currentNode.name;
};

module.exports = { getRootNode };
