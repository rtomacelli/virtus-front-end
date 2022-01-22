const proxy = [{
    "/*": {
      "target": "http://localhost:5002/*",
      "secure": false,
      "changeOrigin": true,
    }
  },
  {
    "/intern/*": {
      "target": "http://localhost:5003/*",
      "secure": false,
      "changeOrigin": true,
    }
  }]
  module.exports = proxy;