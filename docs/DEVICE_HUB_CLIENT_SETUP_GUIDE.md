# Device Hub Client Setup Guide

## Requirements

- `git`

## Install NVS

```sh
export NVS_HOME="$HOME/.nvs"

git clone https://github.com/jasongin/nvs "$NVS_HOME"

. "$NVS_HOME/nvs.sh" install
```

## Install Device Hub Client

`$HOME/cosplay-pi-device-hub-client/package.json`:
```json
{
  "dependencies": {
    "cosplay-pi-device-hub-client": "^1.0.0"
  }
}
```

`$HOME/cosplay-pi-device-hub-client/.nvmrc`:
```
16.16.0
```

Install dependencies:

```sh
cd $HOME/cosplay-pi-device-hub-client
nvs use auto
npm install
```

## Generate Device Keys

```sh
cd "$HOME/cosplay-pi-device-hub-client"

nvs use auto

npx generate-cosplay-pi-device-keys
```

## Create service script

`$HOME/cosplay-pi-device-hub-client/service.sh`:
```sh
export NVS_HOME="$HOME/.nvs"
[ -s "$NVS_HOME/nvs.sh" ] && . "$NVS_HOME/nvs.sh"

cd "$HOME/cosplay-pi-device-hub-client"

nvs use auto

npm update || true

npx run-cosplay-pi-device-hub-client
```

## Register service

`/lib/systemd/system/cosplay-pi-device-hub-client.service`:
```
[Unit]
Description=cosplay-pi-device-hub-client-service
After=network.target

[Service]
ExecStart=/bin/bash /$HOME/cosplay-pi-device-hub-client/service.sh
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

## Enable service

```sh
systemctl enable cosplay-pi-device-hub-client.service
```

## Reboot

```sh
reboot
```
