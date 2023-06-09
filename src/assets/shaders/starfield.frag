#ifdef GL_ES
precision highp float;
#endif
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float rand (in vec2 uv) { return fract(sin(dot(uv,vec2(12.4124,48.4124)))*48512.41241); }
const vec2 O = vec2(0.,1.);
float noise (in vec2 uv) {
	vec2 b = floor(uv);
	return mix(mix(rand(b),rand(b+O.yx),.5),mix(rand(b+O),rand(b+O.yy),.5),.5);
}

#define DIR_RIGHT -1.
#define DIR_LEFT 1.
#define DIRECTION DIR_LEFT

#define LAYERS 8
#define SPEED 50.
#define SIZE 5.



void main()
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;
    
    
    float stars = 0.;
	float fl, s;
	for (int layer = 0; layer < LAYERS; layer++) {
		fl = float(layer);
		s = (400.-fl*20.);
		stars += step(.1,pow(noise(mod(vec2(uv.x*s + time*SPEED*DIRECTION - fl*100.,uv.y*s),resolution.x)),18.)) * (fl/float(LAYERS));
	}
    gl_FragColor = vec4( vec3(stars), .25 );
}	 

//Taken from Shadertoy
//Created by gigatron in 2015-12-02
//https://www.shadertoy.com/view/lst3Wn