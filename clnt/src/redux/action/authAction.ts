import { Action, AnyAction, Dispatch } from "redux";
import { UserAuthData } from "../../interfaces/commonInterfaces";
import ActionTypes from "../../resources/enums";

export const signInAction = (data: UserAuthData) => ({
  type: ActionTypes.LOGIN,
  payload: data,
});

export const logout = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.LOGOUT,
  });
};

