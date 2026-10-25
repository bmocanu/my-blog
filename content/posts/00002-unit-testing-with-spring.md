---
title: Unit testing with Spring - A bad mix
published: 2016-05-15
updated: 2026-10-25
tags: [testing, unit testing, junit, java, spring framework]
---

Unit testing with Spring - bad mix

Friday, April 29, 2016

5:13 PM

 

UNIT TESTING WITH SPRING – A BAD MIX

 

There has been a discussion some time ago, on the JUnit group, about doing unit testing with Spring. The arguments provided in the answers to that question reminded me of a problem that we faced in one of my past projects: the usage of Spring for unit tests was a bad idea. Let me tell you how we started, and why we got to realise that it is not good to mix the well-known framework in the unit tests.When we started the project we thought that Spring is a nice thing to add to the tests. After all, with just a few annotations, you have an instance of the class under test ready for hammering. Spring takes care of creating and configuring all the dependencies required for our target instance, injects those dependencies, and we get an object that is ready for testing. However, are we writing unit tests or integration tests? I think the latter is the correct answer.

 

1\. Testing half of the system at once

 

Therefore, the first problem with using Spring is that you don’t test just one class (that is, one unit). No, you are integrating and testing a part of your system, composed of your class under test but also the other services that this class is making use of. Even if you strive to only test your class (which is what you should do, since that is the unit test for a particular class, not for the entire system or for a particular functionality of the system) you will be forced to rely on other services, and hope that the other services will work correctly, and if your test fails, then the problem is in your class. Which brings us to the second problem.

 

2\. When something breaks, you better be mr. Holmes

 

The problem \#2 arises from the fact that your class is mixed with other services. Since it DOES use other services, this is the normal way for the class under test to work, but it is not ok for unit testing. For unit testing you need isolation. Why? Because only then you know that if a test fails, then you have a problem in either the class under test or the actual test that fails. You don’t have to search on 5 other services to make sure that the data retrieved from those services was correct and that the tests of the other services are correct (if they are correct, then at least you know that your class is the best candidate for the flaw owner). By making a change in a class and getting several tests to fail is a clear sign that your unit tests are not done in complete isolation and are depending one to another.

 

3\. Working with test data

 

Preparing the test data for an unit test that is using Spring can be a pain in the ass. Since your services are processing and returning the data to the class under test, you need to know very well that kind of processing those services are doing, how should the input data look like, and you must tailor the input data so that after it gets through the processing of 5 services, it reaches your class under test in the shape that you want it. This, in most cases, involves custom test files and custom database records. A good approach to solve this problem is creating a fixed testing database content, which is used by all the tests. While this works for most cases, you will quickly find the need to throw some wild data to your class under test, just to make sure that you are also testing the limits and the special cases for the class methods (not only the happy paths). Since the setup for this wild data breaks the initial contract with static test data inserted in the database, you will have to resort to workarounds in order to reach your goal.

 

4\. It’s only time…

 

With a good architecture and sound testing practices, you can make your live easier, even if you have to deal with the first 3 problems. However, what bothered us enough to decide that testing with Spring is bad was the time. Running a test was taking, in some cases, even 2 minutes to start. That is because Spring has a lot of dependencies to create, a lot of things to load and to start up, and it might take 2 minutes to setup the application context and create the instance of the class under test, until you get to see the first method executing. All in all, we found that half of the time the build system required to build our project was spent on creating and destroying Spring contexts.

 

Removing Spring from tests

 

Therefore, we decided to remove Spring from tests. We are using Mockito (we started with EasyMock but decided that Mockito’s methods and approach look better in code) to create mocks for the services that the class under test needs. Since Mockito allows you to make all the mocking and wiring through annotations, in some cases we don’t even need the @Before setup method. Moreover, with such mocks much more easier to prepare the test data. Since you only need to specify what data should be delivered to the class under test, you can focus on the class your are testing, and remove from your mind all the other services. You are effectively and efficiently testing your class in isolation.

 

Another nice thing with this approach is that you are forced to create your classes easy to test. Your classes will not be too coupled with other classes, because if they are then you will have a bad time writing the unit tests and you will like more and more to work with interfaces instead of concrete classes (even though Mockito and also EasyMock can create mocks for concrete classes).

 

Your tests will be blazingly fast, because all you have to wait for is the JVM to start. When something will break, it will surely be a problem in the class under test or the actual unit tests. You know this for sure, because everything that the class is using are mocks, and mocks do what they are told to do. They don’t have bugs outside the unit test.

 

Epilogue

 

To finish my story, we are currently in the process of removing Spring from the unit tests. Whenever we have to work on a test that has Spring, we first remove Spring from it, then we do the update that we had to do in the first place. In time, this showed that the tests are becoming simpler to read and understand (for someone looking at that test for the first time), the build time gets smaller and you also get the nice feeling of working with small unit test boxes that are completely under your control.
