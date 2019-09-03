import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Based on NgRx store but simplified.
 */
export class RxjsStore<T> {

  /**
   * Private BehaviorSubject as it can not be modified from outside.
   * Changing value to the state can be done only via *setState()* method
   */
  private innerState$: BehaviorSubject<T>;
  state$: Observable<T>;

  protected constructor(initialState: T) {
    this.innerState$ = new BehaviorSubject<T>(initialState);
    this.state$ = this.innerState$.asObservable();
  }

  /**
   * Getting current value of the state.
   */
  get state(): T {
    return this.innerState$.getValue();
  }

  /**
   * Setting new state.
   */
  setState(nextState: T): void {
    this.innerState$.next(nextState);
  }

  /**
   * Enables user to get observable of the first level properties of the state.
   */
  getValueState(key: string): Observable<any> {
    return key in this.state ?
           this.state$.pipe(
             map(state => state[key]),
             distinctUntilChanged()
           ) : throwError(Error('Needed property does not exist in this state.'));
  }
}
