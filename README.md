# shieldmate
EDH Shieldmate Source Code

-Gonna keep only the code here due to obvious reasons (everything but design assets and such)-

<hr>

<h2>Introduction</h2>

So! I am a beginner developer and decided to try my hand at javascript / css. This app is more of a learning process than a product itself. Being a dedicated EDH player in the MTG world, I thought hey why not, lets make this happen.

This project is fun, I like to add stuff to it and learn along the way how to deal with performance issues and so on. But I feel I'm close to reaching a technical ceiling and I'll study other technologies for android development. When I started this, I opted to go hybrid because I thought I'd be releasing in all three platforms (microsoft was still a thing back then) at the same time but alas, reality is not so gentle. Publishing to iOS went from a priority, to a desire, to me simply not caring anymore.

Main issues about the code overall: It has a lot of hard coded stuff, and this bothers me a lot. I've been meaning to get to that but since time is limited, I decided to make a priority out of the stuff the user will actually see and use. The javascript isn't brilliant either.

<hr>

<h2>What is New</h2>

Since its inception I've added a ton of new stuff to the app. Gonna list them below.

<h3>Oathbreaker Support:</h3> Widely requested. It is just a simple counter button, just like the experience one. Doubles as a partner commander counter as well. Now, if cards like Rowan and Will become a trend I'm in deep sh!t.

<h3>Player Registration:</h3> Just a way to record a player's name, default deck and default table position, to accelerate table setup for a familiar group. This is far from ideal but it is a step forward.

<h3>Player Roulette:</h3> It flashes a random panel at the table, and can be used to decided who goes first or who to attack in random situations like, for instance, a player piloting a Ruhan deck.

<h3>Hidden Themes:</h3> Long-pressing at the buttons or the player number in the styles screen activates one of the three hidden themes. Why do they exist? Mainly to reflect some of my favourite deck archetypes, and because I didn't want to add another row just for those. In the future, when I come up with more themes, new rows on the style sheet will be added of course. Also, I like easter eggs.

<h3>Negative Life:</h3> It is a very niche situation, such as Platinum Angel, but it was easy enough to implement so why not. Disabled by default to avoid confusion.

<h3>Timer:</h3> Some players requested it so I did, mostly so I could learn how to do it. Personally I don't really use it and don't care about it.

<h3>Binding Player Life and Commander Damage:</h3> This is essential in any EDH game, but I decided to make it an optional parameter so players may play without it and avoid mistakes.

<h3>Dice Roller:</h3> Another why-not functionality. Rarely used, but the settings page had a lot of empty space anyway.

<h3>Hiding the auxiliary buttons:</h3> Requested so filthy modern and standard players can play without having a bunch of awesome EDH relevant buttons to look at! Just kidding, I like it as well (the functionality, not the formats).

<h3>Hiding / Enabling Players on 4p and 6p Screens:</h3> Ugly workaround that turned out great at the end, since I now only two less game screen pages to mess around with.

<hr>

<h2>What's Going On</h2>
This app went from a very, very small project to something I honestly love to work on and the community feedback has been great. With that in mind, I'll be porting the app to a newer framework. It will take A LOT of time, so I won't be updating the phonegap version anymore (maybe a just one or two last updates to sort a few things out). I'm positive it'll come up way better AND it'll be a great learning process to me as well.

I'm divided between Flutter and Xamarin. Flutter (or maybe even React Native) looks awesome, but I'm a bit more familiar with C# dev environment and some of my coworkers use Xamarin at work so it might be a thing.

<hr>

<h2>Feature Brainstorm / Planning</h2>
Listed below is the suggestions I receive from users and friends. This is more of a reminder, but sometimes I like to update what I think about each one.

<h3>Saving matches:</h3> Not a priority. Could code something to save it in the storage, but I see no real point in it. Saving matches serve no purpose unless the user absolutely has to reset his phone.

<h3>Rearranging panels:</h3>Also not a priority. Looking for a drag-and-drop solution that doesn't require jQuery, but this might be pushed to the upcoming framework transition.

<h3>Different table designs for 3, 4 and 5 players:</h3> Want to, but it'll require a LOT of rework in some stuff I did back then due to lack of oversight. This is a good incentive because it'll improve code quality.

<h3>Rearranging auxiliar counters:</h3> Also not a priority, but it'd be a very interesting design challenge. I'll look up some better way to hide and display stuff than to use invisibility via css.

<h3>Commander damage to self and / or from partners:</h3> The extra columns are doing a fine job for now. I will make it clearer in the tutorial. The main problem with this is purely aesthetic though.

<h3>Lethal commander damage dimming a player panel to indicate that he lost:</h3> I'm still on the fence about this one. It is so easy to make mistakes in the commander chart, and I wouldn't like to code a billion verification procedures every time a player taps something, it'd be unnecessary overhead over something so small.

<h3>Rework the CSS to be truly responsive:</h3> Not a priority but it is something I'll eventually need to get to. Media queries and all that.

<h3>Customize auxiliary buttons positions / types:</h3> This is one of my most sought after improvements, but it'll require a ton of rework to function. Not an immediate priority, but I got some big plans for the future and this is part of it.

<h3>Saving player default hidden/shown auxiliary buttons:</h3> Too much of a hassle for too little. This might come in the future with the multiple theme registration, but absolutely not a priority.

<h3>Multiple theme/deck registration per player:</h3> Naturally this is where the player registry is aiming to become. It will come, maybe not in the near future but it will.

<h3>Allow the player to choose the background color:</h3> Nope. Not happening. Each color was chosen to give the combinations some identity. Having a bright yellow background with a black mana symbol is stupid. Same goes for gradient colors, background images, and so on. The app's design direction is what it is.

<hr>

<h2>Hardcoded Stuff in Need of Rework</h2>
This is where I map all the crap I did in a hurry to make the app work and never got back to.

<h3>Orientation:</h3> I need to rewrite a bunch of stuff in regards to screen orientation if I ever want to code a better 3 and 5 player screns. Doesn't look like a lot of work, but it'll need a lot of testing.

<h3>Newer Themes:</h3> This is pure laziness, I just need to come up with a better solution for the theme screen that doesn't involve that ugly switch block at the end.

<h3>Auxiliary Counters:</h3> The app render them dinamically, but right now they're all hardcoded into the html. This would enable the user to choose what counters he/she needs.
