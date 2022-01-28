


const initState: any[] = []

type InitStateType = typeof initState

export const createPassReducer = (state = initState, action: CreatePassActionsType) : InitStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export type CreatePassActionsType = any