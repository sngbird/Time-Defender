# Time-Defender

Final Group 4: 

Production Lead - Wyatt Hawes

Technology Lead - Lumina Kinsinger-Dang

Testing Lead - Ethan Earle

Link: https://sngbird.github.io/Time-Defender/


# **CMPM120 Final Project**
-------------
Requirements:
Theme: Nearby in space, but distant in time.
Integration:
**Narrative or visual art (~time travel story)
Mechanics (~time travel puzzles)
Technical implementation (~geolocation/clock)
Audience (~relates to a deep memory of someone close to you)

Core Requirements:
--------
- Smooth experience of full-screen play in a mobile browser.
- User is capable of learning to play from within the game (not consulting outside instructions).
- User is capable of toggling background music from within the game, and this preference is saved across sessions.
- Core gameplay can be reached within 1 minute, and an experienced player can complete the experience within 10 minutes (3–5 preferred).


Selectable requirements: (maybe choose 3)
-----------------
- **Data-driven experience progression
- **Featherweight (less than one megabyte)**
- **Procedural audio
- {something you propose}: As few buttons as possible

# Core Gameplay Prototype Requirements**

- Core Gameplay Prototype: https://people.ucsc.edu/~lkinsing/Time_Defender/TimeDefender.html
- Scene Flow Prototype: https://wyatt-hawes.github.io/Time-Defender-Scene-Flow-Prototype/
- Cinematics Prototype: https://wyatt-hawes.github.io/Time-Defender-Scene-Flow-Prototype/

## Audio: The prototype uses at least two different kinds of audio.**
What we did:
1. Continuously looping background sound (e.g. music or environmental audio) from an audio asset file.
2. Sound effects or voice clips triggered in response to player input or game events, also from an audio asset file.
3. Dynamically-generated sounds (as opposed to sounds saved in asset files) created using a library like Tone.js



## Visual: The prototype uses at least two different kinds of display primitives. Basic geometric primitives like squares/circle or a scene's flat background color would not count here.**
What we did:
1. Image-based assets using sprites may make spritemap later to save space.
2. Particle emitter to create the starfield/moving through space effect.
3. Used shaders to create background effects and timebolt with render to texture.

## Motion:
What  we did:
1. Tweens on the turret sprite to rotate it before firing a bullet
2. Bullet objects, which uses physics to move instead of Tweens
3. Time Fissures use a tween to grow and become a threat to the ship.

## Progression: 
What we did:
1. We have a difficulty variable that is based on time. As the difficulty goes up, the chance of a Time Fissure spawning increases. Higher Difficulty sees an increasing onslaught of Time Cracks. Currently this is linear, but I want to change to a different curve.
2. (Partially completed): We have multiple styles of time fissures, which start to appear at higher difficulty and other events start based on the difficulty counter as well. 

## Prefabs:
What we did:
1. DefenderScene which extends the standard Phaser Scene, is our base scene, it loads our assets, and it stores functions all of the scenes need, it's currently primarily used in the title. DefenderGameScene Extends DefenderScene, and adds the aspects of the gameplay that aren't necessary for the Base DefenderScene. This contains timers, groups, colliders, and the necessary functions to run the game.
2. LaserGroup which extends Phaser.Physics.Arcade.Group and creates multiples of: Laser which extends Phaser.Physics.Arcade.Sprite.
3.(Not Completed Yet): Different Types of Lasers/Blasts (extends Laser object)
4.Power Up Class, with different powerups extending the base class.
5.Timecracks now split into classes that extend base timecrack class.
