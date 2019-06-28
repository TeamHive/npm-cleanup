
/**
 * Properties in removeProperties that are set to null will also
 * be removed from the originalObject.
 *
 * Example:
 *      original = {
 *          nestedProp: {
 *              deleteThisProp: 'value'
 *          }
 *      }
 *
 *      removeObject = {
 *          nestedProp: {
 *              deleteThisProp: null
 *          }
 *      }
 *
 *      removeProperties(original, removeObject)
 *      returns {
 *          nestedProp: {}
 *      }
 */
const removeProp = (originalObject: object, removeObject: object) => {
    for (const prop of Object.keys(removeObject)) {
        const removeVal = removeObject[prop];
        if (removeVal === null) {
            delete originalObject[prop];
        }
        else {
            const hasProp = originalObject.hasOwnProperty(prop);
            const typeofRemove = typeof removeVal;
            if (typeofRemove === 'object' && hasProp) {
                removeProp(originalObject[prop], removeVal);
            }
        }
    }
};

export default removeProp;
