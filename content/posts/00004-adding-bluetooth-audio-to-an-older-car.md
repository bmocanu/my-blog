---
title: Adding Bluetooth audio to an older car
published: 2017-12-31
updated: 2026-10-25
tags: [bluetooth, fiat linea, audio]
---

{{< note >}}
I originally published this in 2017 and updated it today, for the new installment of this blog.
{{< /note >}}

I am currently driving a 2009 Fiat Linea and I am a bit discomforted by the limitations of its built-in audio player. It supports CDs and also an USB connection for playing MP3 files from USB memory drives (8GB max), but it has no option to connect my mobile device to it and stream audio content to the car speakers via the car audio system. That is, it has neither an AUX IN port nor an A2DP Bluetooth capability.

During the last year I also fell in love with podcasts and streaming services (e.g. Google Play Music and Spotify) so I decided that I need to do something and backfit my car with Bluetooth connectivity. This post summarizes my findings on how this backfitting can be approached.

Before detailing the options that I identified in this quest, it is worth setting up the common architecture that most cars from the 2000-2015 have and on which the following options apply. Almost all the cars in this timeframe were sold with an audio player that supports FM radio, cassette tape and/or CD player, with some of them also sporting AUX IN and/or USB connection for plugging in a USB memory drive for playing files out of it. Also some of them might also sport an SD card slot, with similar functionality to the USB port. Chances are that, if the car sports a built-in Bluetooth connection, the audio device does not support Bluetooth A2DP protocol, meaning that it allows only mono Bluetooth stream solely for phone calls (built-in handsfree; this was also the case with my car).

## The options

Here are the options that I found, together with the hardware that might work with each one of them:

### Change the audio player

This is probably the most no-brainer. If you have no concerns for issues with re-selling the car in the near future, then changing the entire audio unit might be the best option. However, in many cases the factory-provided audio unit is also customized for the respective model, requiring specialized dashboard masks to fit a 1DIN or 2DIN audio players. No suggestions here, except, of course, for choosing audio units that provide A2DP Bluetooth connections. If you can also get the commands on the steering wheel to connect to the audio unit, so much for the better.

### Use an Bluetooth-to-FM transmitter

