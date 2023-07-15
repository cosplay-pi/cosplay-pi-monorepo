# Orange Pi Zero2 Setup Guide

## Requirements

1. SD card
2. SD cards reader

## Flash SD card

1. Download tool for flashing images to SD cards (recommended: [balenaEtcher](https://etcher.balena.io/)).
2. Download latest Ubuntu image from [official Orange Pi Zero2 website](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-Zero-2.html) (recommended: *Orangepizero2_3.0.6_ubuntu_jammy_server_linux5.16.17*).
3. Insert SD card into SD cards reader.
3. Flash the image to SD card.

## Connect through SSH

1. Plug-in LAN cable.
2. Scan network for new SSH hosts:
```sh
sudo nmap -p 22 192.168.0.0/24
```
3. Connect to Orange Pi Zero2 (default password should be: `orangepi`):
```sh
ssh root@<ip>
```

## Update packages

```sh
apt update
apt install git
```

## Change the root password (optional)

```sh
passwd
```

## Configure SSH host visibility (optional)

1. Open `orangepi-config`.
2. Navigate to `Personal` section.
3. Choose `Hostname` option and set a name for your device.
4. Go back.
5. Navigate to `Software` section.
6. Choose `Avahi` option and wait for it to finish.

From now on, you should be able to connect to your device by:
```sh
ssh root@<hostname>.local
```

## Configure Wi-Fi connections (optional)

```sh
nmcli device wifi connect <ssid> password <password> name <ssid> ifname wlan0
```

Optionally, add second one and configure priorities:

```sh
nmcli device wifi connect <ssid2> password <password2> name <ssid2> ifname wlan0

nmcli connection modify <ssid> connection.autoconnect-priority 50

nmcli connection modify <ssid2> connection.autoconnect-priority 100
```

## Configure USB sound card (optional)

### Configure the volume

`alsamixer`

After you're finished, save the configuration:

`alsactl store`

### Create multi-channel virtual device

`/etc/asound.conf`:
```
pcm.dmixed {
    type dmix
    ipc_key 1024
    ipc_key_add_uid 0
    slave {
      pcm "hw:3,0"
      period_time 0
      period_size 1024
      buffer_size 4096
      format S16_LE
      rate 48000
    }
}
pcm.dsnooped {
    type dsnoop
    ipc_key 1025
    ipc_key_add_uid 0
    slave {
      pcm "hw:3,0"
      period_time 0
      period_size 1024
      buffer_size 4096
      format S16_LE
      rate 48000
    }
}

pcm.duplex {
    type asym
    playback.pcm "dmixed"
    capture.pcm "dsnooped"
}

pcm.!default {
    type plug
    slave.pcm "duplex"
}
ctl.!default {
    type hw
    card 1
}
```

`reboot` to apply the changes.

## [Device Hub Client Setup Guide](./DEVICE_HUB_CLIENT_SETUP_GUIDE.md)
