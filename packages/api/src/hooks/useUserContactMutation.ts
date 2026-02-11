import { useMutation } from "@apollo/client/react";
import {
  DigitaleAdresType,
  GetUserDigitaleAdressenDocument,
  GetUserDigitaleAdressenQuery,
  CreateUserDigitaleAdresDocument,
  UpdateUserDigitaleAdresDocument,
  DeleteUserDigitaleAdresDocument,
} from "../generated/graphql";

type ReturnValue = [
  (
    id: string | null | undefined,
    value: string | null | undefined,
    type: DigitaleAdresType,
  ) => void,
  {
    loading: boolean;
    data?: unknown;
    error?: Error | null;
    called: boolean;
    reset: () => void;
  },
];

export const useUserContactMutation = (): ReturnValue => {
  const [createMutate, createResult] = useMutation(
    CreateUserDigitaleAdresDocument,
  );
  const [updateMutate, updateResult] = useMutation(
    UpdateUserDigitaleAdresDocument,
  );
  const [deleteMutate, deleteResult] = useMutation(
    DeleteUserDigitaleAdresDocument,
  );

  const mutateFunction = (
    id: string | null | undefined,
    value: string | null | undefined,
    type: DigitaleAdresType,
  ) => {
    if (!value && id) {
      deleteMutate({
        variables: { digitaleAdresId: id },
        update(cache) {
          const existing = cache.readQuery<GetUserDigitaleAdressenQuery>({
            query: GetUserDigitaleAdressenDocument,
          });
          if (!existing) return;
          cache.writeQuery({
            query: GetUserDigitaleAdressenDocument,
            data: {
              getUserDigitaleAdressen:
                existing?.getUserDigitaleAdressen?.filter(
                  (a) => a.uuid !== id,
                ) ?? [],
            },
          });
        },
      });
    }
    if (value && id) {
      updateMutate({
        variables: {
          digitaleAdresRequest: {
            uuid: id,
            waarde: value,
            type,
            omschrijving: type === DigitaleAdresType.Email ? "email" : "tel",
          },
        },
        update(cache, { data }) {
          const updated = data?.updateUserDigitaleAdres;
          if (!updated) return;
          const existing = cache.readQuery<GetUserDigitaleAdressenQuery>({
            query: GetUserDigitaleAdressenDocument,
          });
          if (!existing) return;
          cache.writeQuery({
            query: GetUserDigitaleAdressenDocument,
            data: {
              getUserDigitaleAdressen:
                existing?.getUserDigitaleAdressen?.map((a) =>
                  a.uuid === updated.uuid ? updated : a,
                ) ?? [],
            },
          });
        },
      });
    }
    if (value && !id) {
      createMutate({
        variables: {
          digitaleAdresRequest: {
            waarde: value,
            type,
            omschrijving: type === DigitaleAdresType.Email ? "email" : "tel",
          },
        },
        update(cache, { data }) {
          const created = data?.createUserDigitaleAdres;
          if (!created) return;
          const existing = cache.readQuery<GetUserDigitaleAdressenQuery>({
            query: GetUserDigitaleAdressenDocument,
          });
          cache.writeQuery({
            query: GetUserDigitaleAdressenDocument,
            data: {
              getUserDigitaleAdressen: [
                ...(existing?.getUserDigitaleAdressen ?? []),
                created,
              ],
            },
          });
        },
      });
    }
  };

  return [
    mutateFunction,
    {
      loading:
        createResult.loading || updateResult.loading || deleteResult.loading,
      data: createResult.data || updateResult.data || deleteResult.data,
      error: createResult.error || updateResult.error || deleteResult.error,
      called: createResult.called || updateResult.called || deleteResult.called,
      reset: createResult.reset || updateResult.reset || deleteResult.reset,
    },
  ];
};
