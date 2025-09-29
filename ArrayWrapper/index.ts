//ArrayWrapper обертка над массивом

class ArrayWrapper<T> {
    private items: T[];

    constructor(items?: T[]) {
        this.items = items ? items.slice() : [];
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    get length(): number {
        return this.items.length;
    }

    at(index: number) : T | undefined {
        return this.items[index];
    }

    map<U>(fn: (item: T, index: number, arr: T[]) => U): ArrayWrapper<U> {
        return new ArrayWrapper(this.items.map(fn));
    }

    filter(predicate: (item: T) => boolean) : ArrayWrapper<T> {
        return new ArrayWrapper(this.items.filter(predicate));
    }

    reduce<U>(fn: (acc: U, cur: T, idx: number) => U, initial: U) : U {
        return this.items.reduce(fn, initial);
    }

    concat(...others: T[]) : ArrayWrapper<T> {
        return new ArrayWrapper(this.items.concat(...others));
    }

    toArray() : T[] {
        return this.items.slice();
    }
}