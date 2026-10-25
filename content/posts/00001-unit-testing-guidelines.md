---
title: Unit testing guidelines
published: 2016-04-29
updated: 2026-10-25
---

While developing a software service, an important part of the development process is writing unit tests. These (in most cases, small) units of code create the safety net that will protect you when making changes, refactoring code or implementing new features. Since we are humans, and prone to mistakes, we need at least this kind of system to make sure that the changes that we just performed do not break the system, and do not have unknown or hidden side effects in other components of the product under development.

Therefore, here are some of the guidelines and practices that I found very useful when writing unit tests (in my examples, I will use JUnit, but these guidelines hold for any other unit testing framework):

## Write independent unit tests

First of all, make sure that the tests that you are writing are completely independent. Under no circumstances use the effects and the leftovers from other tests (from the same test suite, or worse, from other modules). Do not use the records that are left in the database, or some files previously written on the disk. Do not use the objects and the settings modified by other tests in the common/shared objects and contexts (an example is the Spring context, which is shared between the tests that are Spring enabled).

Although in some cases useful, this practice is dangerous for future development. Imagine that, at some later point, you make a change, and one of the tests starts to give errors and report red bars. Naturally you go on and fix the test, and then you discover that 10 other tests are failing. And you move on, and fix those tests also (although those tests had nothing to do with the changes that you made to the code, in the first place). After that, 3 more tests start to fail, and then 5 more, and so on… And all of these, because you messed up the order and interconnection between tests.

## Use fixed input data for testing

Make sure that the unit test has a fixed set of input data. This input data can be set up in the initialization method (such as in the *@BeforeEach* or *@BeforeAll* method), or can be initialized by a Maven plugin. Regardless of the method for setting up the test, this set of input data gives you the comfort of operating with a well known set of data. You can write tests for this data, and also for data that is NOT in the set, just to see how the objects under test behave in these cases.

In a project that I worked on in the past, we had two SQL scripts: the first one called before-script, which was executed by the test in the *@BeforeEach* method, and which sets up the database for the unit test, and inserts the input data, and another one, called the after-script (executed in a *@AfterEach* method) which removes the test data, and brings the tables to the initial state.

## Clear your tracks after each test

This rule goes hand in hand with the previous two. After each test completes, make sure that in the *@AfterEach* method you clean up all the data that was created/modified/deleted by the test. Otherwise, you might get tests that are succeeding the first time they are executed, and fail next time. Or you might get tests that are failing simply because another test was executed before them, and the tracks were not completely cleaned up.

## Test the 3 paths: happy, edge, exception

A general tendency among programmers is to write tests that are stressing only the happy path of the code. That is, the tests are taking the common input data and feeding it to the CUT (Class Under Test) and making assertions regarding the expected output. This testing of the happy path is perfectly OK, since the unit test must make sure that the code is actually doing what it is supposed to.

However, the happy path is only a third of what the test should check. There is also the edge path and the exceptional path. The edge path covers those cases that are at the edge/limit/boundary of the allowed set of input values. If a method accepts an integer and computes something, then you should test that method for negative values, *Integer.MIN_VALUE*, *Integer.MAX_VALUE*. Of course, these are really extreme values, and in some cases the domain of permitted values is much more restricted. However, the limits of these domains must be fully tested, to make sure that the CUT behaves as it should.

The exceptional path covers the cases that are not expected by the CUT. Feed null values to your CUT, feed empty strings, feed strings with Chinese or Russian characters. What happens if you send *Double.NaN*? What if you send *Double.POSITIVE_INFINITY*? Or *Double.NEGATIVE_INFINITY*? Does the code behave as expected? Does it throw an IllegalArgumentException?

## Use test fixture methods for setting up the tests

Each test method needs a little setup before being able to execute. Whether it involves creating the mocks for the CUT (ClassUnderTest) or executing the preparation scripts for the tests, this setup code is required to be executed for each method.

Therefore, it is recommended to create fixture methods so that you don’t repeat the same test code in each method. JUnit provides *@BeforeAll*, *@BeforeEach*, *@AfterEach*, *@AfterAll* annotated methods for this. If you use a different unit testing framework, check the docs, there must be a way to accomplish this. If not, then you can always create the fixture methods in the test class, and then call the fixtures in each testing method, at the beginning.

## Design code with testing in mind

When writing code, always keep in mind that, after you finish implementing the current method or class, you will also have to test it. Therefore, implement the methods in such a way that they can be easily tested with various mocks and fake implementations of classes.

Example: instead of implementing the method *serializeMyObject()* with a *FileWriter* parameter, declare it to accept a *Writer*. This way, during the testing of the method, you can always pass in a *StringWriter*, and then assert the generated string.

## Document tests with JavaDoc

As any other piece of code, make sure that your test methods and classes are properly documented. It is important to describe in the test comments the tested class, the exact cases that each method tests, the setup performed for testing, perhaps the paths that are not yet covered (assuming that you don’t implement ALL the code paths in the same phase (which is something that you shouldn’t do ).

## Create environment independent tests

This means that you must refrain from loading resources from hardcoded/fixed locations from disk (use instead a resource accessible through the ClassLoader, from inside the module or the project, or accessed/downloaded from a central location/repository). Do not count on the current date and time for executing the test and running the assertions. Do not count on the locale from the machine that is running the test.

This will ensure that a report of a failing test does indeed mean that the implementation has a bug, or that the tests and the implementation are not synchronized, rather than the fact that your friend from the other side of the globe executed the test on a MacBook at 02:44 at night.

## Keep tests small and fast

Not much to add here. The tests should be simple and clear, don't make your testing code more complicated than your actual code. Setup – invoke – get results – assert. This will ensure that you don’t get to debug your tests (otherwise you might need to write tests for tests ).

## Do not write tests that need human intervention
 
Use assertions, failing and assumptions in order to make your tests as automated as possible. Do not implement the tests so that they write outcome data or testing results in the logs or in the *System.out* stream. Since your tests are most likely to be executed by an automated CI/CD system, there is really no one that will scan the logs upon each build of the software, and watch the logged data to make sure that the tests indeed printed “Oops, failed here!” or something like this.

Use the tools provided by your testing framework of choice to report results, which can then be collected automatically by the build system. For example, in a previous project I used TeamCity as a CI/CD service. This tool had a nice integration with Eclipse, in the form of the TeamCity Eclipse plugin. When an automated build failed, we were immediately notified in Eclipse that the build had failed, we could see which modules failed to build and test, we could see the stack trace, the log files, etc.

## Conclusion

These are just some of the guidelines that I read about and found very useful in practice. Unit testing is just one type of test that creates a safety net for confidently implementing new code or refactoring existing code. Keep things simple and make sure you test what is really relevant and useful for your application.
