const {defineConfig} = require( 'cypress' );

module.exports = defineConfig(
	{
		projectId: '99hfob',
		env: {
			local: {
				path: 'http://localhost:3700/',
				username: 'dayexbg@gmail.com',
				userPath: 'http://localhost:3700/pt/dyxbenjamin-cypress'
			}
		},
		e2e: {
			defaultCommandTimeout: 25000,
			setupNodeEvents( on, config ) {
				// implement node event listeners here
			},
		},
	} );
