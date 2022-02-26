type Context<S> = {[K in keyof S]: S[K]};
type Creators<S> = {[K in keyof S]: (ctx: S) => S[K]};

export const createContainer = <S = any>(creators: Creators<S>) => {
    // @ts-ignore
    const mapped = Object.entries(creators)
        .map(([key, creator]) => {
            // @ts-ignore
            return [key, () => creator(mapped)()];
        })
        .reduce((o, [k, v]) => {
            // @ts-ignore
            o[k] = v;
            return o;
        }, {});

    return mapped as Context<S>;
};


export type IdType = {
    newIdGenerator: (len: number) => string;
};

export type WithId = {
    IdGenerator: () => IdType;
};

export type IocContext = WithId;

export function generateId(ctx: WithId): () => IdType {
    return () => ({
        newIdGenerator: (len): string => {
            ctx(len).toString("hex");
        },
    });
}

export createContainer<IocContext>({
    IdGenerator: generateId,
});

