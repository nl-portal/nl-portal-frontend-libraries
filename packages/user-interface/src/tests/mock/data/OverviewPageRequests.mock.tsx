import { getTaken, getZaken } from "./AllRequests.mock";

export const mockRequestDefault = [getZaken, getTaken(5)];

export const mockRequestTwoTasks = [getZaken, getTaken(2)];
