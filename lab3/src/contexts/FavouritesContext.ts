import React, { Dispatch } from "react";

export const FavouritesContext = React.createContext<[State, Dispatch<Action>]>([{ favourites: [] }, () => { }]);

type Action = {
  type: string,
  payload: any
}

export type State = {
  favourites: number[]
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addFavourite': {
      const newState = {
        favourites: [...state.favourites,
        action.payload.studentId]
      };
      localStorage.setItem('favourites', JSON.stringify(newState));
      return newState;
    }

    case 'removeFavourite': {
      const newState = {
        favourites: state.favourites.filter(favId => favId !== action.payload.studentId)
      };
      localStorage.setItem('favourites', JSON.stringify(newState));
      return newState;
    }

    case 'setFavourites':
      return { favourites: action.payload };

    default:
      return state;
  }
}
