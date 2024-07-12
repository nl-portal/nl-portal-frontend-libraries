import { getTaken, getOpenZaken, getZakenPagination } from "./AllRequests.mock";

export const mockRequestDefault = [getOpenZaken, getTaken(5)];

export const mockRequestTwoTasks = [getOpenZaken, getTaken(2)];

export const mockRequestsPagination = [getZakenPagination, getTaken(5)];
