


const initState: any[] = []

type InitStateType = typeof initState

export const profileReducer = (state = initState, action: ProfileActionsType) : InitStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export type ProfileActionsType = any