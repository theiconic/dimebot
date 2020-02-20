export interface FactoryInterface<I, O> {  
  make(input: I): O;
}
