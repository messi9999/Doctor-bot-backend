const request = require("request");
const probe = require("probe-image-size");

function fetchImageSize(imageUrl) {
  return new Promise((resolve, reject) => {
    // Fetch the image using the request module
    request({ url: imageUrl, encoding: null }, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        // Probe the image size using the probe-image-size module
        const result = probe.sync(body);
        resolve(result);
      }
    });
  });
}

module.exports = fetchImageSize;
