const api = require('./api')

module.exports = function (RED) {
    function TestBandwidth (config) {
        RED.nodes.createNode(this, config)
        const node = this

        node.on('input', async function (msg) {
            let data = {}
            node.status({ fill: 'blue', shape: 'dot', text: 'fetching...' })
            try {
                await api({ measureUpload: config.upload }).forEach(result => {
                    data = result
                    node.status(
                        {   fill: 'blue',
                            shape: 'dot',
                            text: `fetching... download: ${data.downloadSpeed} ${data.downloadUnit}` })
                })
                msg.payload = data
                node.status(
                    {   fill: 'green',
                        shape: 'dot',
                        text: `done! download: ${data.downloadSpeed} ${data.downloadUnit}` })
            } catch (e) {
                console.error(e)
                node.status({ fill: 'red', shape: 'dot', text: `error: ${e.message}` })
            }
            node.send(msg)
        })
    }
    RED.nodes.registerType('fast-bandwidth', TestBandwidth)
}
