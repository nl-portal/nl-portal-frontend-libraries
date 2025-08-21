import { FetchResult } from "@apollo/client";
import {
  useUpdateBurgerProfielMutation,
  useUpdateUserDigitaleAdresMutation,
  DigitaleAdresType,
  UpdateBurgerProfielMutation,
  useCreateUserDigitaleAdresMutation,
  UpdateUserDigitaleAdresMutation,
  CreateUserDigitaleAdresMutation,
  useDeleteUserDigitaleAdresMutation,
  DeleteUserDigitaleAdresMutation,
  GetBurgerProfielDocument,
  GetUserDigitaleAdressenDocument,
  GetUserDigitaleAdressenQuery,
} from "../generated/Graphql";
import { createVersionedMutationHook } from "../utils/createVersionedMutationHook";

type Contact = {
  emailadresId?: string | null;
  emailadres?: string | null;
  telefoonnummerId?: string | null;
  telefoonnummer?: string | null;
};

function useDigitaleAdresMutations() {
  const [updateMutate, updateResult] = useUpdateUserDigitaleAdresMutation();
  const [createMutate, createResult] = useCreateUserDigitaleAdresMutation();
  const [deleteMutate, deleteResult] = useDeleteUserDigitaleAdresMutation();

  const combinedResult = {
    loading:
      updateResult.loading || createResult.loading || deleteResult.loading,
    called: updateResult.called || createResult.called || deleteResult.called,
    error: updateResult.error || createResult.error || deleteResult.error,

    data: updateResult.data ?? createResult.data ?? deleteResult.data,
  } as const;

  return [
    { update: updateMutate, create: createMutate, remove: deleteMutate },
    combinedResult,
  ] as const;
}

function isUpdate(
  r: FetchResult<
    | UpdateUserDigitaleAdresMutation
    | CreateUserDigitaleAdresMutation
    | DeleteUserDigitaleAdresMutation
  >,
): r is FetchResult<UpdateUserDigitaleAdresMutation> {
  return "updateUserDigitaleAdres" in (r.data ?? {});
}

function isCreate(
  r: FetchResult<
    | UpdateUserDigitaleAdresMutation
    | CreateUserDigitaleAdresMutation
    | DeleteUserDigitaleAdresMutation
  >,
): r is FetchResult<CreateUserDigitaleAdresMutation> {
  return "createUserDigitaleAdres" in (r.data ?? {});
}

// TODO: Mapping wordt ingewikkeld doordat in v1 1 request is voor alle contact items, en in v2 per contact item een update gedaan moet worden.
export const useUserContactMutation = (() => {
  const getSelected = (): "v1" | "v2" =>
    typeof window !== "undefined" && window.OPEN_KLANT_VERSION === "v1"
      ? "v1"
      : "v2";

  return createVersionedMutationHook({
    selected: getSelected(),
    v1: {
      hook: useUpdateBurgerProfielMutation,
      mapVariables: (v: Contact) => ({
        variables: { klant: v },
      }),
      mapResult: (d: UpdateBurgerProfielMutation | undefined): Contact => ({
        emailadres: d?.updateBurgerProfiel?.emailadres ?? null,
        telefoonnummer: d?.updateBurgerProfiel?.telefoonnummer ?? null,
      }),
      mutationOptions: () => ({
        update(cache, { data }) {
          if (!data?.updateBurgerProfiel) return;
          cache.writeQuery({
            query: GetBurgerProfielDocument,
            data: { getBurgerProfiel: { ...data.updateBurgerProfiel } },
          });
        },
      }),
    },
    v2: {
      hook: useDigitaleAdresMutations,
      mapResult: (d): Contact => ({
        emailadres:
          d?.updateUserDigitaleAdres?.type === DigitaleAdresType.Email
            ? d.updateUserDigitaleAdres.waarde
            : undefined,
        telefoonnummer:
          d?.updateUserDigitaleAdres?.type === DigitaleAdresType.Telefoonnummer
            ? d.updateUserDigitaleAdres.waarde
            : undefined,
      }),
      async execute({ update, create, remove }, v: Contact) {
        const call = (
          id: string | null | undefined,
          value: string | null | undefined,
          type: DigitaleAdresType,
        ) => {
          if (!value && id) {
            return remove({
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
            return update({
              variables: {
                digitaleAdresRequest: {
                  uuid: id,
                  waarde: value,
                  type,
                  omschrijving:
                    type === DigitaleAdresType.Email ? "email" : "tel",
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
            return create({
              variables: {
                digitaleAdresRequest: {
                  waarde: value,
                  type,
                  omschrijving:
                    type === DigitaleAdresType.Email ? "email" : "tel",
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

          return Promise.resolve(
            {} as FetchResult<
              | UpdateUserDigitaleAdresMutation
              | CreateUserDigitaleAdresMutation
              | DeleteUserDigitaleAdresMutation
            >,
          );
        };

        const [emailResult, phoneResult] = await Promise.all([
          call(v.emailadresId, v.emailadres, DigitaleAdresType.Email),
          call(
            v.telefoonnummerId,
            v.telefoonnummer,
            DigitaleAdresType.Telefoonnummer,
          ),
        ]);

        const emailadres = isUpdate(emailResult)
          ? emailResult.data?.updateUserDigitaleAdres?.waarde
          : isCreate(emailResult)
            ? emailResult.data?.createUserDigitaleAdres?.waarde
            : undefined;

        const telefoonnummer = isUpdate(phoneResult)
          ? phoneResult.data?.updateUserDigitaleAdres?.waarde
          : isCreate(phoneResult)
            ? phoneResult.data?.createUserDigitaleAdres?.waarde
            : undefined;

        return {
          result: { emailRes: emailResult, phoneRes: phoneResult },
          data: { emailadres, telefoonnummer } as Contact,
        };
      },
    },
  });
})();
