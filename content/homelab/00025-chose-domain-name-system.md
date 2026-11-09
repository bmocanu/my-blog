---
title: Choose a domain name system
published: 2026-11-09
updated: 2026-11-09
tags: [homelab, dns, domain name]
weight: 25
---

Building a homelab means wiring up and managing multiple physical machines, each one with perhaps several virtual machines and services. You will quickly get to work with a lot of IPs and ports for all applications that you will host. While for the IPs you could come up with a scheme to remember, for ports things get really difficult really fast, as each app gets its own port for the web interface, the API they expose, the file transfer interface, some have user web interfaces separated from admin web interfaces, etc. 

The solution to this is: `A` a DNS domain and subdomain system, `B` an internal proxy that implements a simple naming scheme. 

## Going without domain names

The simplest approach is to not bother with a domain name system. Split the available IP range into buckets, one for each physical machine, then use a notebook or a notes app to write the IPs allocated for each machine and the ports allocated for each service. 

Using a homelab dashboard is a great way to take these details off your mind. While it is still advisable to maintain notes on IPs and ports used in each machine, it makes jumping to your target application or service much faster and pleasant. 

## If domain names, then DNS

If you decide to go for a domain name system (either public or self-issued) you need the DNS. Something must be able to resolve a domain like `myservice.mydomain` to an IP, either one of a machine or one of a proxy that can then provide you with the page that you requested. 

You can get DNS functionality either from your router, if it supports that, or by installing [PiHole](https://docs.pi-hole.net/main/basic-install/), which will add more goodies to your homelab and network besides a DNS service (i.e. domain filtering, ad blocking, malware protection, DNS query logging). 

## An internal proxy makes wonders

After setting up DNS, you might want to consider an internal HTTP and TCP proxy. This will allow you to build a unified system for accessing applications in your network. A Grafana installed on a particular machine can be accessed like `grafana.poseidon.mydomain` (*grafana* is the application, *poseidon* is the name of the server, *mydomain* is your chosen domain) but you have to remember on which machine you installed it.

Much easier is to have Grafana accessible at `grafana.mydomain`. In most cases, and unless you run multiple different instances, you should not care where Grafana is installed, unless you are managing the installation of it. 

As proxy, I use [HAProxy](https://www.haproxy.org/). I configured it so that all the web interfaces of all the applications that I host are proxied by it, with web domains assigned to each application. Since I also have TLS certificates installed on the proxy, I get secure web connections to all hosted applications, regardless of whether that application has support for this or not.

## Machines vs Web applications

Before choosing a type of domain system, you need to consider another issue: you will most likely need at least two types of domain names: one set is for machines (servers, virtual machines, other appliances in your network such as managed switches, IoT devices, NAS-es, etc.) and web applications accessible over the network. 

The names might, by themselves, be enough, but some combinations of machine and web application might lead to conflict. For example, Home Assistant will require a virtual machine where the services run and also there will be a web application to access and configure your smart home. A domain like `homeassistant.mydomain` is confusing, you don't know if it is the machine or the web application.

My proposal is to have machines and network clients use simple domains like `<machine>.mydomain` and web applications to use domains like `<webapplication>.web.mydomain`. This way, you know that a server called *poseidon* is accessible via SSH at `poseidon.mydomain` and the Grafana application is at `grafana.web.mydomain`. 

## Choosing a public domain

So here we get to finally picking up a domain.

Your first option is to go for a public domain. These have the HUGE advantage of being automatically trusted by all your clients in the network, be it laptops, phones, tablets or other nodes. Since you will generate certificates using a provider like [Let's Encrypt](https://letsencrypt.org/), the issued certificates are automatically trusted, as they are created by a trusted Certification Authority (CA). 

Even though you pick a public domain, the machines and services that you install in your homelab do not (and frankly most of them should not) be public/Internet facing. For the domain, you can go to a domain provider (GoDaddy, Namecheap, etc) and pick a domain like `myhomelab.io`. Since you control that domain, you can easily request a wildcard certificate for it or for a sub-domain of it, like `*.homelab.io` and `*.web.homelab.io`. Once you have this, in your internal proxy you can map domains like `grafana.web.homelab.io`, `server11.homelab.io` to machines and services. 

As it's the case with Let's Encrypt, the generated certificates expire after 90 days. You need an automated way for generating the certificate in the last 30 or 15 days of certificate validity, so that you never reach the expiration of the certificate. I cover this in the [Get internal TLS certificate](/homelab/00050-get-internal-tls-certificate).

## Choosing a local domain and self-issued certificates

The second option, and this is the one that I use, is to create your own Certificate Authority and generate certificates for an internal domain that you want. You can decide on whatever domain you want: `*.homelab`, `*.home`, `*.mynet`, etc. I went with `*.home` as it is short and easy to type.

{{< note header="Note" >}}
Avoid the `*.local` domain, as it clashes with the multicast DNS service on Android devices. Starting with Android 12, trying to load a page based on the `*.local` domain will route your requests to locally running services, inside the Android device, not to the DNS service that your network is using. 
{{< /note >}}

So, pick a domain for your network and prefix a *web* sub-domain to it for your web applications. Then you can start creating name mappings for the nodes and web applications in your network, use these names for accessing these entities.

Here are samples of such domain names from my homelab:
- `ssh user@atlas.home` - SSH into the Atlas server
- `ssh user@llm.dante.home` - SSH into the LLM VM, running on the Dante server
- `ssh user@pihole2.home` - SSH into the (second) PiHole server (running of a Raspberry Pi 5)
- `telnet grafana.web.home` - call Grafana running in my homelab (I don't care, at this point, on which machine or server it is - I just want to access it)
- `ssh admin@homeassistant.atlas.home` - SSH into the HomeAssistant VM running on the Atlas server
- `telnet homeassistant.web.home` - access the HomeAssistant web interface

## Public vs local

Here is a table comparing the two options: public domains vs local domains:

| | Public | Local |
| - | -------- | ------- |
| Cost | $25 - $200 / year | Free |
| Trusted in the network | Yes | Requires self-issued CA trust |
| Require TLS certificate renewal | Yes, each 90 days | No (you can generate certificates valid for 10 years) |
| Allows sub-domains | Yes | Yes |
| Allows wildcard (sub)domains | Yes | Yes |
| Allows separation of machine and web domains | Yes | Yes |
| Allows TLS certificates | Yes | Yes |
