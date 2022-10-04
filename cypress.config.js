const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '99hfob',
  env:{
    type: 'stage',
    path: 'https://staging.quickcoach.fit/',
    username: 'dayexbg@gmail.com',
    userPath: 'https://staging.quickcoach.fit/pt/benjamin-cypress'
  },
  e2e: {
    defaultCommandTimeout: 25000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
