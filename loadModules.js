import { reduce } from "lodash";

export default (requireModule, modifyModuleName) => {
  return reduce(
    requireModule.keys(),
    (result, fileName) => {
      if (fileName === "./index.js") return result;
      let moduleName = fileName.replace(/(\.\/|\.js|\.vue)/g, "");
      moduleName = moduleName.replace(/\//g, "_");
      const modName = modifyModuleName
        ? modifyModuleName(moduleName)
        : moduleName;
      result[modName] = requireModule(fileName).default;
      return result;
    },
    {}
  );
};
