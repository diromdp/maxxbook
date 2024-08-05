module.exports = {
    apps: [{
        name: 'Maxibook',
        script: 'node_modules/.bin/next',
        args: 'start',
        cwd: "/var/www/maxxbook",
        autorestart: true,
        watch: false,
        instances: '4',
        exec_mode: 'cluster',
        max_memory_restart: '1G',
        env: {
            NODE_ENV: "production",
            PORT: 3000
        },
    }]
};