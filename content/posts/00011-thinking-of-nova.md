---
title: "Thinking of NovaOne"
published: 2016-08-20
tags: [idea, thinking, reasoning machine]
---

{{< note >}}
I originally published this in 2016.
{{< /note >}}

A couple of years ago I had some thoughts and ideas regarding building a system that could... to put it mildly... think. Sure, the quest is daunting and, at least at my age and considering I am not some hot-shot genius, it is really unlikely to do much in this area. However, the ideas from back then are still roaming in my mind, so I am taking this opportunity to lay them down and share them with you.

## Digressing a little bit

Two years ago I was finding myself in the main train station in Cluj, Romania, waiting for a train to take me home, to Brașov. While staying there and just waiting for the time to pass (the trains in Romania have the bad habit of ... taking their time :) ) I saw a little girl running around, under the close observation of her parent. While watching her running between the people who were walking on the boarding rail platform, I started observing how she made adjustments to her running path, in order to avoid hitting on people. While doing this, I also started thinking about the processes that (unconsciously) were taking place in her head. 

Sure enough, there are algorithms to compute the path, analyze the obstacles and find the best path in a given graph. But my thoughts were not about this. I was thinking that what I am watching is a simple, reduced model of the big thing. The child was nothing more than a grown-up but with reduced knowledge and also with reduced capability of how to learn. You see, when the kid is ... well, a kid, she can be characterized by 1 Pro and 2 Cons: 

- Pro: she has the ability to learn (she is intelligent, smart, her brain is capable of learning almost anything)
- Con: she doesn't have the knowledge to learn (she has no clue on how to learn, it is the job of the parents + school + environment to teach her that)
- Con: she doesn't have the knowledge, the actual information (but eventually she will learn all those things, she will get the knowledge).

But hold on for a moment. On a very small scale, this is exactly what a computer is. A computer has the ability to learn, (has all the potential to make connections, to correlate known things in order to get to new things) but has no knowledge of how to do this. And of course, has no capability to learn by itself. Yet.

## About NovaOne. Four items

After looking at how the little girl was able to avoid people by evaluating the current state, balancing possible actions at that moment and picking up the best path, in her cute run around, I started thinking about how to (try to) model the main things that were working on the little girl's case: sensors, executors, information and storage of information.

First, the *sensors*. The little girl used her senses and functions (mainly the visual one) to evaluate the current situation, the position of the people in front of her. The information was sent to her brain in a particular form (more on this later), stored (because if she will try later on, she will be able to remember that old lady that suddenly appeared in front of her, or that weird guy with sunglasses carrying that big luggage) and then analyzed by her brain.

Second, it's the *executors*. These are the modules responsible for executing the commands of the brain. The little girl's feet were commanded by the brain to run, to dodge, jump, strafe and so on. Her hands were commanded to keep balance, to work as an airbag in case a collision with one of the people on the rail platform could not be avoided. Each muscle of the little girl's body was contracted and relaxed separately, depending on the move that the brain decided on doing.

Next, we have the *information* and the *storage of it*. These concepts are some difficult ones. Sure, since we work in IT every day, it is not difficult to throw some DTOs in, some XML/JSON/you name it, some MySQL/object DB/cache/content repository/you name it, and you're done. But no, it is not that simple. Sure, since the aforementioned means are the only means currently provided by the current ecosystem, we will eventually have to use one of these. But the exact way of composing the information and storing it remains a problem.

## And the fifth

The fifth item is the actual brain. I will leave the poor girl alone (enough deconstruction for one day, for her) and pick up NovaOne. You might think that the brain is the most difficult one. It might be, but I think it is not. I think the brain should be a medium-sized package of algorithms, used simply for creating connections between what NovaOne knows, and what it needs to learn next. For example, if you hear something about [Grenache](https://harvestwineshopsd.com/blogs/grape-profiles/grenache-wine) you might know that this is a type of wine from Spain, but you might also not know a thing about what that is. By the name of it, it could just as well be a type of grenade, or a type of wall painting. Ore maybe a color.

The idea is that you have a set of information. Indeed, a very large one. When you learn about Grenache, when you read that this is a type of wine, you immediately make connections to what you know about wines, in general. In your mind some memories pop up, from when you were a kid, perhaps, and you were visiting a vineyard. Or a funny video that you saw 1 year ago on YouTube. Or some nice/bad taste that you experienced while having the dinner on a restaurant, and ordered some red wine.

All this information is stored in your memory, and (upon request) retrieved, replayed back to you. Also, the new information is correlated to what you already know, the connections are made, and the new data takes its place in your brain storage. Let's assume that you don't know anything about wines. You never heard the term *wine*, you never tasted a glass of it. And you hear that *Grenache* is a type of *wine*. Well, you make ONE single connection. From now on, for you *Grenache* is a *wine*. It could have been a *trumbulum* (no, that one really does not exit, I just made it now). For you they are both equal, *Grenache* can be a *wine*, or a *trumbulum*. Therefore, you go deeper, and ask: "what is a *wine*?". And you get the answer "well, a *wine* is something made from *grapes*". Damn, you also don't know what grapes are. Again, you make ONE connection. *Granache* is a *wine*, and *wine* is made from *grapes*. And you go deeper: "what is *grapes*?". 

## Go ahead. Extend

So you followed my thinking so far. You connected Grenache to wine, wine to grapes. Extend this, and add more and more connections and information. If you take one connection apart from all the other, you will see that it is not that difficult to implement it. At least not as difficult as it was when you started reading this post. Sure, I haven't posted any snippet of code or class diagram. I am currently just stressing the philosophy on this subject. But the point remains.

Making a computer correlate 2-3 pieces of information is, naturally, much easier than "*making it think*". But if you extend the whole model, and you add more and more information, and more and more relationships, you might get to complex inter-connections between various topics. You might get a computer that is able to give you a meaningful answer, to provide you with an corelation that proves that it considered the possible options and possible connections, that it selected from the store the connections required to compose the correct answer, and that it gave you the information you needed.

So, now my friend, isn't this exactly how you would define *thinking*?
