


const initState: any[] = []

type InitStateType = typeof initState

export const loginReducer = (state = initState, action: LoginActionsType) : InitStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export type LoginActionsType = any