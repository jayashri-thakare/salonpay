const PROXY_CONFIG = [
  {
    context: [
      "/my",
      "/many",
      "/endpoints",
      "/i",
      "/need",
      "/to",
      "/proxy"
    ],
    "https://login.microsoftonline.com/" : {
      "target": "https://login.microsoftonline.com/819c5746-460c-416e-b656-d4f259797ea6/oauth2/v2.0/token",
      "changeOrigin": true,
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/oauth": ""
      }
    },
    target: "http://172.16.0.16:4200",
    secure: false
  },

]

module.exports = PROXY_CONFIG;
