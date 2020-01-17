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
    target: "http://172.16.0.16:4200",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
