---
title: "The Google Polymer project: revisiting the new browser-server model"
published: 2018-02-15
updated: 2026-10-25
tags: [google, google polymer, new protocol]
---

{{< note >}}
I originally published this in 2018 and updated it today, for the new installment of this blog.
{{< /note >}}

At the end of 2008, I published a [two-part article](/posts/00006-from-the-past-the-need-for-a-new-client-server-web-model/) on the problems that I saw back then for the browser-server model (as I was calling it at that time), mainly a set of complaints and a set of possible solutions that I saw for the rigidity of the [HTTP 1.1](https://tools.ietf.org/html/rfc2068) and the static + stateless + document-based nature of the web applications.

Well, it turns out that, 9 years after that article, I was quite right. Since then, several steps have been taken towards making the life of the developers easier and the experience of the end user richer. [HTML 5](https://www.w3.org/TR/html5-diff/) came out, [HTTP/2](https://tools.ietf.org/html/draft-ietf-httpbis-http2-16) was drafted, the web applications have grown in size and functionality (moving towards a more fatter client), the web application frameworks have grown in functionality and support for rich client applications.

Moreover, the [Web Components specs](http://webcomponents.org/) came out, an “umbrella” for four W3C specifications:

- [Custom Elements](http://webcomponents.org/articles/introduction-to-custom-elements/): allows new tags to be defined, on top of the standard ones provided by HTML 5. Each tag can have custom lifecycle, with custom lifecycle event handlers.
- [HTML Templates](http://webcomponents.org/articles/introduction-to-template-element/): builds on the Custom Elements spec and provides tags for creationg HTML templates that can be used to easily aggregate the web application UI.
- [Shadow DOM](http://webcomponents.org/articles/introduction-to-shadow-dom/): allows isolation of CSS fragments to only the scope of the respective web component. This helps the component in maintaining its own CSS, with protection from conflicts with the CSS elements defined in the parent/root style. Also allows project, with provides custom places in a web component where the developer can place other web components.
- [HTML Imports](http://webcomponents.org/articles/introduction-to-html-imports/): allows simple composition of HTML pages by importing HTML fragments in the current page. JS and CSS imports are also resolved and executed as soon as the HTML fragment is loaded.

I would also add to these specifications the [Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) functionality of most modern browsers, which allows a JavaScript code to run in a separate process than the one in which the browser is running. Service Workers can respond to push notifications on the client. They can also act as proxies between the web application code and the network, being first asked for each resource that is requested by the web application.

The enhanced support for rich end user experiences is just half of the story. In the other corner of the ring you can find new requirements and pressure on the web application development, such as:

- Proliferation of mobile devices and consumption of web applications and web services on mobile devices.
- A generation of users that is moving away from standard desktop and laptop computers and moving deep into the mobile devices.
- More and more countries from the less developed parts of the world get access to the Internet and have absolutely reasonable demands for web applications that are loading fast, are rich in content at a cost of the bandwidth that must be as low as possible. The mobile plans in these countries are quite expensive and loading all the resources of an (unoptimized) web application might break the bank

The Google’s [Polymer project](https://www.polymer-project.org/1.0/) builds on the 4 Web Components specs and on the Service Worker functionality in order to come as a response for these requirements. The library provides a sugar coating on the 4 Web Components specs with a final goal of embedding all the library support that is required for the 4 Web Components specs into each browser (Chrome, Firefox, Opera, Safari, Edge), so that end users don’t need to pay for the cost of transferring these libraries anymore.

The Polymer project is a work in progress and, while not embodying the praised new browser-server model, it moves towards this new model. Future plans exist to combine Polymer with the HTTP/2 capabilities for efficient web application resource delivery (see the [PRPL pattern](https://www.polymer-project.org/1.0/toolbox/server)).

## Takeaways for technical leads and software architects

Now, this blog focuses mainly on solution and software architecture. A web application framework such as Polymer or the Web Components specifications is not really in my focus, given the localization of the impact on the frontend of the application. However, since it resonated so well with my 7-8 years old critique on the limited capabilities of the web application underlying drivers, I decided that an article of these developments fits well with the past.

In terms of the impact that technical leads need to consider with the Web Components specs and the Polymer project, I think the technology is still in its infancy. An adoption in your project at this moment is quite risky, as the standards are not completely drafted, support is still limited from both the browser providers and the community. All in all, though, it looks like a well established technology for the future of web applications, so I strongly recommend to keep an eye on it.

For the software architects out there, the Web Components specs and the Polymer project are isolated in the frontend / end-user facing tier of your applications, with limited impact on the other backend services that your solution might contain. I would recommend, though, to consider the following points when making a switch towards Polymer and the 4 Web Components specs:

1. The architecture of the client web applications is heavily impacted. The introduction of the Service Worker with its proxy capabilities requires careful consideration of how resources are fetched and processed, and even some of the business use cases might require reorganization.
2. The web artifacts will, probably, require a different organization on the UI backend service.
3. High on the heels of #2 above, any CDN that is employed between the web clients and the web artifacts might require some restructuring, as delivering a different combination of web artifacts and web resources (combined with the proxying and caching capabilities of the Service Worker) migt need a rethinking of what each CDN delivers and when.
4. Last but not least, aiming for a rich web application experience with advanced offline application support might need a complex functionality on the UI backend service and other connected services for re-synchronization of data once the web application comes back online.

## References

The following materials were used in the writing of this article:

- Software Engineering Daily podcast, June 6th 2016, [“Google’s Polymer Project with Rob Dodson”](http://softwareengineeringdaily.com/2016/06/05/googles-polymer-project-rob-dodson/)
- [The Google Polymer project](https://www.polymer-project.org/1.0/)
- [The Web Components specs website](http://webcomponents.org/)
- The [browser support](https://blog.revillweb.com/web-component-challenges-a09ebc598d65#.berenqcq9) for the Web Components specs
- [My article from 2008](/posts/00006-from-the-past-the-need-for-a-new-client-server-web-model/), ranting about the back-then state of web development and the proposed solutions
