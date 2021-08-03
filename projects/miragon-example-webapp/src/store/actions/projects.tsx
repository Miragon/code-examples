import { ProjectTO } from "../../api";
import { ApiError } from "../../models/Auth/ApiError";

export const PROJECTS_ERROR = 'PROJECTS_ERROR';
export const SET_PROJECTS = 'SET_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export type ProjectsErrorPayload = ApiError;
export type SetProjectsPayload = ProjectTO[];
export type AddProjectPayload = ProjectTO;
export type UpdateProjectPayload = ProjectTO;
export type RemoveProjectPayload = string;
