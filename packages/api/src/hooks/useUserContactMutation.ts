import { useMutation } from "@apollo/client/react";
import {
  DigitaleAdresType,
  DigitaleAdresResponse,
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
    verificatieCode?: string,
  ) => Promise<DigitaleAdresResponse | null | undefined>,
  {
    loading: boolean;
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

  const mutateFunction = async (
    id: string | null | undefined,
    value: string | null | undefined,
    type: DigitaleAdresType,
    verificatieCode?: string,
  ) => {
    if (!value && id) {
      await deleteMutate({
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
      return null;
    }
    if (value && id) {
      const result = await updateMutate({
        variables: {
          digitaleAdresRequest: {
            uuid: id,
            waarde: value,
            type,
            omschrijving: type === DigitaleAdresType.Email ? "email" : "tel",
            verificatieCode,
          },
        },
        update(cache, { data }) {
          const updated = data?.updateUserDigitaleAdres;

          if (!updated || updated.verificatieNeeded) return;

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
      return result.data?.updateUserDigitaleAdres ?? null;
    }
    if (value && !id) {
      const result = await createMutate({
        variables: {
          digitaleAdresRequest: {
            waarde: value,
            type,
            omschrijving: type === DigitaleAdresType.Email ? "email" : "tel",
            verificatieCode,
          },
        },
        update(cache, { data }) {
          const created = data?.createUserDigitaleAdres;

          if (!created || created.verificatieNeeded) return;

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
      return result.data?.createUserDigitaleAdres ?? null;
    }
  };

  return [
    mutateFunction,
    {
      loading:
        createResult.loading || updateResult.loading || deleteResult.loading,
      error: createResult.error || updateResult.error || deleteResult.error,
      called: createResult.called || updateResult.called || deleteResult.called,
      reset: createResult.reset || updateResult.reset || deleteResult.reset,
    },
  ];
};
