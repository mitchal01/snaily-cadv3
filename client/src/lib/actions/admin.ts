import { Dispatch } from "react";
import { handleRequest, isSuccess } from "../functions";
import {
  DELETE_CITIZEN,
  DELETE_COMPANY,
  GET_CITIZENS,
  GET_COMPANIES,
  SET_MESSAGE,
  GET_MEMBERS,
  GET_MEMBER_BY_ID,
  UPDATE_MEMBER_PERMS,
  BAN_MEMBER,
  UN_BAN_MEMBER,
} from "../types";
import lang from "../../language.json";
import Logger from "../Logger";
import Company from "../../interfaces/Company";
import Citizen from "../../interfaces/Citizen";
import User from "../../interfaces/User";

interface IDispatch {
  type: string;
  message?: string;
  error?: string;
  companies?: Company[];
  citizens?: Citizen[];
  members?: User[];
  member?: User;
}

export const getMembers = () => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest("/admin/management/members", "GET");

    if (isSuccess(res)) {
      dispatch({
        type: GET_MEMBERS,
        members: res.data.members,
      });
    }
  } catch (e) {
    Logger.error(GET_MEMBERS, e);
  }
};

export const getMemberById = (id: string) => async (dispatch: Dispatch<IDispatch>) => {
  console.log(id);

  try {
    const res = await handleRequest(`/admin/management/members/${id}`, "GET");

    if (isSuccess(res)) {
      dispatch({
        type: GET_MEMBER_BY_ID,
        member: res.data.member,
      });
    }
  } catch (e) {
    Logger.error(GET_MEMBER_BY_ID, e);
  }
};

export const updateMemberPerms = (id: string, data: object) => async (
  dispatch: Dispatch<IDispatch>,
) => {
  try {
    const res = await handleRequest(`/admin/management/members/${id}`, "PUT", data);

    if (isSuccess(res)) {
      dispatch({
        type: UPDATE_MEMBER_PERMS,
        member: res.data.member,
      });
      dispatch({
        type: SET_MESSAGE,
        message: "Successfully updated",
      });
    }
  } catch (e) {
    Logger.error(UPDATE_MEMBER_PERMS, e);
  }
};

export const banMember = (id: string, banReason: string) => async (
  dispatch: Dispatch<IDispatch>,
) => {
  try {
    const res = await handleRequest(`/admin/management/members/ban/${id}`, "PUT", {
      ban_reason: banReason,
    });

    if (isSuccess(res)) {
      dispatch({
        type: BAN_MEMBER,
        member: res.data.member,
      });
      dispatch({
        type: SET_MESSAGE,
        message: `${lang.admin.ban_success} ${res.data.member?.username}`,
      });
    }
  } catch (e) {
    Logger.error(BAN_MEMBER, e);
  }
};
export const unBanMember = (id: string) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest(`/admin/management/members/unban/${id}`, "PUT");

    if (isSuccess(res)) {
      dispatch({
        type: UN_BAN_MEMBER,
        member: res.data.member,
      });
      dispatch({
        type: SET_MESSAGE,
        message: `${lang.admin.un_ban_success} ${res.data.member?.username}`,
      });
    }
  } catch (e) {
    Logger.error(UN_BAN_MEMBER, e);
  }
};

export const getAllCitizens = () => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest("/admin/management/citizens", "GET");

    if (isSuccess(res)) {
      dispatch({
        type: GET_CITIZENS,
        citizens: res.data.citizens,
      });
    }
  } catch (e) {
    Logger.error(GET_CITIZENS, e);
  }
};

export const deleteCitizen = (id: string) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest(`/admin/management/citizens/${id}`, "DELETE");

    if (isSuccess(res)) {
      dispatch({
        type: DELETE_CITIZEN,
        citizens: res.data.citizens,
      });
    }
  } catch (e) {
    Logger.error(DELETE_CITIZEN, e);
  }
};

export const getCompanies = () => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest("/admin/management/companies", "GET");

    if (isSuccess(res)) {
      dispatch({
        type: GET_COMPANIES,
        companies: res.data.companies || [],
      });
    }
  } catch (e) {
    Logger.error(GET_COMPANIES, e);
  }
};

export const deleteCompanyById = (id: string) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest(`/admin/management/companies/${id}`, "DELETE");

    if (isSuccess(res)) {
      dispatch({
        type: DELETE_COMPANY,
        companies: res.data.companies,
      });
      dispatch({
        type: SET_MESSAGE,
        message: lang.admin.company.delete_success,
      });
    }
  } catch (e) {
    Logger.error(DELETE_COMPANY, e);
  }
};
