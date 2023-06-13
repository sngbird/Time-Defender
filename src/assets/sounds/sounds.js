Tone.Transport.polyphony = 32;
lowHumSound = () => {
    // Create an oscillator for the low hum sound
    const oscillator = new Tone.Oscillator({
        frequency: 120, // 55 Hz (low A) to start, deeper
        volume: -20, // start pretty quiet
        type: 'sine' // pure tone
    }).toDestination();

    // Create an LFO to modulate the volume of the oscillator, giving it a pulsating effect
    const lfo = new Tone.LFO({
        frequency: 3, // LFO rate
        type: 'sine', // LFO wave type
        min: -24, // minimum output volume
        max: -20 // maximum output volume
    }).connect(oscillator.volume);

    // Start the LFO
    lfo.start();

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after 1 second, shorter
    setTimeout(() => {
        oscillator.stop();
    }, 1500);

};

alertSound = () => {
    // Create a monophonic synth
    const synth = new Tone.Synth().toDestination();
    
    // Define the alert pitches
    const pitches = ["C5", "C4","C5", "C4"];
  
    // Define the speed of the alert sound
    const speed = 0.2; // 100 ms per pitch
    if (Tone.Transport.state === 'started') {
        Tone.Transport.cancel();
        Tone.Transport.stop();
      }
    // Schedule the pitches
    pitches.forEach((pitch, index) => {
      Tone.Transport.schedule(() => {
        synth.triggerAttackRelease(pitch, "8n");
      }, speed * index); // delay each pitch by the speed times its position in the score up sound
    });
  
    // Start the transport
    
    setTimeout(() => {
      Tone.Transport.start();
  }, 100);
    setTimeout(() => {
      synth.dispose();
  }, 1500);
    
};
powerupSound = () => {
  // Create a monophonic synth
  const synth = new Tone.Synth({ oscillator: {type: 'square'}}).toDestination(); 
    const pitches = ["B4","G4",];
    const speed = 0.1;
    // Create a monophonic synthesizer with a square wave
    if (Tone.Transport.state === 'started') {
        Tone.Transport.cancel();
        Tone.Transport.stop();
      }
    
      // Schedule the pitches
      pitches.forEach((pitch, index) => {
        Tone.Transport.schedule(time => {
          synth.triggerAttackRelease(pitch, "32n", time);
        }, speed * index); 
      });
    
      // Start the transport to play the scheduled pitches
      setTimeout(() => {
        Tone.Transport.start();
    }, 100);
      setTimeout(() => {
        synth.dispose();
    }, 1500);
  
};


scoreUpSound = () => {
    const synth = new Tone.Synth({ oscillator: {type: 'square'}}).toDestination(); 
    const pitches = ["C4", "E4", "G4", "B4", "B3","C4"];
    //["C4", "E4", "G4", "B4", "C5", "E5", "G5", "B5", "C6"];
    // Define the speed of the score up sound
    const speed = 0.03; // 50 ms per pitch
    // Create a monophonic synthesizer with a square wave
    if (Tone.Transport.state === 'started') {
        Tone.Transport.cancel();
        Tone.Transport.stop();
      }
    
      // Schedule the pitches
      pitches.forEach((pitch, index) => {
        Tone.Transport.schedule(time => {
          synth.triggerAttackRelease(pitch, "32n", time);
        }, speed * index); 
      });
    
      // Start the transport to play the scheduled pitches
      setTimeout(() => {
        Tone.Transport.start();
    }, 100);
      setTimeout(() => {
        synth.dispose();
    }, 1500);
};


laserSound = () => {
        // Create an oscillator with a high initial frequency, resembling a 'pew' sound
    const oscillator = new Tone.Oscillator({
         frequency: 2000, // 2 kHz to start
         volume: -10, // start pretty quiet
        type: 'sine' // pure tone
    });
    
    // Create an amplitude envelope
    const envelope = new Tone.AmplitudeEnvelope({
        attack: 0.01, // Fast attack
        decay: 0.1, // Decay to sustain level quickly
        sustain: 0.5, // Sustain at half volume
        release: 0.8 // Release somewhat slowly
    }).toDestination();
    
    // Connect the oscillator to the envelope
    oscillator.connect(envelope);

    // Start the oscillator
    oscillator.start();
    
    // Trigger the envelope
    envelope.triggerAttackRelease(0.5); // Attack and release over half a second
    
    // Glide the oscillator frequency down, like a 'pew' sound
    oscillator.frequency.rampTo(100, 1); // Ramp to 100 Hz over half a second
    
    // Create a LFO and connect it to the oscillator frequency
    const lfo = new Tone.LFO({
        frequency: 10, // frequency of the LFO
        min: 100, // minimum output value
        max: 2000 // maximum output value
    }).connect(oscillator.frequency);
    
        // Start the LFO
      lfo.start();
      setTimeout(() => {
        oscillator.dispose();
        envelope.dispose();
    }, 1500);
};

    
  