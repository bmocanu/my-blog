---
title: Twenty minutes to test a SH phone before buying
published: 2018-01-06
updated: 2026-10-25
tags: [testing, second-hand phone]
---

{{< note >}}
I originally published this in 2018 and updated it today, for the new installment of this blog.
{{< /note >}}

When you buy a second hand / used mobile phone from someone that you can meet in person, you usually get a short amount of time (tens of minutes) to inspect the device and make sure that everything is in good working condition. This post makes a checklist of what to look for before making the purchase, considering that you only get that small amount of time to check the device.

As a bit of context, a short while ago I was asked to intermediate a purchase of a used mobile device from a person that was selling it on an online website. The phone was looking good in the pictures, I was told it functions properly and the price was more than right. I got in touch with the person, met him face to face and got a roughly 20 minutes time to inspect the phone and make sure that everything works as advertised.

As much as I prepared before the meeting, something slipped from my attention and the phone proved to be flawed at battery level (the temperature sensor was broken, it was reporting negative values and, as a consequence, the phone was not charging the (non-removable) battery). The battery was among the only things that I failed/forgot/haven’t thought about checking.

So here it goes, the list of quick items to check in 20 minutes time before buying a used mobile phone:

1. Check for China copies
2. Check for dead pixels
3. Check for charging issues
4. Check for battery lifetime issues
5. Check for firmware flashing / rooting issues
6. Check for dead / disabled cores of the CPU
7. Check connectivity issues (WiFi, Bluetooth, NFC, GSM and mobile data)
8. Check for network bands support and network operator support (SIM check)

Before delving into the list items, I strongly recommend that you prepare yourself with a Google or Apple test account to sign in on the used mobile device. The reason is that certain functions are available only to enrolled accounts (with the most important one being the installation of apps from Google Play Store or Apple App Store).

## Check for China copies

First thing to check is that the phone is an original one and not a clone made in China. Most of the popular phones (Samsung and Apple as the top of the list) have really good China clones, that look very much like the original, they sport an Android customization that looks very similar to the real OS (yes, even the Apple iPhone clones run Android, which is customized to look like iOS… if you can believe that).

The approach here is to look on the Internet for the differences between the original phone and the clone. If the phone is a popular one, you will find countless videos and blog posts covering this. Elements to check include physical aspect of the phone, buttons placement, charging port, OS firmware versions, various apps that are/are not installed and, finally, the text and general look and feel of the phone box.

## Check for dead pixels

Next item to look for are the dead pixels. Open a browser app or the **Settings** dialog and check the screen condition. If there are dead pixels or dead lines of pixels you should spot them immediately. This, however, is made a bit difficult nowadays by latest phones because their pixels-per-inch (PPI) density is high so a dead pixel somewhere in a corner might be difficult to spot.

## Check for charging issues

Next on the list is checking the correct charging function of the mobile phone. If possible, use the charger from the box to connect the phone to a wall socket. You can also use an USB powerbank with same results. If the phone is known to support Quick Charging / Fast Charging make sure to look for that as well. Moreover, try to stress it a little bit, connecting it and disconnecting it from the charger to check for any anomalies.

This is one item that really got me. From time to time the phone was charging the battery, but most of the time it was reporting low temperature at the battery. During those 20 minutes of unit review, it never occured to me that I should also check a basic function such as charging (after all, the phone’s battery was at approx. 80%…).

## Check for battery lifetime issues

This one is a bit difficult to test in a very short amount of time. The goal is to check that the battery is healthy and the discharge is an approximately uniform one (that is, it discharges at an almost constant rate, regardless of the battery percentage). The phone to test will probably have full or close to full battery level, so this might be a point that cannot be tested at all. The approach is to stress it at bit by launching applications, going through the menus, running some games, running some benchmark applications and checking the battery level drop out.

Most of the phones with a burned out battery will discharge the battery very fast in the last 25-35 percentages of the battery level. But again, testing this in less than 20 minutes is a difficult task.

## Check for firmware flashing / rooting issues

Next in line is the check for rooted / jail broken mobile devices. Assuming you want a clean phone with the original firmware in place, this point from the list ensures that the phone OS has not been tampered with.

The approach varies from phone to phone, and from Android to iOS. For Apple devices I have no experience, so your best bet is to look for how to do it on the Internet. For latest Android devices it is a simple as restarting the phone and checking for any warning signs, weird firmware logos or progress indicators.

## Check for dead / disabled cores in the CPU

This is again one point that never crossed my mind and I got burned with it on that mobile phone purchase that I intermediated. The mobile device, possible because of the battery charging issues, had 4 out of its 8 cores disabled (the BIG ones, from a BIG-little architecture). The result was that the phone was exhibiting quite some lag, not only in the more intensive apps but also in the menus and the home screen.

The approach here is to install a hardware review app (such as [CPU-Z](https://play.google.com/store/apps/details?id=com.cpuid.cpu_z) or [AIDA64](https://play.google.com/store/apps/details?id=com.finalwire.aida64)) and check for the reports on the device’s CPUs. Assuming it is a flagship phone (or close to that), chances are that you will see the CPUs running at a low frequency, with each scroll of the screen or other interaction with the phone spinning the cores up to higher frequencies. This is normal and should work like that. The thing to look for are cores that are marked as disabled or suspended. While the CPU might be just fine, a set of suspended cores shows possible issues in other parts of the device which lead to throttling of the cores.

## Check for connectivity issues (WiFi, Bluetooth, GPS, NFC, GSM)

We are close to the end of the list. The item here is covering the radios of the mobile device: WiFi, Bluetooth, GPS, NFC, GSM. The approach is to enable, one by one, each function and make sure it works correctly.

For WiFi and Bluetooth, enable the function and check that it correctly finds networks and BT devices around you. For GPS check that Google Maps or Apple Maps correctly find your location (might take 1-2 minutes to catch the GPS signal). For NFC would be great to have an NFC tag with you and use an application such as [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc) to check the reading and writing of the NFC tag. Finally, the GSM radio can be tested with a SIM card from you operator of choice.

## Check for network bands support and network operator support (SIM check)

And here we reach the end of this list. Last point to check is the correct support that the mobile device has for the network bands that are available in your country and, more important,the support that the device has for the network operator of your choice.

The approach is very easy, just bring a SIM card from your preferred network operator with you and test it on the device. If it recognizes that SIM card and connects to the network (shows a certain network signal strength) then you are good to go.

## Conclusion

The list crafted in this post hopefully provides a valuable set of things for you to check when buying a used mobile device. Chances are that, if your analysis of the phone validates all these points, the device is in good working condition and you should have no issues with it in the near to medium future.
