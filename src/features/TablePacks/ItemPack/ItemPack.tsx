import React from 'react';
import {NavLink} from "react-router-dom";

import {useAppSelector} from "../../../bll/store";
import {CardPackType} from "../../../dal/packs-api";
import {DeletePackModal} from "../../CustomModals/DeleteModal/DeletePackModal";
import {EditPackModal} from "../../CustomModals/EditPackModal/EditPackModal";
import {PATH} from "../../../utils/paths";
import c from "../../../common/styles/Common.module.scss";
import s from "./ItemPack.module.scss";


type PropsType = {
    pack: CardPackType
    updatePack: (name: string, _id: string) => void
    profileId: string
    onRemovePackHandler: (packId: string) => void
    navigateToCardPage: (_id: string) => void
}

export const ItemPack = React.memo(({
                                        pack,
                                        updatePack,
                                        profileId,
                                        onRemovePackHandler,
                                        navigateToCardPage
                                    }: PropsType) => {

    const {status} = useAppSelector(state => state.app)

    return (
        <tr>
            <td>
                {
                    status === 'loading'
                        ? <div>{pack.name}</div>
                        : <NavLink to={PATH.CARDS + `/${pack._id}`}>
                            <div>{pack.name}</div>
                        </NavLink>
                }
            </td>
            <td className={s.cardsCountColumn}>{pack.cardsCount}</td>
            <td>{pack.updated.split('').slice(0, 10).join('')}</td>
            <td>{pack.created.split('').slice(0, 10).join('')}</td>
            <td className={s.packContainer}>
                <div className={s.buttons}>
                    {profileId === pack.user_id &&
                    <DeletePackModal _id={pack._id} packName={pack.name}
                                     onRemovePackHandler={onRemovePackHandler}/>}
                    {profileId === pack.user_id &&
                    <EditPackModal _id={pack._id} updatePack={updatePack}/>}
                    <button className={c.button} disabled={status === 'loading'}
                            onClick={() => navigateToCardPage(pack._id)}>Learn
                    </button>
                </div>
            </td>
        </tr>

    )
})