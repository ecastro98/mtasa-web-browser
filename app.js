new Vue({
    el: '#app',
    data: {
        search: '',
        servers: [
            { version: "...", name: "Loading...", players: 0, maxplayers: "0", ip: "0", port: 0 },
        ],
    },
    computed: {
        filteredServers() {
            return this.servers.filter(server => {
                return server.name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    mounted() {
        axios
            .get('https://mtasa.com/api/')
            .then(({ data: servers }) => {
                const orderedServersByPlayers = servers.sort((a, b) => a.players > b.players ? -1 : 1);
                this.servers = orderedServersByPlayers;
            });
    },
    methods: {
        openServer(server) {
            window.location.href = `mtasa://${server.ip}:${server.port}`;
        }
    }
})
