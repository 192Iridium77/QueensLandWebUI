import load from "~/loadModules";

export default {
  namespaced: true,
  state: {
    config: {
      id: undefined,
      // categories: [{
      //     name: "Node 1",
      //     id: 1,
      //     pid: 0,
      //     dragDisabled: true,
      //     addTreeNodeDisabled: true,
      //     addLeafNodeDisabled: true,
      //     editNodeDisabled: true,
      //     delNodeDisabled: true,
      //     children: [{
      //       name: "Node 1-2",
      //       id: 2,
      //       isLeaf: true,
      //       pid: 1
      //     }]
      //   },
      //   {
      //     name: "Node 2",
      //     id: 3,
      //     pid: 0,
      //     disabled: true
      //   },
      //   {
      //     name: "Node 3",
      //     id: 4,
      //     pid: 0
      //   }
      // ]
    }
  },
  actions: {
    ...load(require.context("./actions", false, /\.js$/))
  },
  mutations: {
    ...load(require.context('./mutations', false, /\.js$/))
  }
};

// categories: