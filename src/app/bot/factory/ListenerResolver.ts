import { Container, resolver } from 'aurelia-dependency-injection';
import { Listener } from '../Listener';

@resolver()
export class ListenerResolver {
  public constructor(private attributesClass: any) { }

  public static get(attributesClass: any): ListenerResolver {
    return new ListenerResolver(attributesClass);
  }

  public get(container: Container): Listener {
    return new Listener(container.get(this.attributesClass));
  }
}
