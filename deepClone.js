exports.deepClone = (objectPassed) => {
  Object.keys(objectPassed).map(key => {
    if (key === '__proto__') return; // would work without but good practice

    const isNull = objectPassed === null;
    const isObject = typeof objectPassed === 'object';
    const shouldClone = isNull || !isObject;

    return {
      ...objectPassed,
      [key]: shouldClone
        ? this.deepClone(objectPassed[key])
        : objectPassed,
    };
  });

  return { ...objectPassed };
};
