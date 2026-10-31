---
title: "Running Ubuntu from an USB stick"
published: 2017-11-10
tags: [ubuntu, linux, usb stick, live image]
---

{{< note >}}
I originally published this in 2017.
{{< /note >}}

This is a small story about how I ran Ubuntu on an USB stick as its main drive (not install from USB stick, not live image).

## Intro

So I thought recently of trying to run Ubuntu from an USB stick, with the idea that I was missing Ubuntu (and generally the Debian/Gnome environment) but I also was not able to ditch my Windows 10 env, because of apps that are not to be found on Linux.

The goal was to install Ubuntu on an USB stick as it’s primary drive, and just plug it in any laptop or desktop, and run the OS from there.

This would provide maximum portability, as all the apps, files, configurations are on the stick, I just use the hardware that is available anywhere I go and where I can boot a custom OS from a stick.

## The stick

Naturally, I needed an USB stick that was fast, with USB 3.0 connection.

From eMag I got the recommendation for this [AData UV140 32GB USB 3.0](https://www.emag.ro/memorie-usb-adata-uv140-32gb-usb-3-0-albastru-auv140-32g-rbe/pd/DVT0MYBBM/), at 57 lei, which I also bought and tested on.

The speed of this stick is around 80 MB/s read, 20 MB/s write.

Later on, I found this [AData S102 PRO 32 GB USB 3.0](https://www.emag.ro/usb-flash-drive-adata-32gb-usb-3-0-albastru-as102p-32g-rbl/pd/DMR833BBM), at 74 lei (discounted), which seems to provide better capabilities.

The speed for this one is around 130 MB/s read, 30 MB/s write.

## The OS

To install Ubuntu on the stick, I first downloaded the ISO image with the desired version of Ubuntu (any Linux works here, for that matter).

Then I created a new VirtualBox VM (this was on an Windows machine), added a custom USB controller in that VM, configured the VM to load the Ubuntu ISO and started the VM.

After the Ubuntu live image started up, I plugged the USB stick into the computer, and commanded VirtualBox to pass-through the USB drive to the VM.

In the live image, I started the Install Ubuntu application, and configured the app to use the USB drive as main drive.

It took a while to install (30 minutes, I think) but it completed successfully.

## Running it

The experience was surprisingly nice. I was expecting large loading times and a general sluggish experience in the OS.

What I found was that the OS (Ubuntu 17.10, latest) moves decently fast. It takes about 15 seconds from cold start to get into the home screen, ready to use.

Firefox takes about 3 seconds to start and open the homepage, Chrome takes about 5 seconds (cold starts both).

Sublime starts in less than 2 seconds (cold start), other apps may vary.

It was also nice to switch computers just by moving the USB stick from one computer into another, boot that one up, and have everything exactly how I left it off.

## But why?

I see many applications for such an USB stick. It is beyond a simple live image USB stick (in the land of Linux live images, Hirens boot CD, etc).

You can easily configure the entire OS with tools, configuration files, custom scripts, custom DBs and have it plugged in any environment where you need to audit, investigate, debug, configure or generally manage the infrastructure.

Works very well as demo stick, that you can both hand off to your clients for testing the application or use it for yourself during demo shows. You just need to bring or get from there a normal desktop or laptop, with whatever OS installed locally (as long as it allows custom boot from USB).

You can easily clone the USB drive, and make any copies you want (useful for the demo scenarios above).

Also works very well as a mobile desktop, where you need just the hardware shell of a computer, plug the USB in, boot up and everything is exactly like you left it off.

As a final cookie, you can [replace the USB stick with your own Android phone](https://beebom.com/how-to-boot-linux-on-pc-using-android-phone/) (needs rooting), so that you can boot up a PC from an Android phone plugged into USB, and run the OS from there (but probably with very small speeds, as only recent Android phones are implementing decent USB transfer speeds, nowhere near USB 3.0 standard).
