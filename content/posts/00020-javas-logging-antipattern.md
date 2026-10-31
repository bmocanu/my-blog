---
title: "Java's logging anti-pattern"
published: 2026-10-27
tags: [java, logging, anti-pattern]
---

The other day I was working on a task that involved a bit of code refactoring. Nothing big, just some code shuffling, a bit of class renaming in order to prepare the ground for the new feature to implement. It was business as usual: I checked the classes to rename, checked their usage and what is the impact of the refactoring. I also checked the occurrences of the class name, just to ensure that I leave no comments behind or other text elements (e.g. properties, config names, etc) with the old name. Some of these occurrences were in log configuration files: the [Logback](https://logback.qos.ch/) configuration for dev testing and staging envs were using the fully qualified name of the class for logger configuration (level, pattern, target adapter).

The production configuration was not in the same repo, and anyway I did not have access to that configuration. So I could not change it. Not without talking to the client and to its DevOps team and plan a configuration migration to the new logging configuration.

The realization of this last part struck me. It did this for 2 reasons:
1. How come I never stumbled on this before? That is, how come a code refactoring / class renaming was impacting the production env configuration NOW, and it did not impact me in some of my previous projects?
2. How come something seemed deeply broken at a very basic level with the logging framework usage, though I just followed the generally promoted practices of the most common logging frameworks?

## The problem

The most popular logging frameworks in the Java world have a very similar architecture: {{< accent >}}loggers{{< /accent >}} and {{< accent >}}appenders{{< /accent >}}. Loggers are generating the messages or events to log, appenders are writing those events somewhere: STDOUT, a file, a database, a socket to rsyslog, ElasticSearch, etc.

The loggers can be aggregated in a hierarchy, to allow for inheritance of properties from parents to children. The aggregation happens via the logger's name, similar in concept with the Java package names: a logger named 

{{< mono >}}abc.web{{< /mono >}} 

is a logical parent for 

{{< mono >}}abc.web.controllers{{< /mono >}}

which in turn is a logical parent for 

{{< mono >}}abc.web.controllers.profile{{< /mono >}}

The goal here is to allow for global configuration of all loggers under a parent, e.g. all loggers under 

{{< mono >}}abc.web{{< /mono >}} 

should log as INFO and to the STDOUT appender.

The similarity with the Java fully qualified names led immediately to the adoption of this naming strategy as the de-facto way for naming your loggers. If you look at the documentation of most popular logging frameworks (Log4j, Logback, SLF4J), they all propose this naming of loggers, either with the name of the class as a string or directly with the class object, from which the logger extracts the fully qualified name.

And here we get to our problem. Since the names of the loggers are a factor used in the configuration of the application, the names chosen for the loggers are the name of the internal packages and classes that are used for implementing the Java service. These fully qualified names are then being used in the service logging configuration files (*logback.xml*, *log4j.xml*, *application.yaml*). Any refactoring of packages or classes will quickly invalidate the dev, testing and production logging configuration, requiring a migration of those configuration files.

## The unseen API

{{< mono >}}To be continued...{{< /mono >}} 

## Resources

- [Logback configuration](https://logback.qos.ch/manual/configuration.html)
- [Log4j Getting started](https://logging.apache.org/log4j/2.x/manual/getting-started.html)
- [SLF4J manual](https://www.slf4j.org/manual.html)
