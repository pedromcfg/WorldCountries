import { faTrashCan, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { MenuItem } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux'
import { favoriteActions } from "../store/store";

type Props =
{
    item: string;
}

const Favorite:React.FC<Props> = (props) => 
{
    const dispatch = useDispatch();
    const [showDel, setShowDel] = useState<boolean>(false);

  const showDeleteFavoriteButton = () =>
  { setShowDel(true); }
  const hideDeleteFavoriteButton = () =>
  { setShowDel(false); }
  const deleteFavorite = (item:string) =>
  { dispatch(favoriteActions.deleteFavorites(item)); }


  return (
    <MenuItem icon={showDel? <FontAwesomeIcon icon={faTrashCan} beat className="trash" /> : <FontAwesomeIcon icon={faHeart} />} 
        onMouseEnter={showDeleteFavoriteButton}
        onMouseLeave={hideDeleteFavoriteButton}
        onClick={deleteFavorite.bind(null, props.item)}> 
        {props.item}
    </MenuItem>
  )
}

export default Favorite