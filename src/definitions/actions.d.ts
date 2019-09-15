type Action<TType extends string, TPayload extends {} = {}> = {
    readonly type: TType;
} & TPayload;

type Command<TAction extends Action<any, any>> = () => Promise<TAction | void> | TAction | void;

type StateWithCommand<TState, TAction extends Action<any, any>> = [TState, Command<TAction>?];

type Reducer<TState, TAction extends Action<any, any>> = (
    state: StateWithCommand<TState, TAction>,
    action: TAction,
) => StateWithCommand<TState, TAction>;
