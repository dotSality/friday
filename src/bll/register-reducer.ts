


const initState: any[] = []

type InitStateType = typeof initState

export const registerReducer = (state = initState, action: RegisterActionsType) : InitStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export type RegisterActionsType = any