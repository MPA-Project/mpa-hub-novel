module.exports = {
  apps: [
    {
      name: 'MPANovelServer',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}