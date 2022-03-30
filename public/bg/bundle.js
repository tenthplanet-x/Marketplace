window.Laya=window.Laya||{};

(function (exports, Laya) {
    'use strict';
	let container = document.getElementById("layaContainer");
    class Main {
        constructor() {
            this.referenceClass = [Laya.Laya3D];
			Laya.Browser.container = container;
            const width = 1920;
            const height = 1080;
            if (window["Laya3D"])
                window["Laya3D"].init(width, height);
            else
                Laya.Laya.init(width, height, Laya.WebGL);
            Laya.Laya.stage.scaleMode = "fixedwidth";
            Laya.Laya.stage.screenMode = "horizontal";
            Laya.Laya.stage.alignV = "top";
            Laya.Laya.stage.alignH = "left";
            Laya.URL.exportSceneToJson = true;
            Laya.Laya.alertGlobalError(false);
            Laya.Laya.stage.addChild(new GameUI);
        }
    }
	let camera;
    class GameUI extends Laya.Scene {
        constructor() {
            super();
            Laya.Scene3D.load("http://mech-angel.tpulse.cn/bg/scene/Conventional/cs.ls", Laya.Handler.create(this, this.onComplete));
        }
        onComplete(scene) {
			const stage = Laya.Laya.stage;
			stage.addChild(scene);
			window.addEventListener("mousemove",onMouseMove.bind(scene));
            const cameraPoint = getChildByName("Camera", scene);
            const ani = cameraPoint.getComponent(Laya.Animator);
            ani.speed = 0;
            cameraPoint.name = "cameraPoint";
            camera = getChildByName("MainCamera", cameraPoint);
            const eff = new Effect;
            const postProcess = new Laya.PostProcess();
			const bloom = new Laya.BloomEffect();
			bloom.intensity = 7;
			bloom.threshold = 0.9;
			bloom.softKnee = 0.5;
			bloom.clamp = 65472;
			bloom.diffusion = 5;
			bloom.anamorphicRatio = 0.0;
			bloom.color = new Laya.Color(.96, 0, .98, 1);
			bloom.fastMode = true;
			postProcess.addEffect(bloom);
            postProcess.addEffect(eff);
            camera.postProcess = postProcess;
            camera.enableHDR = true;
            this.ani = ani;
            let self=this;
			window.setBg =function(val){
				self.scroll=val;
			}
        }
        get scroll() {
            return scroll;
        }
        set scroll(v) {
            if (v < 0) {
                v = 0;
            }
            else if (v > .99) {
                v = .99;
            }
            v %= 1;
            if (v != scroll) {
                scroll = v;
                const ani = this.ani;
                ani.speed = 1;
                ani.play(null, 0, v);
                ani.speed = 0;
            }
        }
    }
    let scroll = 0;
	
	const point = new Laya.Vector3();
	function onMouseMove(ev) {
		const { clientX:mouseX, clientY:mouseY } = ev;
		const { innerWidth:width, innerHeight:height } = window;
		const v = -3;
		point.x = v * (mouseX / width - .5);
		point.y = v * (mouseY / height - .5);
		const mouse = getChildByName("Mouse", this);
		mouse.transform.localPosition = point;
	}
	
    function getChildByName(name, d) {
        const arr = [d];
        let i = 0;
        while (i < arr.length) {
            const t = arr.pop();
            if (t.name === name) {
                return t;
            }
            else {
                let len = t.numChildren;
                if (len) {
                    const children = t._children;
                    for (let j = 0; j < len; j++) {
                        arr.push(children[j]);
                    }
                }
            }
        }
    }
    const vs = `precision highp float;

float when_fgt(float x, float y) {
    return max(sign(x - y), 0.0);
}
vec2 correctRatio(vec2 inUv, float baseratio, float asp) {
    return mix(vec2(inUv.x, inUv.y * baseratio / asp + .5 * (1. - baseratio / asp)), vec2(inUv.x * asp / baseratio + .5 * (1. - asp / baseratio), inUv.y), when_fgt(baseratio, asp));
}

attribute vec4 a_PositionTexcoord;

varying vec2 v_Uv;
varying vec2 v_Uv2;

void main() {
    v_Uv = vec2(0.5) + (a_PositionTexcoord.xy) * 0.5;
    v_Uv2 = correctRatio(v_Uv, 1.0, 2.0695);
    gl_Position = vec4(a_PositionTexcoord.xy, 0.0, 1.0);
}`;
    const fs = `precision highp float;
precision highp int;


varying vec2 v_Uv;
varying vec2 v_Uv2;
uniform sampler2D u_MainTex;

const float scale = 1000.0;
const float amt = 0.065;// intensity of effect
const float spd = 2.0;//speed of scrolling rows transposed per second

uniform float dattime;
uniform float vignamount;
uniform float vignfalloff;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, // (3.0-sqrt(3.0))/6.0
    0.366025403784439, // 0.5*(sqrt(3.0)-1.0)
    -0.577350269189626, // -1.0 + 2.0 * C.x
    0.024390243902439); // 1.0 / 41.0

      // First corner
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

      // Other corners

    vec2 i1;
      //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0

      //i1.y = 1.0 - i1.x;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      // x0 = x0 - 0.0 + 0.0 * C.xx ;

      // x1 = x0 - i1 + 1.0 * C.xx ;
      // x2 = x0 - 1.0 + 2.0 * C.xx ;
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

      // Permutations

    i = mod289(i); // Avoid truncation effects in permutation

    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;

      // Gradients: 41 points uniformly over a line, mapped onto a diamond.

      // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

      // Normalise gradients implicitly by scaling m

      // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

      // Compute final noise value at P

    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float rand(vec2 o) {
    vec2 p = o * 256.0;
    vec3 p3 = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}
float when_eq(float x, float y) {
    return 1.0 - abs(sign(x - y));
}
vec4 getGlitch(sampler2D inTex, float noise, float xpos) {
    vec4 final = texture2D(inTex, vec2(xpos, v_Uv.y));
    final.rgb = mix(final.rgb, vec3(rand(vec2(v_Uv.y * dattime))), noise * 0.3).rgb;

      // Apply a line pattern every 4 pixels

    final.rgb *= mix(1.0 - (0.15 * noise), 1.0, when_eq(floor(mod(v_Uv.y * 0.5, 1.0)), 0.0));

      // Shift green/blue channels (using the red channel)

    final.g = mix(final.g, texture2D(inTex, vec2(xpos + noise * 0.05, v_Uv.y)).g, 1.0);
    final.b = mix(final.b, texture2D(inTex, vec2(xpos - noise * 0.05, v_Uv.y)).b, 1.0);

      // float rr = texture2D(inTex, vUv + vec2(-noise * 0.1, 0.0)).r;

    return mix(final, texture2D(inTex, v_Uv + vec2(-noise * 0.1, 0.0)), 0.2);
}
vec3 scanline(vec2 coord, vec3 screen) {
    screen.rgb += sin((coord.y * scale - (dattime * spd * 6.28))) * amt;
    return screen;
}

void main() {
    float noise = max(0.0, snoise(vec2(dattime, v_Uv.y * 0.3)) - 0.3) * (1.42857);

    // Offset by smaller, constant noise waves

    noise = noise + (snoise(vec2(dattime * 10.0, v_Uv.y * 2.4)) - 0.5) * 0.15;

    // noise *= smoothstep(0.5, 1.0, ((sin(dattime) * 0.5) + 1.0)) * 0.5;

    noise *= max(1.0 - dattime * 0.5, 0.0);
    vec4 final = vec4(1.0);
    if(noise < 0.02) {
        final = texture2D(u_MainTex, v_Uv);
    } else {
        // Apply the noise as x displacement for every line
        float xpos = v_Uv.x - (noise * noise * 0.1);
        final = getGlitch(u_MainTex, noise, xpos);
    }

    float dist = distance(v_Uv2, vec2(0.5));

    final.rgb *= smoothstep(0.8, vignfalloff * 0.799, dist * (vignamount + vignfalloff));
    final.rgb = scanline(v_Uv, final.rgb);
    gl_FragColor = final;
}`;
    const shader = Laya.Shader3D.add("Billboard");
    const attrMap = {
        "a_PositionTexcoord": Laya.VertexMesh.MESH_POSITION0,
    };
    const uniMap = {};
    const nameMap = {};
    function addUniMaps(...keys) {
        for (let key of keys) {
            uniMap[key] = Laya.Shader3D.PERIOD_MATERIAL;
            nameMap[key] = Laya.Shader3D.propertyNameToID(key);
        }
    }
    function getNameId(key) {
        return nameMap[key];
    }
    addUniMaps("dattime", "vignamount", "vignfalloff", "u_MainTex");
    const subShader = new Laya.SubShader(attrMap, uniMap);
    const pass = subShader.addShaderPass(vs, fs);
    shader.addSubShader(subShader);
    const state = pass.renderState;
    state.depthTest = Laya.RenderState.DEPTHTEST_ALWAYS;
    state.depthWrite = false;
    state.cull = -Laya.RenderState.CULL_NONE;
    state.blend = Laya.RenderState.BLEND_DISABLE;
    const shaderData = new Laya.ShaderData();
    shaderData.setNumber(getNameId("vignamount"), 0.4);
    shaderData.setNumber(getNameId("vignfalloff"), 0.2);
    let i = 0;
	class Effect extends Laya.PostProcessEffect {
      render(context) {
          const { camera, command } = context;
          const { scene, viewport } = camera;
          shaderData.setNumber(getNameId("dattime"), Math.sin(scene._shaderValues.getNumber(Laya.Scene3D.TIME) * .5));
          const mipDownTexture = Laya.RenderTexture.createFromPool(viewport.width, viewport.height, Laya.RenderTextureFormat.R8G8B8, Laya.RenderTextureDepthFormat.DEPTHSTENCIL_NONE);
          mipDownTexture.filterMode = Laya.FilterMode.Bilinear;
          command.blitScreenTriangle(context.source, mipDownTexture);
          command.blitScreenTriangle(mipDownTexture, context.destination, null, shader, shaderData, 0, true);
          context.deferredReleaseTextures.push(mipDownTexture);
      }
	}
    new Main();

    exports.Effect = Effect;

}(this.Laya = this.Laya || {}, Laya));
