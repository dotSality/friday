import React from 'react';
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../bll/store";
import {setPackId} from "../../bll/cards-reducer";
import {CardPackType} from "../../dal/packs-api";
import {ItemPack} from "./ItemPack/ItemPack";
import {ButtonSort} from "../ButtonSort/ButtonSort";
import {PATH} from "../../utils/paths";


type PropsType = {
    cardPacks: CardPackType[]
    onChangeFilterPacks: (sortPacks: string) => void
    removePackCallback: (_id: string) => void
    updatePack: (name: string, _id: string) => void
}

const sortPacksNames = [
    {name:'name', columnsName:'Name'},
    {name:'cardsCount', columnsName:'Cards'},
    {name:'updated', columnsName:'Last Updated'},
    {name:'created', columnsName:'Created by'},
    {name:'actions', columnsName:'Actions'},
]

export const TablePacks = React.memo(({
                                          cardPacks,
                                          onChangeFilterPacks,
                                          removePackCallback,
                                          updatePack
                                      }: PropsType) => {

    const profileId = useAppSelector(state => state.profile._id)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const navigateToCardPage = (_id: string) => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }
    const onRemovePackHandler = (packId: string) => removePackCallback(packId)

    return (
        <table>
            <thead>
            <tr>
                {sortPacksNames.map(el => {
                    return <th key={el.name}>{el.columnsName}
                        <ButtonSort onChangeFilterValue={onChangeFilterPacks}  sortTableColumn={el.name}/>
                    </th>
                })}
            </tr>
            </thead>
            <tbody>
            {cardPacks.map(el => (
                <ItemPack key={el._id}
                          pack={el}
                          navigateToCardPage={navigateToCardPage}
                          onRemovePackHandler={onRemovePackHandler}
                          profileId={profileId} updatePack={updatePack}/>
            ))}
            </tbody>
        </table>
    )
})