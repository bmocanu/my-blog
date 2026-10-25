---
title: "From the past: the need for a new client-server web model"
published: 2018-01-17
---

*Note: this is a long two-part post that I published back in 2008 (here I included both parts). I am revisiting and reposting this as it makes some sense for a more up to date topic: A quick review of the Google Polymer project (upcoming).*

We are building complex web applications for years now, and the dialog between the pages that browsers display and the server backend is well known and with very clear and simple rules. But did it ever occur to you that, what for the browser and for the server backend is a perfect and normal dialog, for the developers AND for the users (at least for those users that are able to see this) this is all just a very big and nasty simulation?

## Unfolding the idea

Here is what I am saying: the browser requests a page, the server receives the request then, according to some configuration files (I am thinking now at the Java platform, but this is similar to any other backend platform, be it C/C++, .NET, Ruby On Rails, whatever), it selects the piece of code to execute, lets the code to execute and then returns the result to the server. All good here, this process is perfectly logical and, for both parties, there is nothing simulated here.

But for the developer this dialog is OK and normal only if he or she creates a simple personal web page or some presentation site, similar to a Word document but with links between pages. For any web application that is just a little bit more complex, many simulations and workarounds and tricks that are not really natural must be performed.

Think about this: the web was statical, now it is dynamic. It was never interactive.

In the first years of its life, the net was statical. Files were transferred at the user commands, the documents that were serverd were statical. Then people introduced the dynamic documents, which were (and still are) generated according to some criteria, some user input and history of user activity. Databases and repositories are now powering the web applications and are providing the data to populate the documents that are presented to the user. However, this is all the user gets: documents.

You might say: “*wait a minute! This is not true, we have Ajax and JavaScript and interactive content and so on. We can create complex interactive applications, some of them looking just like desktop applications, with windows, dialogs, menus and so on*“.

But is it really like that? Ajax is just a dummy protocol to request a page behind the scene. JavaScript is just an interpreted language to make the browser move some DIVs in front of your face and perhaps generate some dynamic elements on the page. This is not interactive content. This is just the best we can do right now.

### Simulation on the client side

Currently, when we implement a web application, we have to simulate multiple things. On the browser/client side, we have to implement the *interactive* part. Sure, we have many JavaScript libraries that are doing this for us, so that we don’t have to write so much imperative code (code that tells the browser how to do something) but more descriptive code (we tell the browser what to do, what we want to have). This is a very useful addition to any web application programmer toolkit. But still this is not interactive.

The *window* that is opened in front of the user is just a DIV panel opened on top of a bigger transparent DIV panel that forbids the user from clicking on the background. The small panel can be moved (which again is a simulated movement, implemented by the developer directly or by the JavaScript UI library that you use) or not, the controls appear and disappear and so on. Everything looks pretty, just *like* a desktop application. Yes, indeed, the capital word here is *like*.

Next, we can discuss about the dialog with the server. Unless we use Ajax, everything is document-centric without any argue. You click a button, the screen goes white, and voila, you get the new document. Nothing interactive here. We can add Ajax. Behind the scene the browser does the same thing, but this time you click the button and the document remains displayed on the screen and only a small part of it is changed. Again, changed, but how? By simply hiding a DIV panel and showing another one. Or by using the great *myDiv.innerHTML* property. Again, simulation top to bottom.

### Simulation on the server side

After finishing with the client side, we move on to the server side. I will take the case of the JEE platform, since this is what I am most familiar with. On the server side we write servlets. Plain and simple. Not JSF, Tapestry, Wicket, etc, just servlets. Any of these technologies must have a servlet. What happens after the servlet gets the request depends on the servlet configuration files.

OK you say, so, what if we have servlets? Is not like we have to deal with servlets anymore. No, indeed. Each technology has its own start servlet, you just configure it in web.xml and you’re set. From this point on you simply start implementing according to the rules (which are simple or complex, depending on the chosen technology) layed out by the respective technology. Ok, but think about this: you will always have to write 2 things: back code (beans, actions, action forms, page objects and so on) and HTML/JSP/JSF pages to compose the next page. So again, you are not doing anything interactive in your code, you are just composing documents. Documents to feed to the client. Dynamic documents, I agree, but still not interactive.

