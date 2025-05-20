import {
  useGetTakenQuery,
  useGetTakenV2Query,
  GetTakenQuery,
  GetTakenV2Query,
} from "../generated/Graphql";

type ResponseData = {
  getTaken: {
    content: {
      id: string;
    }[];
  };
};

const selected = "v1";
const versions = {
  v1: {
    query: useGetTakenQuery,
    mapping: (data: GetTakenQuery): ResponseData => ({
      ...data,
      getTaken: {
        content: data.getTaken.content.map((taak) => ({
          id: taak.id,
        })),
      },
    }),
  },
  v2: {
    query: useGetTakenV2Query,
    mapping: (data: GetTakenV2Query): ResponseData => ({
      ...data,
      getTaken: {
        content: data.getTakenV2.content.map((taak) => ({
          id: taak.id,
        })),
      },
    }),
  },
};
const version = versions[selected];

const useGetTaken = (baseOptions: Parameters<typeof version.query>[0]) => {
  const { data, ...rest } = version.query(baseOptions);

  return {
    ...rest,
    data: data ? version.mapping(data) : undefined,
  };
};

export default useGetTaken;
