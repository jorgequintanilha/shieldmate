# shieldmate
EDH Shieldmate Source Code

Gonna keep only the code here due to obvious reasons.

So! I am a beginner developer and decided to try my hand at javascript / css. This app is more of a learning process than a product itself.

So, main issues about the code overall: It has a lot of hard coded stuff, and this bothers me a lot. I've been meaning to get to that but since time is limited, I decided to make a priority out of the stuff the user will actually see and use. The javascript isn't brilliant either.

Listed below is the suggestions I receive from users and friends. This is more of a reminder, but sometimes I like to update what I think about each one.

<h2>Feature Brainstorm / Planning</h2>
    <h4>Saving matches:</h4> Not a priority. Could code something to save it in the storage, but I see no real point in it. Saving matches serve no purpose unless the user absolutely has to reset his phone.
    <h4>Rearranging panels:</h4>Also not a priority. Looking for a drag-and-drop solution that doesn't require jQuery.
    <h4>Different table designs for 3, 4 and 5 players:</h4> Want to, but it'll require a LOT of rework in some stuff I did back then due to lack of oversight. This is a good incentive because it'll improve code quality.
    <h4>Rearranging auxiliar counters:</h4> Also not a priority, but it'd be a very interesting design challenge. I'll look up some better way to hide and display stuff than to use invisibility via css.
    <h4>Tracking Partner Commander Castings:</h4> It'd be good but since this is a very niche situation, I am still encouraging players to use the experience / poison counters for now, since all those very rarely go together at the same time. See customize aux buttons below.
    <h4>Commander damage to self and / or from partners:</h4> The extra columns are doing a fine job for now. I will make it clearer in the tutorial. The main problem with this is purely aesthetic though.
    <h4>Lethal commander damage dimming a player panel to indicate that he lost:</h4> I'm still on the fence about this one. It is so easy to make mistakes in the commander chart, and I wouldn't like to code a billion verification procedures every time a player taps something, it'd be unnecessary overhead over something so small.
    <h4>Auto adjustable font size for player name:</h4> This is probably the next thing I'm going to do because A) it's simple and B) it's great.
    <h4>Redo ALL the background in regards to transparency and size:</h4> This will also be on the next update, but it'll be a lot of work. And It'll feature a hidden theme! :D
    <h4>Rework the CSS to be truly responsive:</h4> Not a priority but it is something I'll eventually need to get to. Media queries and all that.
    <h4>Customize auxiliary buttons positions / types:</h4> This is one of my most sought after improvements, but it'll require a ton of rework to function. Not an immediate priority, but I got some big plans for the future and this is part of it.
    <h4>Saving player default hidden/shown auxiliary buttons:</h4> Too much of a hassle for too little. This might come in the future with the multiple theme registration, but absolutely not a priority.
    <h4>Multiple theme/deck registration per player:</h4> Naturally this is where the player registry is aiming to become. It will come, maybe not in the near future but it will.
    <h4>Allow for negative life points:</h4> A situation came up where players can go into negative life points due to Platinum Angel or something like that. Niche, but possible to implement without a lot of work. It'll be on the next version as well.
    <h4>Allow the player to choose the background color:</h4> Nope. Not happening. Each color was chosen to give the combinations some identity. Having a bright yellow background with a black mana symbol is stupid. Same goes for gradient colors, background images, and so on. The app's design direction is what it is.
    
<h2>Final thoughts</h2>

This project is fun, I like to add stuff to it and learn along the way how to deal with performance issues and so on. But I feel I'm close to reaching a technical ceiling and I'll study other technologies for android development. When I started this, I opted to go hybrid because I thought I'd be releasing in all three platforms (microsoft was still a thing back then) at the same time but alas, reality is not so gentle. Publishing to iOS went from a priority, to a desire, to me simply not caring anymore.

For now, I will do a bit of adjustments here and there and probably call it a "final" version while I'm planning a next step of sorts. I'm studying Ionic, React, Angular and so on.