Windows/Linux/Mac, when they are opening an window, that can be called interactive. The web has never been interactive.

## So this is my proposal

In my opinion the current dialog protocol is no longer sufficiet for the needs of many of the applications that we build today. We inherited the HTTP protocol and the HTML language from the days when getting a document from the server was all there was needed, and currently we are trying to turn this document-fetching operations into something interactive, something that works just like a desktop application. But it doesn’t work, those applications that do look interactive/snappy/web 2.0 are just fully loaded with Ajax and JavaScript on the browser side, with hard core workarounds and tons of libraries on the backend side.

When I say *interactive* I talk about that form of a dialog where the user is working directly with the window or the UI elements that he/she sees, where clicking on the *Save* button makes the data persistent in the local or remote storage and I can keep working on my current tasks in the application, where I can minimize applications to taskbar or to the system tray, where I can create shortcuts to my applications on the desktop, where I can have my “.xyz” files opened with that application, and so on. All this directly through the browser.

Sure, we can have many of these implemented using Ajax and JavaScript but, as I said above, this is a simulation for both users and developers.

### Changing this

First of all we have applications nowadays that are fitting the old document-request model really well. Documentation sites, company advertising website, presentation hubs, personal websites/blogs and so on cope very well with this type of dialog, so the new browsers and servers should still be able to support this document-fetching model.

The new dialog model I believe should be based on a binary format. The data that will be transferred between the server and the browser will be quite large, so compression should be available. Also security will be enhanced if the format is binary.

Next, the browser should be implemented in such a way so that it is able to create on-demand modal windows, panels, dialogs, list boxes and so on based on the information received from the server. The classical buttons like *Home, Refresh, Back, Forward* must be removed, since it doesn’t make sense to use them in such applications. Everything starts from the main window, where you get the basic data, then you start doing your work with the elements from that window, open panels, save data, add/remove/edit items and so on. You don’t need to get to the next page or return to a previous one because… there is no previous one. You are not working with pages anymore, you interact directly with the application and its UI elements.

Since the client is working in one place and the server is in some other and distant place, the connection between them might fall at any moment. The browser should be prepared to take the application offline, store the data locally in some internal database and then, when the connection to the server is re-established, synchronize the data and transfer the items created during the offline session back to the server. This should be transparent to both the user AND the developer. Of course, when the application is taken offline, the user should be notified that several services or functions of the application are no longer available until the connection is back online, because the data that was fetched from the server-side storage is available locally, but any additional data cannot be fetched from the server since there is no connection available yet.

The development model for the client side should be as simple and straightforward as possible. Glue code and classes should be provided for making the connection between the code for the client (/browser) and the code for the backend services.

On the backend side, things are not as different as they should be on the client side. However, a framework or again some glue code should be provided in order to make the connection with the code from the client side. This framework/glue-code should also handle gracefully the part with the synchronization of the data from the client with the data from the database, after a session of dropped-connection/offline-working.

### How about Flex and GWT?

True, [Adobe Flex](http://www.adobe.com/products/flex/) and [Google Web Toolkit (GWT)](http://code.google.com/webtoolkit) are two technologies that provide some of the features that I want from the new model (of course, there might be other technologies besides these two, so please add a comment if you are aware of some more). However, what they really do is to create just another layer in front of the users and the developers, in order to hide the fact that every click results in a Ajax call or in a hidden iFrame being refreshed.

### How about Google Gears?

Indeed, [Google Gears](http://gears.google.com/) is an example of how the browser should handle the dropping of the connection between the browser and the server. But something that I think the Gears application doesn’t have (yet?) is a mechanism for automatically handling the synchronization of data between the client and the server. How can this be done? I am not sure, perhaps by recording the actions performed by the user, and then replay them to the server, once the connection has been re-established. This will ensure maximum transparency for the client code, while for the server the things will look as if they are being performed by the user operating the client application very fast. But anyway, this is just an idea, probably a much better solution could be designed for this.

## Epilogue

This is a long post. Back in 2008, when I published this, it was a two-part article. I am reviewing here the current (as per 2008) state of web development and web applications in general, and I note the discrepancy between what web developers try to achieve and what is actually happening in real life. A new model is dearly needed, one that provides a smooth and solid experience to the user and a more natural and intuitive coding environment for the web developers.
