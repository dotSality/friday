


const initState: any[] = []

type InitStateType = typeof initState

export const passRecoverReducer = (state = initState, action: RecoverActionsType) : InitStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export type RecoverActionsType = any