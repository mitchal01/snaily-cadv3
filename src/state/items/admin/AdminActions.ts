import { getErrorFromResponse, handleRequest, notify, RequestData } from "@lib/utils";
import { Dispatch } from "react";
import { Code10 } from "types/Code10";
import { ExpungementRequest } from "types/ExpungementRequest";
import { PenalCode } from "types/PenalCode";
import {
  I10Codes,
  IPenalCodes,
  ICitizens,
  IExpungementRequests,
  IMembers,
  GetMemberById,
  IUnits,
  IUnit,
} from "./AdminTypes";

export const get10Codes = (headers?: any) => async (dispatch: Dispatch<I10Codes>) => {
  try {
    const res = await handleRequest("/admin/10-codes", "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_10_CODES",
      codes: res.data.codes,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const add10Code = (data: Partial<Code10>) => async (dispatch: Dispatch<I10Codes>) => {
  try {
    const res = await handleRequest("/admin/10-codes", "POST", data);

    dispatch({
      type: "GET_10_CODES",
      codes: res.data.codes,
    });

    return notify.success("Successfully added 10 code");
  } catch (e) {
    const error = getErrorFromResponse(e);

    return notify.warn(error);
  }
};

export const update10Code = (id: string, data: Partial<Code10>) => async (
  dispatch: Dispatch<I10Codes>,
) => {
  try {
    const res = await handleRequest(`/admin/10-codes/${id}`, "PUT", data);

    dispatch({
      type: "GET_10_CODES",
      codes: res.data.codes,
    });

    return notify.success("Successfully updated 10 code");
  } catch (e) {
    const error = getErrorFromResponse(e);

    return notify.warn(error);
  }
};

export const delete10Code = (id: string) => async (dispatch: Dispatch<I10Codes>) => {
  try {
    const res = await handleRequest(`/admin/10-codes/${id}`, "DELETE");

    dispatch({
      type: "DELETE_10_CODE",
      codes: res.data.codes,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    notify.error(error);
  }
};

export const getPenalCodes = (headers?: any) => async (dispatch: Dispatch<IPenalCodes>) => {
  try {
    const res = await handleRequest("/admin/penal-codes", "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_PENAL_CODES",
      penalCodes: res.data.penalCodes,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const updatePenalCode = (id: string, data: Partial<PenalCode>) => async (
  dispatch: Dispatch<IPenalCodes>,
) => {
  try {
    const res = await handleRequest(`/admin/penal-codes/${id}`, "PUT", data);

    dispatch({
      type: "UPDATE_PENAL_CODE",
      penalCodes: res.data.penalCodes,
    });

    return notify.success("Successfully updated penal code");
  } catch (e) {
    const error = getErrorFromResponse(e);

    return notify.warn(error);
  }
};

export const addPenalCode = (data: Partial<PenalCode>) => async (
  dispatch: Dispatch<IPenalCodes>,
) => {
  try {
    const res = await handleRequest("/admin/penal-codes", "POST", data);

    dispatch({
      type: "GET_PENAL_CODES",
      penalCodes: res.data.penalCodes,
    });

    return notify.success("Successfully added penal code");
  } catch (e) {
    const error = getErrorFromResponse(e);

    return notify.warn(error);
  }
};

export const deletePenalCode = (id: string) => async (dispatch: Dispatch<IPenalCodes>) => {
  try {
    const res = await handleRequest(`/admin/penal-codes/${id}`, "DELETE");

    dispatch({
      type: "DELETE_PENAL_CODE",
      penalCodes: res.data.penalCodes,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    notify.error(error);
  }
};

export const getCitizens = (headers?: any) => async (dispatch: Dispatch<ICitizens>) => {
  try {
    const res = await handleRequest("/admin/citizens", "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_CITIZENS",
      citizens: res.data.citizens,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const deleteCitizen = (id: string) => async (dispatch: Dispatch<ICitizens>) => {
  try {
    const res = await handleRequest(`/admin/citizens/${id}`, "DELETE");

    dispatch({
      type: "DELETE_CITIZEN",
      citizens: res.data.citizens,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    notify.error(error);
  }
};

export const getAllExpungementRequests = (headers?: any) => async (
  dispatch: Dispatch<IExpungementRequests>,
) => {
  try {
    const res = await handleRequest("/admin/expungement-requests", "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_EXPUNGEMENT_REQUESTS_ADMIN",
      expungementRequests: res.data.expungementRequests,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const acceptOrDeclineRequest = (
  type: "accept" | "decline",
  request: ExpungementRequest,
) => async (dispatch: Dispatch<IExpungementRequests>) => {
  try {
    const res = await handleRequest(`/admin/expungement-requests/${request.id}`, "PUT", {
      warrants: request.warrants,
      arrestReports: request.arrestReports,
      tickets: request.tickets,
    });

    dispatch({
      type: "UPDATE_EXPUNGEMENT_REQUEST",
      expungementRequests: res.data.expungementRequests,
    });

    notify.success(
      `Successfully ${type === "accept" ? "accepted" : "declined"} expungement request`,
    );
  } catch (e) {
    const error = getErrorFromResponse(e);
    notify.error(error);
  }
};

export const getMembers = (headers?: any) => async (dispatch: Dispatch<IMembers>) => {
  try {
    const res = await handleRequest("/admin/members", "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_MEMBERS",
      members: res.data.members,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const acceptOrDeclineUser = (type: "accept" | "decline", id: string) => async (
  dispatch: Dispatch<IMembers>,
) => {
  try {
    // TODO: add this endpoint.
    const res = await handleRequest(`/admin/members/${id}?type=${type}`, "PUT");

    dispatch({
      type: "GET_MEMBERS",
      members: res.data.members,
    });

    return true;
  } catch (e) {
    const error = getErrorFromResponse(e);
    return notify.error(error);
  }
};

export const getMemberById = (id: string, headers?: any) => async (
  dispatch: Dispatch<GetMemberById>,
) => {
  try {
    const res = await handleRequest(`/admin/members/${id}`, "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_MEMBER_BY_ID",
      member: res.data.member ?? null,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const getAllUnits = (headers?: any) => async (dispatch: Dispatch<IUnits>) => {
  try {
    const res = await handleRequest("/admin/units", "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_ALL_UNITS",
      officers: res.data.officers,
      ems_fd: res.data.ems_fd,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const getUnitById = (id: string, headers?: any) => async (dispatch: Dispatch<IUnit>) => {
  try {
    const res = await handleRequest(`/admin/units/${id}`, "GET", {
      cookie: headers?.cookie,
      url: headers?.host,
    });

    dispatch({
      type: "GET_UNIT_BY_ID",
      unit: res.data.unit
        ? {
            ...res.data.unit,
            logs: res.data.logs,
          }
        : null,
    });
  } catch (e) {
    const error = getErrorFromResponse(e);
    console.error(error);
  }
};

export const updateUnitById = (id: string, data: RequestData) => async (
  dispatch: Dispatch<any>,
) => {
  try {
    await handleRequest(`/admin/units/${id}`, "PUT", data);

    dispatch({
      type: "UPDATE_UNIT_BY_ID",
    });

    return notify.success("Successfully updated unit");
  } catch (e) {
    const error = getErrorFromResponse(e);
    return notify.warn(error);
  }
};
