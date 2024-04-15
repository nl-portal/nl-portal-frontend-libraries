import { getTaken, getZaken, getZakenPagination } from "./AllRequests.mock";

export const mockRequestDefault = [getZaken, getTaken(5)];

export const mockRequestTwoTasks = [getZaken, getTaken(2)];

export const mockRequestsPagination = [getZakenPagination, getTaken(5)];
