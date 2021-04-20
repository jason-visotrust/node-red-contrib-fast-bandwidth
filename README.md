# node-red-contrib-fast-bandwidth

Tests your network bandwidth using [Fast.com.](http://fast.com) 

This will trigger on any message without looking at the payload. 
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

NOTE: If you want to run this in Node-RED in Docker, you'll need a custom Dockerfile for Node-RED to pre-install 
Puppeteer / Chromium. See [here:](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker)

This one worked for me:

    FROM nodered/node-red:latest
    
    USER root
    
    # Installs latest Chromium (89) package.
    RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont
    
    # Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
    ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
    
    # Puppeteer v6.0.0 works with Chromium 89.
    RUN yarn add puppeteer@6.0.0
    
    # Add user so we don't need --no-sandbox.
    RUN mkdir -p /usr/src/node-red/Downloads \
    && chown -R node-red:node-red /usr/src/node-red/Downloads
    
    USER node-red
