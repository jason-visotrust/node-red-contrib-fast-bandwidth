# node-red-contrib-fast-bandwidth

Tests your network bandwidth using http://fast.com 

This will trigger on any message without looking at the message. 
The only configuration parameter is _upload_ to set whether to also test upload bandwidth. This is on by default. 
Turning this off will make it return faster.

The message from this node will look like this:

    payload: { 
        downloadSpeed: 25, 
        uploadSpeed: 140,
        latency: 30,
        bufferBloat: 208,
        downloadUnit: 'Mbps',
        uploadUnit: 'Kbps',
        latencyUnit: 'ms',
        bufferBloatUnit: 'ms',
        isDone: true 
    }

