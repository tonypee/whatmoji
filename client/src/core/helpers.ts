export const getSensorData = (device, sensorType) =>
  device.sensors.find(sensor => sensor.sensor_type.type == sensorType);

export const sleep = time =>
  new Promise(res => {
    setTimeout(res, time);
  });

export function promiseTimeout(ms, promise): any {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log("timed out..");
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}

/**
 * Check if any errors exist in rc-form
 */
export const fieldHasError = (errors, field) => {
  return !!(errors && errors.some(error => error.field == field));
};

export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

export const objectToArray = object =>
  Object.keys(object).map(key => object[key]);

export const uniq = array => [...new Set(array)];

export const filterNulls = (array: any[]) => array.filter(Boolean);

export const getCacheKiller = () =>
  `cacheKiller=${Math.floor(Math.random() * 1000000)}`;