This is one of the options that is the least intrusive on your car and also requires the least work from your side, especially on the electrical part of the car. A Bluetooth-to-FM adapter such as [this one](https://www.amazon.co.uk/Transmitter-VicTsing-Bluetooth-Handsfree-Wireless-Grey/dp/B01K4R8RLM/ref=sr_1_1_sspa) can connect via Bluetooth to your mobile device, then transmit the audio stream via FM waves to the car player on a pre-configured FM frequency. Finally, the car player plays the received stream. The adapter is powered via the lighter port of your car.

While this is one cheap and straightforward solution, it yields a very low sound quality, with a very low volume combination, requiring you to turn the mobile device and the car audio player volume levels close to their MAX settings. The signal to noise ratio is also a low one.

### Make use of the existing mono Bluetooth connection (phone connection)

If your car is equipped with a handsfree Bluetooth system, such as Blue & Me, which powered my Fiat Linea, then one option for streaming audio content from the mobile device to the car speakers is to use a mobile app that is capable of re-routing the audio output of the mobile device via the mono Bluetooth connection that is used, in most cases, for phone calls. A [mobile app like this one](https://play.google.com/store/apps/details?id=com.codococo.monomono) allows you to stream the audio content from the mobile device to the Bluetooth chip on the car.

This is, again, a cheap and simple solution with a low audio quality. Probably a bit better in terms of background noise than the one using the FM transmitter, but still, a mono audio source is a mono audio source.

### Use the existing USB connection

If the car audio player has an USB connection, in most cases it is using it for reading MP3 files from a plugged in USB stick, formatted as FAT32 (interestingly enough, my audio player accepted an USB card reader, in which I plugged an SD card and which it read successfully and played the songs from the card). The backfitting of a Bluetooth connection here works by plugging in a device that provides a file-system based interface towards the car audio player, while at the same time streaming audio content via Bluetooth from the mobile device.

One such device looks to be this [Car Bluetooth Audio Adapter for BMW and Mini Cooper](https://www.banggood.com/Car-Bluetooth-Audio-3_5mm-AUX-USB-Music-Adapter-Cable-For-BMW-And-Mini-Cooper-p-1235363.html). I just ordered this device and I am not sure if it will work on my Fiat or if it really is just for BMW and Mini Cooper. I will make an update here once I find out. I somehow expect that it does exactly the medium conversion that I described above, so I am really looking forward on testing this device.

### Check for existing but unused AUX IN connectors

Chances are that your car audio player has the required pins for AUX IN, but there is no connector attached to them. In my case, the audio player does provide the pins for AUX IN left, right and ground, but there is no plug attached to them. On Banggood I found this [3.5 mm Jack Audio Cable Input Adapter](https://eu.banggood.com/Wholesale-Warehouse-3_5mm-Jack-AUX-Audio-Cable-Input-Adapter-For-FIAT-Grande-Punto-MP3-wp-Eu-961129.html), which provides the plug that I am missing and which makes the connection between the AUX IN connectors of the car audio player and a 3.5mm jack, which can then be connected to the mobile device directly or to a Bluetooth audio adapter.

I ordered this cable too and I am curious if and how this could work. An interesting point here is that, if it does work, there will be 2 audio inputs processed by the car audio player in parallel: the input from the CD or USB player and the AUX IN input. For this to work, the CD or USB player needs to play a no-sound track (all silence track), which can be easily generated with a program like Audacity or something similar (and a hint here: after generating a track of around 1h of silence, make sure to encode it in lowest possible bitrate (e.g. 128kbps) to save space and processing power on the car audio player).

An alternative to the silence tracks is pausing the CD or USB player after it starts playing some song, so that only the AUX IN stream is processed and played in the car speakers.

### Check for audio input on existing connectors

If you have a handsfree system like Blue & Me (my Fiat does), then the car audio player is expecting an analog audio input from such a system, which presents an opportunity for making a parallel connection for the 3 audio connectors (left, right, ground) and selectively pump audio stream from either the external system (e.g. Blue & Me) or the mobile device / Bluetooth audio adapter,

This option has the same drawback as #5: the audio input from the external system needs to exist but must be silenced. Some simply crafted silence tracks or pausing the external system should work again just fine.

### Get inside the audio player and connect a new parallel audio source

This option requires quite some electrical engineering skills and knowledge. The essence is to open the car audio player, identify the 3 main circuit stages: audio source stage, amplifying stage and control stage. Next, identify the audio connection between the CD player or cassette tape player and make a parallel connection to that part (so this is similar to #6 but goes deeper in the car audio player circuitry).

Just like for #5 and #6, silence tracks or pausing the shadowed part of the car audio player (CD or USB) is essential for not hearing two tracks at the same time.

### Duplicate audio connectors to car speakers

I am rounding this list up with a last option, which is a bit easier than the last ones: duplicate the connection to the existing car speakers in order to drive them from a parallel equipment. This involves connecting an amplifier with enough output power to drive the existing car speakers and a Bluetooth audio adapter that provides the audio input for the amplifier. Also a switch might be required in order to 1) toggle the amplifier on or off and 2) switch the car speakers connection from the old car player to the new amplifier-Bluetooth adapter combo and back again.

This options is easy to install, has some very good results (especially if you go for this [Bluetooth audio adapter with APT-X support](https://www.banggood.com/Bluetooth-4_0-Wireless-Music-APT-X-Audio-Stereo-Transmitter-Receiver-For-IPhone-Huawei-Meizu-Xiaomi-p-1112917.html)) but requires some fine wiring for the amplifier power system and for the connection to the car speakers. Best would be to find an audio tuning service to help with the installation.

## My setup

I currently went on 2 options at the same time: I ordered the audio connector to plug in the existing car player, with the hope that the AUX IN connector is wired inside the player and I can make use of it, and I also ordered the BMW/Mini Cooper USB connector, with the hope that it properly emulates an USB drive with a single file (or something along those lines) so that my Fiat’s Blue & Me system will play those files over USB. It’s a bit of a complicated setup (either option) but if it works, I will be more than happy with it.

## Software and hardware reference

Below is the list with all the software and hardware that I mentioned in this article, for quick reference:

- [Bluetooth audio receiver for Car Audio with 3.5mm Audio Output](https://www.amazon.co.uk/Bluetooth-Streaming-Hands-free-Cancelling-Mpow/dp/B00KON1JIA/ref=sr_1_2)
- [Google Chrome Cast Audio Bluetooth receiver](https://store.google.com/gb/product/chromecast_audio?hl=en-GB)
- [Bluetooth audio receiver for Car Audio with APT-X support and 3.5mm Audio Output](https://www.banggood.com/Bluetooth-4_0-Wireless-Music-APT-X-Audio-Stereo-Transmitter-Receiver-For-IPhone-Huawei-Meizu-Xiaomi-p-1112917.html)
- [Bluetooth audio adapter for AUX USB for BMW and Mini Cooper](https://www.banggood.com/Car-Bluetooth-Audio-3_5mm-AUX-USB-Music-Adapter-Cable-For-BMW-And-Mini-Cooper-p-1235363.html)
- [Cable input adapter with 3.5mm Jack for Fiat Grande Punto](https://eu.banggood.com/Wholesale-Warehouse-3_5mm-Jack-AUX-Audio-Cable-Input-Adapter-For-FIAT-Grande-Punto-MP3-wp-Eu-961129.html)
- [Android app for Audio to mono Bluetooth routing](https://play.google.com/store/apps/details?id=com.codococo.monomono)
- Bonus: [USB-to-microUSB cable 1m with 90 degrees connectors](https://www.banggood.com/90-Degree-Reversible-2_4A-Micro-USB-Charging-Data-Cable-1M-for-Samsung-S6-S7-Xiaomi-Note-4-p-1198066.html) (works best with the car lighter port and the corresponding USB chargers)
