---
title: "Custom protocol handlers in Java"
published: 2016-04-20
updated: 2026-10-25
tags: [java, groovy, protocol handler]
---

{{< note >}}
I originally published this in 2016 and updated it today, for the new installment of this blog.
{{< /note >}}

In the project that I am currently working on, we are using Groovy and the Groovy Script Engine. This class has a constructor that accepts a path (relative to which it resolves the scripts to execute) or a list of URLs. Well, the class works pretty nice with files, loading the scripts from disk, executing them, and also watching them for changes (this is actually why we are using this class as startpoint for Groovy).

After a few days, we got the need of taking the scripts and putting them in the database. We wanted to make Groovy load somehow the scripts from the DB, and execute them. We also wanted to keep the nice feature with looking for changes and reloading/recompiling/re-executing the script each time it is found to be modified.

## Going the URL way

Naturally, the starting point for our solution was the URL class. Since that is the only thing that can be fetched to the GroovyScriptEngine, that was the starting point. We decided to implement a handler for a custom protocol, say script, and the URLs like

{{< note >}}
script://scriptservice/security/login.groovy
{{< /note >}}

would be resolved to the Script table, fetching the content of the property named “scriptservice.security.login.groovy“.

As you can read here and here Java provides a nice procedure for creating pluggable handlers for custom protocols. There are 3 steps that you need to follow:

- implement a custom URL stream handler. This class must extend URLStreamHandler and must implement the openConnection( URL ) method. Here you can decide whether to handle the URL by yourself, or delegate to some other handler (perhaps to another custom URL strema handler from your code base, or to the default one, provided by JDK).

- implement a custom URL connection. This class must extend URLConnection, and must implement the connect() method.

- decide on a strategy for using the custom stream handler. As you will see, there are 3 types to plug in your custom protocol handler in Java.

## The URL stream handler

The first class that I wrote is the custom protocol handler.

```java
public class ScriptURLStreamHandler extends URLStreamHandler {

    private static final String SCRIPT_PROTOCOL = "script";

    @Autowired
    private ScriptService scriptService;

    /**
     * {@inheritDoc}
     */
    @Override
    protected URLConnection openConnection( URL url ) throws IOException {
        String protocol = url.getProtocol();
        if ( !SCRIPT_PROTOCOL.equals( protocol )) {
            // reside to the classic URL handler
            URL classicURL = new URL( url.toString() );
            return classicURL.openConnection();
        }

        String host = url.getHost();
        String path = url.getPath();

        // convert and combine the host+part (just for demo)
        String scriptName = ( host + "." + path ).replace( ‘/’, ‘.’ );
        Script script = scriptService.getScript( scriptName );

        return new ScriptURLConnection( url, script );
    }
}
```

The code should be pretty straightforward. At first we must handle the case when an URL that is not with the script protocol reaches our handler. This could be possible, for example, if you use the explicit specification method for plugging in the handler (more about this in the plugin strategies, below).

## The URL connection

To wrap the script data (content+timestamp) we need to implement our own URL connection.

```java
public class ScriptURLConnection extends URLConnection {

    /**
     * The code of the current script.
     */
    private String scriptContent;

    /**
     * The timestamp when this script was last modified.
     */
    private long lastModified;

    /**
     * @param url
     * @param scriptContent
     * @param lastModified
     */
    public ScriptURLConnection(URL url, String scriptContent, long lastModified) {
        super( url );
        this.scriptContent = scriptContent;
        this.lastModified = lastModified;
    }

    /**
     * Convenience constructor, for creating script URL connection starting
     * from a {@link Script} object.
     *
     * @param url
     */
    public ScriptURLConnection(URL url, Script script) {
        this( url, script.getScriptContent(), script.getLastModified() );
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void connect() throws IOException {
        // no code here (no need for it)
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream( scriptContent.getBytes( "utf-8" ) );
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public long getLastModified() {
        return lastModified;
    }

}
```

The class implements the connect() method (although without any code inside) and it also overrides the getInputStream() (where we provide the script content as a BAIS) and the getLastModified() method.

## Plugin strategies

Java provides 3 methods for plugging in the custom protocol handler.

The first one is the sun.net.www.protocol.\_\_\_\_\_.Handler one. You implement the custom URL handler in a package called, as for our example, sun.net.www.protocol.script, and the name of the class must be Handler. Then you create the URLs in the normal way. Java will identify the weird protocol, and will attempt to find the class located in that package (note: this is exactly how the HTTP, FTP, GOPHER, etc protocol handlers are implemented in Java).

However, I discourage this strategy since it is not guaranteed to be portable (the format of the package is not specified in the Java Specs, and we can also safely assume that OpenJDK, for example, will have a different name for this package).

The second one is the java.protocol.handler.pkgs one. This requires you to set a Java property, when starting your program or server, so that it indicates which packages should be scanned for finding the protocol handlers. By default the property seems to be empty, so setting this property to any package you like should work just fine.

This strategy is clearly more portable than the one before, but in many cases it is not usable, since the target environment might have restrictions (I am thinking at the production environments of most clients, where you cannot set weird properties like this one ).

The third strategy, and also the one that is most portable and safe, is the explicit specification one. This involves creating the URL objects using the 3-parameters constructor.

```java
public static void main( String\[\] args ) throws IOException {
    URL url = new URL( null, "script://scriptservice/security/login.groovy", new ScriptURLStreamHandler() );
    URLConnection connection = url.openConnection();
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    IOUtils.copy( connection.getInputStream(), baos );
    
    System.out.println( baos.toString() );
}
```

This is clearly a much better way, although it might not be feasible in all cases (especially in those where the URLs’ creation is out of the programmer’s scope). Another advantage of this solution is that it allows you to specify the instance of custom URL stream handler to use, therefore allowing for good integration with IoC containers, like Spring.
