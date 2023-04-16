import { Snow } from "./class-snow";
import { Particles } from "./class-particle";

type SnowParams = ConstructorParameters<typeof Snow>;
type ParticlesParams = ConstructorParameters<typeof Particles>;

export class BgFactory {
  constructor(private canvas: HTMLCanvasElement) {}

  snow(...snowParams: SnowParams) {
    return new Snow(...snowParams);
  }
  particle(...particlesParams: ParticlesParams) {
    return new Particles(...particlesParams);
  }
}
