---
title: "Combining JUnit theories with Spring"
published: 2016-04-29
updated: 2026-10-26
tags: [junit, spring, theories, unit testing]
---

{{< note >}}
I originally published this in 2016. This post refers to Junit 4.
{{< /note >}}

In almost any project that is using Spring, you get to the point where the Spring’s dependency injection mechanism is required also for unit tests. Combining this with JUnit leads one to the usage of the *SpringJUnit4Runner* to enable the initialization of the Spring context, as well as the autowiring of various beans in the test object that is just being executed.

However, for more specialized unit testing purposes, such as implementing parameterized tests or theories, one must use a specialized runner (*Parameterized* and *Theories*, respectively). This, of course, gets in conflict with Spring, which needs to use it’s own runner. JUnit does not support multiple runners for the same unit test (and except for the Spring runner, all the other runners are pretty excluding one another so it kind of makes sense to allow only one runner at a time).

Here is a way for implementing a unit test class that is using Theories and Spring, combined:

```java
import org.junit.Before;
import org.junit.experimental.theories.DataPoints;
import org.junit.experimental.theories.Theories;
import org.junit.experimental.theories.Theory;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestContextManager;

@RunWith(Theories.class)
@ContextConfiguration(locations = "classpath:/spring-context.xml")
public class IndirectSpringTest {

    private TestContextManager testContextManager;

    @Autowired
    private PointProvider provider;

    @DataPoints
    public static int[] inputIndexes = { 0, 1, 2 };

    // ———————————————

    @Before
    public void setUp() throws Exception {
        this.testContextManager = new TestContextManager(getClass());
        this.testContextManager.prepareTestInstance(this);
    }

    @Theory
    public void testThatEverythingIsWell(int index) {
        String point = provider.getPoint(index);
        System.out.println("Point: " + point);
    }

}
```

The central point of the sample code is the usage of the *TestContextManager* class for loading the Spring context (this is performed only once per unit test class, not for each method) and for initializing the test object before starting the actual test. The *prepareTestInstance()* method makes the autowiring of the test object’s dependencies, therefore simulating the behaviour of the *SpringJUnit4ClassRunner*.

On a general note, keep in mind that JUnit creates a new instance of the unit test class for each test method. The order of the methods is:

1. *@BeforeClass* static method
2. constructor
3. *@Before* method
4. test method
5. *@After* method
6. goto 2 and repeat for each test method
7. *@AfterClass* static method
