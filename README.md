# shieldmate
EDH Shieldmate Source Code

-Gonna keep only the code here due to obvious reasons (everything but design assets and such)-

<hr>

<h2>Introduction</h2>

Hey ho! I am a beginner developer and decided to try my hand at javascript / css. This app is more of a learning process than a product itself. Being a dedicated EDH player in the MTG world, I thought hey why not, lets make this happen.

This project is fun, I like to add stuff to it and learn along the way how to deal with performance issues and so on. But I feel I'm close to reaching a technical ceiling and I'll study other technologies for android development. When I started this, I opted to go hybrid because I thought I'd be releasing in all three platforms (microsoft was still a thing back then) at the same time but alas, reality is not so gentle. Publishing to iOS went from a priority, to a desire, to me simply not caring anymore.

Main issues about the code overall: It has a lot of hard coded stuff, and this bothers me a lot. I've been meaning to get to that but since time is limited, I decided to make a priority out of the stuff the user will actually see and use. The javascript isn't brilliant either.

<hr>

<h2>What is New</h2>

Since its inception I've added a ton of new stuff to the app. Gonna list them below so I can keep track of my progress.

<h3>3P and 5P screens:</h3> Finally came around to fix that. Ugly code workaround was replaced with a more elegant solution and the screens turned out great.

<h3>Oathbreaker Support:</h3> Widely requested. It is just a simple counter button, just like the experience one. Doubles as a partner commander counter as well. Now, if cards like Rowan and Will become a trend I'm in deep sh!t. If a new marker comes around, I might reuse it yet again, since Oathbreaker ain't THAT popular.

<h3>Player Registration:</h3> Just a way to record a player's name, default deck and default table position, to accelerate table setup for a familiar group. This is far from ideal but it is a step forward of the save-table-load-table approach from before.

<h3>Player Roulette:</h3> It flashes a random panel at the table, and can be used to decided who goes first or who to attack in random situations like, for instance, a player piloting a Ruhan deck.

<h3>Negative Life:</h3> It is a very niche situation, such as Platinum Angel, but it was easy enough to implement so why not. Disabled by default to avoid confusion.

<h3>Timer:</h3> Some players requested it so I did, mostly so I could learn how to do it. Personally I don't really use it and don't care about it.

<h3>Binding Player Life and Commander Damage:</h3> This is essential in any EDH game, but I decided to make it an optional parameter so players may play without it and avoid mistakes.

<h3>Dice Roller:</h3> Another why-not functionality. Rarely used, but the settings page had a lot of empty space anyway.

<h3>Hiding the auxiliary buttons:</h3> Requested so filthy modern and standard players can play without having a bunch of awesome EDH relevant buttons to look at! Just kidding, I like it as well (the functionality, not the formats).

<h3>Flexbox design for auxiliary counters:</h3> Was trying to find a complicated solution for a simple problem, but I stumbled upon the satanic magic of flexbox and managed to solve it with an unbelievably small bit of css.

<h3>Small improvments:</h3> Been learning better CSS practices so user interaction should feel a lot better. Bigger button areas, removed useless elements from the game screen, and so on.

<hr>

<h2>What was taken out</h2>

<h3>Hidden Themes:</h3> As much as I enjoy easter eggs, it needed some useless code to function. And I decided to swap a few unpopular themes (based on the nephilim) for the hidden ones.

<h3>Hiding / Enabling Players on 4p and 6p Screens:</h3> Too much code for too little. Stupid solution, non-intuitive design.

<hr>

<h2>What's Going On</h2>
This app went from a very, very small project to something I honestly love to work on and the community feedback has been great. With that in mind, I'll be porting the app to a newer framework. It will take A LOT of time though, but I'm positive it'll come up way better AND it'll be a great learning process to me as well.

Update on this: I still plan to get this ball rolling, but my work has been draining my life and I am not dedicating any free time in front of the computer anymore. When I get my life routine to a more stable position, I might get back at this.

I don't plan on updating the app anymore. Just put up the final version with the night/day thingy and some interface polish, but that's it.

<hr>

<h2>Feature Brainstorm / Planning</h2>
Listed below is the suggestions I receive from users and friends. This is more of a reminder, but sometimes I like to update what I think about each one.

<h3>Saving matches:</h3> Not a priority. Could code something to save it in the storage, but I see no real point in it. Saving matches serve no purpose unless the user absolutely has to reset his phone.

<h3>Rearranging panels:</h3>Also not a priority. Looking for a drag-and-drop solution that doesn't require jQuery, but this might be pushed to the upcoming framework transition.

<h3>Rearranging auxiliary counters:</h3> Also not a priority, but it'd be a very interesting design challenge. I'll look up some better way to hide and display stuff than to use invisibility via css. This would need the counters to be rendered dynamically, which is cool but might impact performance a bit.

<h3>Commander damage to self and / or from partners:</h3> The extra columns are doing a fine job for now. I will make it clearer in the tutorial. The main problem with this is purely aesthetic though.

<h3>Lethal commander damage dimming a player panel to indicate that he lost:</h3> I'm still on the fence about this one. It is so easy to make mistakes in the commander chart, and I wouldn't like to code a billion verification procedures every time a player taps something, it'd be unnecessary overhead over something so small.

<h3>Rework the CSS to be truly responsive:</h3> Not a priority but it is something I'll eventually need to get to. Media queries and all that. Currently only the commander damage screen uses it.

<h3>Customize auxiliary buttons positions / types:</h3> This is one of my most sought after improvements, but it'll require a ton of rework to function. Not an immediate priority, but I got some big plans for the future and this is part of it.

<h3>Saving player default hidden/shown auxiliary buttons:</h3> Too much of a hassle for too little. This might come in the future with the multiple theme registration, but absolutely not a priority.

<h3>Multiple theme/deck registration per player:</h3> Naturally this is where the player registry is aiming to become. It will come, maybe not in the near future but it will.

<h3>Link the theme and player registration screens:</h3> This would be the end goal of the two features above. Implement the style screen theme selection (as in, the round buttons instead of the dropdown box), make it so the player can save his default counters, and so on. Again I think this is way too much of a hassle over something that's not that big. It is not a priority, but I intend to get there when there's nothing else left to do.

<h3>Allow the player to choose the background color:</h3> Nope. Not happening. Each color was chosen to give the combinations some identity. Having a bright yellow background with a black mana symbol is stupid. Same goes for gradient colors, background images, and so on. The app's design direction is what it is.

<h3>Theme ideas:</h3> Unstable faction symbols would make for amazing themes, if I ever find a high quality render for those. Ikoria ability counters are cool as well, especially the flying symbol.

<hr>

<h2>Hardcoded Stuff in Need of Rework</h2>
This is where I map all the crap I did in a hurry to make the app work and never got back to. I'm planning on fetching external json files for some stuff like the banned cards lists, but I'm on the fence about using this approach for themes and such. 

<h3>Newer Themes:</h3> This is pure laziness, I just need to come up with a better solution for the theme code that doesn't involve that ugly switch block at the end.

<h3>Auxiliary Counters:</h3> The app should render them dinamically, but right now they're all hardcoded into the html. This would enable the user to choose what counters he/she needs. If stuff like experience counters keep showing up, this'll turn into a priority.

<h3>Better Layout:</h3> Right now I'm pretty satisfied with the app's layout. It isn't the most modern and sleek ever but I think the retro feel is a charm. With my plans for switching frameworks, I also intend to create a much more reactive interface.

<h3>Media Queries:</h3> If it ain't broken...
