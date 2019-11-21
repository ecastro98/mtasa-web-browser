function isValidIpv4Addr(ip) {
    return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip);
}

new Vue({
    el: '#app',
    data: {
        directIp: '',
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
        },
        connectToIp() {
            const [ip, port] = this.directIp.split(':');

            if (!isValidIpv4Addr(ip)) {
                alert('This isn\'t a valid IP');
                return;
            }

            if (!port) {
                alert('You\'re missing the port');
                return;
            }

            window.location.href = `mtasa://${this.directIp}`;
        }
    }
})
