Object.prototype.find = function (key) {
  if (typeof key !== "string" || key === "") return null;

  const stack = [this];

  while (stack.length > 0) {
    const obj = stack.pop();

    if (obj === null || typeof obj !== "object") continue;

    const keys = Object.keys(obj);
    for (const k of keys) {
      if (k === key) {
        return obj[k];
      } else if (typeof obj[k] === "object") {
        stack.push(obj[k]);
      }
    }
  }

  return null;
};

Object.prototype.findAll = function (key, defaultValue = []) {
  if (typeof key !== "string" || key === "") return null;

  const stack = [this];
  const foundValues = [];

  while (stack.length > 0) {
    const obj = stack.pop();

    if (obj === null || typeof obj !== "object") continue;

    const keys = Object.keys(obj);
    for (const k of keys) {
      if (k === key) {
        foundValues.push(obj[k]);
      } else if (typeof obj[k] === "object") {
        stack.push(obj[k]);
      }
    }
  }

  return foundValues.length > 0 ? foundValues : defaultValue;
};

const deepNestedObject = {
  level1: {
    stringKey: "Hello, World!",
    numberKey: 42,
    booleanKey: true,
    nullKey: null,
    undefinedKey: undefined,
    objectKey: {
      level2: {
        arrayKey: [1, 2, 3],
        dateKey: new Date(),
        functionKey: function () {
          return `I am a function!`;
        },
        arrowFunctionKey: () => "I am a function!",
        finalKey: "Found 2 level deep!",
        regexKey: /pattern/,
        symbolKey: Symbol("symbol"),
        mapKey: new Map([
          ["mapKey1", "mapValue1"],
          ["mapKey2", "mapValue2"],
        ]),
        level3: {
          nestedObject: {
            level4: {
              deeplyNested: {
                level5: {
                  level6: {
                    level7: {
                      finalKey: "This is the deepest level!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

{
  // find-Result, For Existing Key
  const result = deepNestedObject.find("finalKey");
  console.log(result); // Found 2 level deep!
}

{
  // find-Result, For Non Existing Key
  const findResultForNonExistingKey = deepNestedObject.find("nonExistentKey");
  console.log(findResultForNonExistingKey); // null
}

{
  // findAll-Result, For Existing Key
  const result = deepNestedObject.findAll("finalKey");
  console.log(result); // [ 'Found 2 level deep!', 'This is the deepest level!' ]
}

{
  // findAll-Result, For Non Existing Key
  const result = deepNestedObject.findAll("nonExistentKey");
  console.log(result); // []
}

{
  // findAll-Result, For Non Existing Key And Passing Second Parameter As Default Value
  const result = deepNestedObject.findAll("nonExistentKey", null);
  console.log(result); // null
}
